const packagesModels = require("../models/packages-models");
const formResponse = require("../helpers/form-response");

module.exports = {
  getAllPackages: (req, res) => {
    packagesModels
      .getAllPackages()
      .then(result => {
        formResponse.success(res, 200, result);
      })
      .catch(error => res.json(error));
  }
  // getPackagesDetails: (req, res) => {
  //   packagesModels
  //     .getPackagesDetails(id)
  //     .then()
  //     .catch();
  // },
  // getPackagesByCategory: (req, res) => {
  //   packagesModels
  //     .getPackagesByCategory(category)
  //     .then()
  //     .catch();
  // },
  // getPackagesByName: (req, res) => {
  //   packagesModels
  //     .getPackagesByName(name)
  //     .then()
  //     .catch();
  // },
  // addPackages: (req, res) => {
  //   packagesModels
  //     .addPackages(data)
  //     .then()
  //     .catch();
        

  // },
  // EditPackages: (req, res) => {
  //   packagesModels
  //     .EditPackages(id, data)
  //     .then()
  //     .catch();
  // },
  // deletePackages: (req, res) => {
  //   packagesModels
  //     .detelePackages(id)
  //     .then()
  //     .catch();
  // }
};
