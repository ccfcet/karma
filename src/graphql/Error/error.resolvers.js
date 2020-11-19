module.exports = {
  DeleteResult: {
    __resolveType: (obj) => {
      if (obj.message) {
        return 'Success';
      }
      if (obj.fields) {
        return 'ValidationError';
      }
      return 'BaseError';
    },
  },
};
