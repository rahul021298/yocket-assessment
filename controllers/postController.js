/**
 * Require
 */
const { InternalError } = require('../errors/customErrors');
const { ValidationError } = require('../errors/error');
const Post = require('../models/Post');

/** insert post to db
 * 
 * @param {object} req request
 * @param {object} res response
 * @param {*} next next makes call to next middleware
 */
const uploadPost = async (req, res, next) => {
    try {
        const response = await Post.create(req.body);
        res.status(200).json({response});
    } catch (err) {
        if(err.name === 'ValidationError'){
            const error = new ValidationError(err.message);
            next(error);
        } else {
            next(new InternalError());
        }
    }
}

/** insert post to db
 * 
 * @param {object} req request
 * @param {object} res response
 * @param {*} next next makes call to next middleware
 */
const getPostByCount = async (req, res, next) => {
    try {
        const count = req.query.count || 0;
        const offset = Number(req.query.offset) || 0;
        const skip = offset * count;
        const response = await Post.find().sort({'_id': '-1'}).limit(count).skip(skip);
        res.status(200).json({response});
    } catch(err) {
        next(new InternalError(err));
    }
}

/** insert post to db
 * 
 * @param {object} req request
 * @param {object} res response
 * @param {*} next next makes call to next middleware
 */
const getPostByScroll = async (req, res, next) => {
    try {
        const startTimeObjectId = req.query.id;
        const startTime = dateFromObjectId(req.query.id);
        const endTime = new Date(startTime.setHours(startTime.getHours() - 1));
        const endTimeObjectId = objectIdFromDate(endTime);
        const response = await Post.find({$and : [{'_id': {$lt: startTimeObjectId}}, {'_id': {$gte: endTimeObjectId}}]}).sort({'_id': '-1'});
        res.status(200).json({response});
    } catch(err) {
        next(new InternalError(err));
    }

}

/** extract objectId from date
  * 
  * @param {Date} date 
  * @returns objectId
  */
const objectIdFromDate = function (date) {
	return Math.floor(date.getTime() / 1000).toString(16) + "0000000000000000";
};

/** extract date from objectId
 * 
 * @param {string} lastRecord objectId of last record sent
 * @returns Date
 */
const dateFromObjectId = function (lastRecord) {
    return new Date(parseInt(lastRecord.toString().substring(0, 8), 16) * 1000);
};

/**
 * Export
 */
module.exports = {
    uploadPost,
    getPostByCount,
    getPostByScroll
}