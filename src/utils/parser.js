const get = require("lodash.get");
const { unmarshall } = require("@aws-sdk/util-dynamodb");
const dynamoStreamDiff = require("dynamo-stream-diff");
const { EVENT_NAMES_TO_SKIP, FIELDS_TO_SKIP } = require("../config");
const Log = require("./logger");

/**
 * It takes a DynamoDB record and returns true if none of the fields in the FIELDS_TO_SKIP array have
 * changed
 * @param record - The record object from the DynamoDB stream.
 * @returns A boolean value.
 */
const isFieldsChangedToSkip = (record) => {
  //Tweak needed for kinesis stream. Since the event wont contain 'StreamViewType' property
  const { diffList } = dynamoStreamDiff({
    ...record,
    dynamodb: { ...record.dynamodb, StreamViewType: "NEW_AND_OLD_IMAGES" },
  });
  const fieldsChanged = diffList.filter((item) =>
    !FIELDS_TO_SKIP.includes(item.path.split(".")[0])
  );
  return fieldsChanged.length === 0;
};

/**
 * It takes a Kinesis record, parses it, and returns the parsed data if it's a valid record
 * @param record - The record object that is passed to the lambda function.
 * @returns The data is being returned.
 */
const parseKinesisRecord = (record) => {
  const encodedData = get(record, "kinesis.data", null);
  if (encodedData === null) {
    Log.debug(`Invalid Stream Event ${JSON.stringify(record)}`);
    return null;
  }
  const data = JSON.parse(Buffer.from(encodedData, "base64").toString());

  if (EVENT_NAMES_TO_SKIP.includes(data.eventName)) {
    Log.debug(`Skipping kinesis stream because its a ${data.eventName} event`);
    return null;
  }
  return data;
};

/**
 * It takes an array of Kinesis records, parses each record, and returns an array of DynamoDB items
 * @param records - The records that were sent to the Lambda function.
 * @returns An array of objects
 */
const parseValidRecords = (records) => {
  return records.reduce((acc, record) => {
    const data = parseKinesisRecord(record);

    if (data === null) return acc;

    const item = parseDynamoItem(data);

    return item === null ? acc : acc.concat([item]);
  }, []);
};

/**
 * It takes a Kinesis event, extracts the data from it, and returns the data as a string
 * @param event - The event object that was passed to the Lambda function.
 * @returns A function that takes an event and returns a string.
 */
const parseItemFromKinesisStream = (event) => {
  const records = get(event, "Records", []);
  const parsedRecords = parseValidRecords(records);
  return parsedRecords;
};

/**
 * It takes a dynamo stream event and returns the unmarshalled item
 * @param data - The data received from the stream.
 * @returns the unmarshalled new image.
 */
const parseDynamoItem = (data) => {
  const newItem = get(data, "dynamodb.NewImage", null);
  if (newItem == null) {
    Log.debug(`Invalid dynamo data received in stream ${JSON.stringify(data)}`);
    return null;
  }

  if (data.eventName === "MODIFY" && isFieldsChangedToSkip(data)) {
    Log.debug(
      `Skipping stream because its a event due one of ${FIELDS_TO_SKIP} changed`
    );
    return null;
  }

  return unmarshall(newItem);
};

module.exports = {
  parseItemFromKinesisStream,
};
