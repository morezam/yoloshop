import express, { Request, Response } from 'express';
import multer from 'multer';
import path, { extname } from 'path';

const router = express.Router();

const storage = multer.diskStorage({
	destination(req, file, callback) {
		callback(null, 'uploads/');
	},
	filename(req, file, callback) {
		callback(
			null,
			`${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
		);
	},
});

const checkFileType = (
	file: Express.Multer.File,
	callback: (error: Error, filename?: string | boolean) => void
) => {
	const fileTypes = /jpg|jpeg|png/;
	const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());
	const mimeType = fileTypes.test(file.mimetype);

	if (extname && mimeType) {
		return callback(null, true);
	} else {
		return callback(new Error('Images Only!'));
	}
};

const upload = multer({
	storage,
	fileFilter(req, file, callback) {
		checkFileType(file, callback);
	},
});

router.post('/', upload.single('image'), (req: Request, res: Response) => {
	res.send(`/${req.file.path}`);
});

export default router;
