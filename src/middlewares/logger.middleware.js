import fs from 'fs';
import ErrorHandler from './appErrorHandler.middleware.js';
const fsPromise = fs.promises;

const log = async(logData) => {
    try {
        logData = `\n${new Date().toString()} - ${logData}`;
        await fsPromise.appendFile('log.txt', logData);
    } catch (error) {
        throw new ErrorHandler("Server Error ! try again later!!", 500);
    }
}

export const loggerMiddleware = async(req, res, next) => {
    if(!req.url.includes('signin')){
        const logData = `${req.url} - ${JSON.stringify(req.body)}`;
        await log(logData);
    }

    next();
}