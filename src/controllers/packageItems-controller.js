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
  addPackageItem: async (req, res) => {
    const type = req.body.type;
    //get all packageitems
    //filter by type into a tmp array
    //get max id + 1 from tmp array
    //get id front
    //create id back
    //combine front and back

    //create id
    const allPackageItems = await packageItemsModels.getAllPackageItems()
    .then(result => {
      return result;
    })

    let idFront = '';
    const allPackageItemsID = [];
    allPackageItems.map(item => {
      if(item.type == type){
        idFront = item.id.slice(0,3);
        let id = item.id.slice(3,6);
        id = parseInt(id);
        allPackageItemsID.push(id)
      }
    })

    max = Math.max(...allPackageItemsID);
    let idBack = max + 1;
    let tmp = '';
    idBack += '';

    for(let i = 1; i <= 3 - idBack.length;i++){
      tmp += '0';
    }
    idBack = tmp + idBack;
    const id = idFront + idBack;    
    //end of create id

    const data = {
      id: id,
      type: req.body.type,
      name: req.body.name,
      value: req.body.value,
      remaining: req.body.value
    };
    packageItemsModels
      .addPackageItem(data)
      .then(result => {
        formResponse.success(res, 200, data);
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
