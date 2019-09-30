const packageItemsModels = require("../models/packageItems-models");
const formResponse = require("../helpers/form-response");

module.exports = {
  getAllPackageItems: (req, res) => {
    // const number = req.params.number;
    packageItemsModels
      .getAllPackageItems()
      .then(result => {
        formResponse.success(res, 200, result);
      })
      .catch(error => {
        res.json(error);
      });
  },
  getPackageItemById: (req, res) => {
    const id = req.params.id;
    packageItemsModels
      .getPackageItemById(id)
      .then(result => {
        formResponse.success(res, 200, result[0]);
      })
      .catch(error => res.json(error));
  }
};
