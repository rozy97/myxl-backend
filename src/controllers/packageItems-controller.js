const packageItemsModels = require("../models/packageItems-models");
const formResponse = require("../helpers/form-response");

module.exports = {
  getAllPackageItems: (req, res) => {
    packageItemsModels
      .getAllPackageItems()
      .then(result => {
        formResponse.success(res, 200, result);
      })
      .catch(error => {
        res.json(error);
      });
  },
  getPackageItem: (req, res) => {
    const id = req.params.id;
    packageItemsModels
      .getPackageItem(id)
      .then(result => {
        formResponse.success(res, 200, result[0]);
      })
      .catch(error => res.json(error));
  },
  addPackageItem: (req, res) => {
    const data = {
      id: req.body.id,
      type: req.body.type,
      name: req.body.name,
      value: req.body.value
    };
    packageItemsModels
      .addPackageItem(data)
      .then(result => {
        formResponse.success(res, 200, result);
      })
      .catch(error => res.json(error));
  },
  editPackageItem: (req, res) => {
    const id = req.params.id;
    const data = req.body;
    packageItemsModels
      .editPackageItem(id, data)
      .then(result => {
        formResponse.success(res, 200, result);
      })
      .catch(error => res.json(error));
  },
  deletePackageItem: (req, res) => {
    const id = req.params.id;
    packageItemsModels
      .deletePackageItem(id)
      .then(result => {
        formResponse.success(res, 200, result);
      })
      .catch(error => res.json(error));
  }
};
