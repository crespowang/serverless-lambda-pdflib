import { PDFDocument, rgb } from "pdf-lib";
import aws from "aws-sdk";
import middy from "@middy/core";
import doNotWaitForEmptyEventLoop from "@middy/do-not-wait-for-empty-event-loop";
const s3 = new aws.S3({ region: "ap-southeast-2" });

const downloadFromS3ToStream = (
  bucketName: string,
  keyName: string
): Promise<any> => {
  return new Promise((resolve, reject) => {
    s3.getObject(
      { Bucket: bucketName, Key: keyName },
      (error, data: aws.S3.GetObjectOutput) => {
        if (error) {
          console.error(error);
          reject(error);
        } else {
          resolve(data.Body);
        }
      }
    );
  });
};

const saveToS3 = (
  bucketName: string,
  keyName: string,
  Body: Buffer
): Promise<any> => {
  return new Promise((resolve, reject) => {
    s3.putObject({ Bucket: bucketName, Key: keyName, Body }, (error, data) => {
      if (error) {
        console.error(error);
        reject(error);
      } else {
        resolve(data);
      }
    });
  });
};

const handler = async (event: any) => {
  const bucketName =
    event.Records[0] &&
    event.Records[0].s3 &&
    event.Records[0].s3.bucket &&
    event.Records[0].s3.bucket.name;
  const objectKey =
    event.Records[0] &&
    event.Records[0].s3 &&
    event.Records[0].s3.object &&
    event.Records[0].s3.object.key;
  if (bucketName && objectKey) {
    const fileStream = await downloadFromS3ToStream(bucketName, objectKey);
    const pdfDoc = await PDFDocument.load(fileStream, {
      ignoreEncryption: true
    });
    const newPage = pdfDoc.insertPage(0);

    const { height } = newPage.getSize();
    const fontSize = 30;
    newPage.drawText("Top Secret!", {
      x: 50,
      y: height - 4 * fontSize,
      size: fontSize,
      color: rgb(0, 0.53, 0.71)
    });
    const data = await pdfDoc.saveAsBase64();

    await saveToS3(
      bucketName,
      `processed_${objectKey}`,
      new Buffer(data, "base64")
    );
    return {};
  }
};

export const generate = middy(handler).use(doNotWaitForEmptyEventLoop());
