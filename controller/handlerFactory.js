const AppError = require('./../utils/appError');

//Deleting a document
exports.deleteOneDocument = Model => async (req, res, next) => {
    try {
        const doc = await Model.findByIdAndDelete(req.params.id);

        if (!doc) {
            next(new AppError(`No Document found with ID: ${req.params.id}`, 404));
        }
        res.status(204).json({
            status: 'success',
            data: null
        });
    } catch (err) {
        //return error to check if document was deleted
        next(new AppError(`Unable to delete Tour with ID: ${req.params.id}`, 404));
    };
};

//Updating a document
exports.updateOneDocument = Model => async (req, res, next) => {
    try {
        const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        if (!doc) {
            next(new AppError(`No Document found with ID: ${req.params.id}`, 404));
        }
        res.status(200).json({
            status: 'success',
            data: {
                data: doc
            }
        });
    } catch (err) {
        //return error to check if tour is updated
        next(new AppError('Unable to Update Tour', 404));
    };
};

//create one document
exports.createOneDocument = Model => async (req, res, next) => {
    try {
        //You can use this nothing is wrong with it
        // const newTour = new Tour({});
        // newTour.save();

        const doc = await Model.create(req.body);
        res.status(201).json({
            status: 'success 🙌',
            result: doc.length,
            data: {
                data: doc
            }

        });

    } catch (err) {
        res.status(400).json({
            status: 'failed',
            message: err
        });
    };
}