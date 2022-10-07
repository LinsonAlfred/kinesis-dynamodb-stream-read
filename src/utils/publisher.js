const AWS = require("aws-sdk");
const { AWS_CONFIG, KINESIS_STREAM_NAME } = require("../config");
const Log = require("./logger");
const { v4: uuidV4 } = require("uuid");
/* Creating a new instance of the AWS Kinesis client. */
const kinesis = new AWS.Kinesis({
  region: AWS_CONFIG.REGION,
  accessKeyId: AWS_CONFIG.ACCESS_KEY_ID,
  secretAccessKey: AWS_CONFIG.SECRET_ACCESS_KEY,
});

/**
 * It takes an array of records and sends them to Kinesis
 * @param data - This is the data that you want to send to Kinesis.
 * @returns A promise that resolves to the result of the putRecords call.
 */
const sendRecords = async (data) => {
  return new Promise((resolve, reject) => {
    kinesis.putRecords(data, function (err, result) {
      if (err) {
        Log.error("Error: " + JSON.stringify(err));
        reject(err);
        return;
      }
      Log.debug(result, "Successfully send message to kinesis");
      resolve(result);
    });
  });
};

/**
 * It takes an array of items, and publishes them to a Kinesis stream
 * @param items - An array of items to be published to Kinesis.
 * @returns The response from the Kinesis API call.
 */
const publishItemsToKinesis = async (items) => {
  const data = {
    StreamName: KINESIS_STREAM_NAME,
    Records: items.map((item) => {
      return {
        Data: JSON.stringify(item),
        PartitionKey: item.PK || uuidV4(),
      };
    }),
  };
  const response = await sendRecords(data);
  return response;
};

module.exports = { publishItemsToKinesis };
