const AppError = require('./../utils/appError');

exports.deleteOneDocument = Model => async (req, res, next) =>{
    try {
        const doc = await Model.findByIdAndDelete(req.params.id);

        if(!doc){
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
