const AWS = require('aws-sdk')
const fs = require('fs')

// AWS.config.loadFromPath('./credentials.json');
const s3 = new AWS.S3({apiVersion: '2006-03-01'});

const singleUpload = {
    resolve: (parent, { file }) => {
        return file.then(file => {
              const { createReadStream, filename, mimetype } = file
              const fileStream = createReadStream()
              fileStream.pipe(fs.createWriteStream(`./uploads/${filename}`))
              return file;
        });
    },
}

// TODO: NEED TO CREATE A AWS BUCKET
const singleUploadStream = {
    resolve: async (parent, args) => {
        const file = await args.file
        const { createReadStream, filename, mimetype } = file
        const fileStream = createReadStream()
        // Here stream it to S3
        // Enter your bucket name here next to "Bucket: "
        const uploadParams = {
            Bucket: 'apollo-file-upload-test',
            Key: filename,
            Body: fileStream
        };
        const result = await s3.upload(uploadParams).promise()
        console.log(result)
        return file;
    }
}

module.exports = {
    singleUpload,
    singleUploadStream
}