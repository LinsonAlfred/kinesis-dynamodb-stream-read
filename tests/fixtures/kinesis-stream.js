const records = require("./streamRecords.json");

module.exports = {
  Records: records.map((record) => ({
    kinesis: {
      kinesisSchemaVersion: "1.0",
      partitionKey: "10003",
      sequenceNumber:
        "49633938908590746407400915669675673474859754189230178306",
      data: Buffer.from(JSON.stringify(record)).toString("base64"),
      approximateArrivalTimestamp: 1665112333.936,
    },
    eventSource: "aws:kinesis",
    eventVersion: "1.0",
    eventID:
      "shardId-000000000000:49633938908590746407400915669675673474859754189230178306",
    eventName: "aws:kinesis:record",
    invokeIdentityArn:
      "arn:aws:iam::569710929911:role/service-role/product-kinesis-stream-read-role-wrp1rcfk",
    awsRegion: "ap-southeast-1",
    eventSourceARN:
      "arn:aws:kinesis:ap-southeast-1:569710929911:stream/product-kenesis-stream",
  })),
};
