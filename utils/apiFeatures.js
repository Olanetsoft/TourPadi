//creating a class for api feature
class APIFeatures {
    constructor(query, queryString) {
        this.query = query;
        this.queryString = queryString;
    }

    //Filtering
    filter() {

        //TO BUILD THE QUERY
        //1) Filtering process
        const queryObj = { ...this.queryString };
        const excludedFields = ['page', 'sort', 'limit', 'fields'];
        excludedFields.forEach(el => delete queryObj[el]);


        //1b) Advanced filtering
        let queryStr = JSON.stringify(queryObj);
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);
        console.log(JSON.parse(queryStr));

        this.query = this.query.find(JSON.parse(queryStr));

        //this is to return the entire object
        return this;
    };

    //sorting
    sort() {
        if (this.queryString.sort) {
            const sortBy = this.queryString.sort.split(",").join(" ");
            this.query = this.query.sort(sortBy)
        } else {
            this.query = this.query.sort('-createdAt');
        };

        //this is to return the entire object
        return this;
    };

    //Limiting field
    limitFields() {
        if (this.queryString.fields) {
            const fields = this.queryString.fields.split(",").join(" ");
            this.query = this.query.select(fields)
        } else {
            this.query = this.query.select('-__v');
        };

        //this is to return the entire object
        return this;
    };

    //pagination
    paginate() {
        //get the page
        const page = this.queryString.page * 1 || 1;
        const limit = this.queryString.limit * 1 || 100;
        const skip = (page - 1) * limit;

        this.query = this.query.skip(skip).limit(limit);

        //this is to return the entire object
        return this;
    }

};

module.exports = APIFeatures;