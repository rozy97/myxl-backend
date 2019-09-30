const formResponse = {
  success: (res, status, response, data) => {
    const success = {
      status,
      data,
      response
    };
    res.json(success);
  }
};

module.exports = formResponse
