import { NextFunction, Request, Response } from 'express';

class AppError extends Error {
	statusCode: number;

	constructor(statusCode: number, message: string) {
		super(message);

		Object.setPrototypeOf(this, new.target.prototype);
		this.name = Error.name;
		this.statusCode = statusCode;
		Error.captureStackTrace(this);
	}
}

export const notFound = (req: Request, res: Response, next: NextFunction) => {
	const error = new Error(`Not Found - ${req.originalUrl}`);

	res.status(404);
	next(error);
};

export const errorHandler = (
	err: AppError,
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

	res.status(statusCode);
	res.json({
		message: err.message,
		stack: process.env.NODE_ENV === 'production' ? null : err.stack,
	});
};
