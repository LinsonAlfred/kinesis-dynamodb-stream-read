const kinesisStreamEvent = require("./fixtures/kinesis-stream");
const expectedResponse = require("./fixtures/expectedResponse.json");

const mockPutRecords = jest.fn((data, callback) => {
  callback(null, data);
});
jest.mock("aws-sdk", () => ({
  Kinesis: function Kinesis() {
    this.putRecords = mockPutRecords;
  },
}));

const { handler } = require("../index");

describe("kinesis stream received", () => {
  beforeEach(() => jest.clearAllMocks());
  test("should succesfully execute", async () => {
    await handler(kinesisStreamEvent);
    expect(mockPutRecords).toHaveBeenCalledTimes(1);
    expect(mockPutRecords).toBeCalledWith(expectedResponse, expect.anything());
  });
});
