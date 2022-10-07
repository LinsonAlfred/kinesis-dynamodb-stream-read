const {
  Log,
  parseItemFromKinesisStream,
  publishItemsToKinesis,
} = require("./utils");

/**
 * It takes the event from the Kinesis stream, parses the items from the event, and publishes the items
 * to the Kinesis stream
 * @param event - The event that triggered the Lambda function.
 * @returns The response from the publishItemsToKinesis function.
 */
const streamReader = async (event) => {
  Log.debug(event, 'event received');
  const items = parseItemFromKinesisStream(event);
  if (items.length > 0) {
    const response = await publishItemsToKinesis(items);
    Log.debug('Successfully parsed item and send to Kinesis');
    return response;
  }
  return 'Nothing to publish';
};

module.exports = streamReader;
