const reportModels = require("../models/report-models");
const formResponse = require("../helpers/form-response");

const reportControllers = {
  getAllReport: (req, res) => {
    reportModels
      .getAllreport()
      .then(result => {
        formResponse.success(res, 200, result);
      })
      .catch(error => console.log(error));
  },
  getUserReport: (req, res) => {
    const number = req.params.number;
    reportModels
      .getUserReport(number)
      .then(result => {
        formResponse.success(res, 200, result);
      })
      .catch(error => console.log(error));
  },
  addNewReport: (req, res) => {
    const data = {
      number: req.params.number,
      date: new Date().toDateString(),
      report: req.body.report
    };
    reportModels
      .addNewReport(data)
      .then(result => {
        formResponse.success(res, 200, result);
      })
      .catch(error => console.log(error));
  }
};

module.exports = reportControllers;
