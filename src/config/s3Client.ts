import { S3Client } from "@aws-sdk/client-s3";

//credentials and config read from the env variables
export const s3Client = new S3Client({});