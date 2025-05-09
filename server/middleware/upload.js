import multer from 'multer';
import fs from 'fs';
import path from 'path';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const folderName = Date.now().toString();
    const folder = path.join('uploads', folderName);
    fs.mkdirSync(folder, { recursive: true });
    req.uploadFolder = folderName;
    cb(null, folder);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${file.fieldname}-${Date.now()}${ext}`);
  }
});

export const upload = multer({ storage });
