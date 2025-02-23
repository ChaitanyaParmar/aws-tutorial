const { GetObjectCommand, S3Client, PutObjectCommand, ListObjectsV2Command, DeleteObjectCommand } = require('@aws-sdk/client-s3')
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');
require('dotenv').config();

const s3Client = new S3Client({
    region: 'ap-south-1',
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
});

async function getObjectURL(key) {
    const command = new GetObjectCommand({
        Bucket: "private-bucket-of-chaitanya",
        Key: key,
    });
    const url = await getSignedUrl(s3Client, command);
    return url;
}

async function putObject(filename, contentType) {
    const command = new PutObjectCommand({
        Bucket: "private-bucket-of-chaitanya",
        Key: `uploads/${filename}`,
        ContentType: contentType
    });
    const url = await getSignedUrl(s3Client, command);
    return url;
    // const url = await getSignedUrl(s3Client, command, { expiresIn : 60 }); // will expire in 1 minute
}

async function listObjects(){
    const command = new ListObjectsV2Command({
        Bucket: "private-bucket-of-chaitanya",
        Key: "/"
    });
    const result = await s3Client.send(command);
    console.log(result)
}

async function deleteObject(){
    const command = new DeleteObjectCommand({
        Bucket: "private-bucket-of-chaitanya",
        Key: "monke.jpg",
    })
    await s3Client.send(command);
}

async function init(){
    // console.log('URL for monke.jpg', await getObjectURL("monke.jpg"));
    // console.log('URL for monke.jpg', await getObjectURL("/uploads/user-uploads/image-1740047346683.jpg"));
    // console.log('URL for uploading', await putObject(`image-${Date.now()}.jpg`, 'image/jpg'))
    listObjects()
    // deleteObject();
}
// console.log("AWS_ACCESS_KEY_ID:", process.env.AWS_ACCESS_KEY_ID); // Debugging line
// console.log("AWS_SECRET_ACCESS_KEY:", process.env.AWS_SECRET_ACCESS_KEY); // Debugging line

init();