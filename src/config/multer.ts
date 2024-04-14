import { s3Client } from "./s3Client";
import multer from "multer";
import multerS3 from 'multer-s3';

let counter = 0;

export const uploadS3 = multer({
    storage: multerS3({
        s3: s3Client,
        bucket: "mission-safe-images",	
		contentType: multerS3.AUTO_CONTENT_TYPE,
        key: function (req, file, cb) {
            cb(null, `${Date.now()}${counter++}_${file.originalname}`);
        }
    })
});