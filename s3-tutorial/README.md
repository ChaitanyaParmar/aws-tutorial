installed following libraries
    @aws-sdk/client-s3
    @aws-sdk/s3-request-predesigner

created a private bucket
created a new user with access to s3; passed its accessKeyID and secretAccessKey 

used getObjectURL function, passed a presigned URL through which we can access a private document of private bucket
imported getSignedURL and passed client and command

created an async function to show it


used putObject function, using which we can upload a file in our bucket. we need to pass filename and content type of that file.

git commit -m "first commit"
git push -u origin main