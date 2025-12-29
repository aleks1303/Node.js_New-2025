import multer from "multer"
import path from "node:path"
import {v6} from "uuid";
import { ApiError } from "../errors/api.error";
import { StatusCodesEnum } from "../enums/status-codes.enum";


const storage = multer.diskStorage({
    destination:(req, file, cb) => {
        cb(null, path.join(process.cwd(), "upload"))
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = v6();
        const extname = path.extname(file.originalname);
        cb(null, `${uniqueSuffix}${extname}`)
    }
})

const fileFilter = (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimeType = allowedTypes.test(file.mimetype);

    if (extname && mimeType) {
        cb(null, true);
    } else
        cb(new ApiError("Only images are allowed", StatusCodesEnum.BAD_REQUEST))
}

const upload = multer({
    storage:storage,
    limits: {fileSize: 5* 1024 *1024},
    fileFilter: fileFilter
})

export {upload}