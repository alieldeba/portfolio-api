class ApiFeatures {
    constructor(mongooseQuery, queryString) {
      this.mongooseQuery = mongooseQuery;
      this.queryString = queryString;
    }
  
    filter() {
      let paramsQuery = { ...this.queryString };
      const excludedQueries = ["sort", "page", "limit", "fields", "keyword"];
      excludedQueries.forEach((query) => delete paramsQuery[query]);
      // applying filtring for: gt, gte, lt, lte
      paramsQuery = JSON.stringify(paramsQuery);
      paramsQuery = paramsQuery.replace(
        /\b(gt|gte|lt|lte)\b/g,
        (match) => `$${match}`
      );
  
      this.mongooseQuery = this.mongooseQuery.find(JSON.parse(paramsQuery));
  
      return this;
    }
  
    sort() {
      if (this.queryString.sort) {
        const sortBy = this.queryString.sort.split(",").join(" ");
        this.mongooseQuery = this.mongooseQuery.sort(sortBy || "-createdAt");
      } else {
        this.mongooseQuery = this.mongooseQuery.sort("-createdAt");
      }
  
      return this;
    }
  
    limitFields() {
      if (this.queryString.fields) {
        const fields = this.queryString.fields.split(",").join(" ");
        this.mongooseQuery = this.mongooseQuery.select(`${fields}`);
      } else {
        this.mongooseQuery = this.mongooseQuery.select("-__v");
      }
  
      return this;
    }
  
    search(modelName) {
      if (this.queryString.keyword) {
        let query = {};
  
        if (modelName === "Products") {
          query.$or = [
            { title: { $regex: this.queryString.keyword, $options: "i" } },
            { description: { $regex: this.queryString.keyword, $options: "i" } },
          ];
        } else {
          query = { name: { $regex: this.queryString.keyword, $options: "i" } };
        }
        this.mongooseQuery = this.mongooseQuery.find(query);
      }
  
      return this;
    }
  
    paginate(numberOfDocuments) {
      const page = +(this.queryString.page || 1);
      const limit = +(this.queryString.limit || 50);
      const skip = (page - 1) * limit;
  
      const paginationResults = {};
  
      paginationResults.numberOfPages = Math.ceil(numberOfDocuments / limit);
      paginationResults.currentPage = page;
      paginationResults.limit = limit;
  
      if (skip > 0) {
        paginationResults.prev = page - 1;
      }
  
      if (page < paginationResults.numberOfPages) {
        paginationResults.next = page + 1;
      }
  
      this.paginationResults = paginationResults;
  
      this.mongooseQuery = this.mongooseQuery.skip(skip).limit(limit);
  
      return this;
    }
  }
  
  module.exports = ApiFeatures;