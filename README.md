# kinesis-dynamodb-stream-read

## Introduction

This lambda can be used as an interface to process the kinesis stream attached to dynamodb table. This lambda will read the stream and publish the valid records to another kinesis stream which specified in config.

### How valid events are identified from the stream

Lambda will decide whether it is a valid stream or not by checking the below configs.

- `EVENT_NAMES_TO_SKIP` - you can specifiy as array in env, eg: `['REMOVE']`. Default value - `['Remove']`.
- `FIELDS_TO_SKIP` - you can specify the field name as array here. The specified fields in this array will not considered as a valid changes if the trigger have been called due these field changes in DB. eg: `['metadata', 'updatedAt']`. Default value - `['metadata']`.


## Configuration

You can specify below environment variables.

- `REGION` - AWS region of the Kinesis stream you want to publish.
- `AWS_CONFIG` - You can specify as json object as given below. AWS account configuration of the Kinesis stream you want to publish.
  
  ```json
   {
      REGION: "ap-southeast-1",
      ACCESS_KEY_ID: "xxxxx",
      SECRET_ACCESS_KEY: "xxxxxx",
    }
  ```
- `KINESIS_STREAM_NAME` - Stream name of the kinesis where you want to publish the data.
- `LOG_LEVEL` - Log level as given in [pino](https://www.npmjs.com/package/pino).