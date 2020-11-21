// import Minio from 'minio';
// import fs from 'fs';
// import moment from 'moment-timezone';
// import dotenv from 'dotenv';
// dotenv.config();

// // Instantiate the minio client with the endpoint
// // and access keys as shown below.
// const minioClient = new Minio.Client({
//     endPoint: process.env.MINIO_ENDPOINT,
//     port: 443,
//     useSSL: true,
//     accessKey: process.env.MINIO_ACCESS_KEY,
//     secretKey: process.env.MINIO_SECRET_KEY,
// });

// // minioClient.fGetObject('mastodon', 'accounts/avatars/000/000/001/original/fd385febb18f3244.png', `${__dirname}/hoge.png`, err => {
// //     if (err) {
// //         console.log(err);
// //     }
// //     console.log('succeeded');
// // });

// minioClient.fPutObject('mastodon', )