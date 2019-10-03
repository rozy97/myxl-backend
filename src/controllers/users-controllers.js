const userModels = require('../models/users-models');
const packagesModels = require("../models/packages-models");
const transactionModels = require('../models/transaction-models');
const formResponse = require('../helpers/form-response');
const cloudinary = require('../configs/cloudinaryConfig');
const Nexmo = require('nexmo');

module.exports = {
  otpLogin: (req, res) => {
    const number = req.params.number;
    //generate 6 digit OTP
    let otp ='';
    for(let i = 0; i < 6; i++){
      otp += Math.floor(Math.random()*10);
    }
    
    const data = {
      number:number,
      otp:otp
    }

    userModels.setOtp(data);
    setTimeout(()=>{
      userModels.removeOtp(number);
    }, 120000);

    //sms//////////////////////////////////
    const nexmo = new Nexmo({
      apiKey: 'c3d89fcb',
      apiSecret: 'lmFFq8a0cZOoffCq',
    });
    
    const from = 'demy myxl';
    // const to = '6281910508754';
    const to = '62'+number.slice(1,number.length);
    
    const text = 'Your One Time Password : ' + data.otp + '  ';
    
    nexmo.message.sendSms(from, to, text);
    ///////////////////////////////////////////////

    res.json({msg:'OTP is sent to' + number + 'via sms'});
  },
  
  otpVerify: async (req, res) => {
    const number = req.params.number;
    const otp = req.body.otp;

    const tmpOtp = await userModels.getOtp(number)
    .then(result => {
      return result[0];
    })
    if(tmpOtp){
      if(tmpOtp.otp == otp){
        userModels.removeOtp(number);

        userModels.getUser(number)
        .then(result => {
          if(result.length){
            formResponse.success(res, 200, result[0])
          } else {
            // get date now + daysUntilExpired, expirationdate = 30days from registered
            var expDate = new Date();
            expDate.setDate(expDate.getDate() + 30);
            
            const data ={
              number: number,
              name: "Welcome",
              email: "",
              photo: "",
              alternateNumber: number,
              balance: 0,
              expirationDate: expDate,
              daysUntilExpired: 30,
              totalQuota:0,
              totalCall:0,
              totalSMS:0,
              remainingQuota: 0,
              remainingCall: 0,
              remainingSMS: 0,
              packages: []
            }   

            userModels.addUser(data)
            .then(result => {
              formResponse.success(res, 200, data)
            })
            .catch(error => {
              res.json(error)
            })
          }     
        })
        // res.json({msg:'login success'})
      } else {
        res.json({error:'login failed, input correct OTP!'})
      }
    } else {
      res.json({error:'OTP expired'})
    }
    
    
  },

  login: (req, res) => {
    const number = req.params.number;
    userModels.getUser(number)
    .then(result => {
      if(result.length){
        formResponse.success(res, 200, result[0])
      } else {
        // get date now + daysUntilExpired, expirationdate = 30days from registered
        var expDate = new Date();
        expDate.setDate(expDate.getDate() + 30);
        
        const data ={
          number: number,
          name: "Welcome",
          email: "",
          photo: "",
          alternateNumber: number,
          balance: 0,
          expirationDate: expDate,
          daysUntilExpired: 30,
          totalQuota:0,
          totalCall:0,
          totalSMS:0,
          remainingQuota: 0,
          remainingCall: 0,
          remainingSMS: 0,
          packages: []
        }   

        userModels.addUser(data)
        .then(result => {
          formResponse.success(res, 200, data)
        })
        .catch(error => {
          res.json(error)
        })
      }     
    })
  },

  editPhoto: async (req, res) => {
    const number = req.params.number;
    let photo = '';
    if(req.file){
      photo = await cloudinary.uploader.upload(req.file.path, function(err, result){
        return result;
      })
    }
    const data = {
      number,
      photo:photo.url
    }
    await userModels.updateUser(number, data)
    .then(result => {
      formResponse.success(res, 200, result, data)
    })
    .catch(error => {
      res.json(error)
    })
  },

  editProfile: (req, res) => {
    const number = req.params.number;
    const email = req.body.email;
    const alternateNumber = req.body.alternateNumber;
   
    const data = {
      email,
      alternateNumber
    }

    userModels.updateUser(number, data)
    .then(result => {
      formResponse.success(res, 200,  data)
    })
    .catch(error => {
      res.json(error)
    })
  },

  getAllUsers: (req, res) => {
    userModels.getAllUsers()
    .then(result => {
      formResponse.success(res, 200, result)
    })
    .catch(error => {
      res.json(error)
    })
  },

  getUser: async (req, res) => { 
    const number = req.params.number;
    let user = await userModels.getUser(number)
    .then(result => {
      return result[0];
      
    })
    .catch(error => {
      res.json(error)
    })
    
    //check unlimited package
    let found = 0;
    user.packages.map(package => {
      package.packageItems.map(item => {
        if(item.value == -1){
          found = 1;
        }
      })
    })
    
    user = {
      ...user,
        unlimited:found
    }
    formResponse.success(res, 200, user)
  },
  
  buyPackage: async (req, res) => {
    const number = req.params.number;
    const packageID = req.body.packageID;
    
    const targetPackage = await packagesModels.getPackage(packageID)
    .then(result => {
      return result[0];
    })

    const user = await userModels.getUser(number)
    .then(result => {
      return result[0];
    })

    //check balance < price ?
    if(targetPackage.price >= user.balance){
      res.json({error:'Maaf, pulsa anda tidak mencukupi.'})
    } else {
      //pulsa cukup
      //reduce balance
      const newBalance = user.balance - targetPackage.price

      try {
        await userModels.setBalance(number, newBalance)
      } catch (error) {
        res.json(error);
      }
    
      const currentPackages = user.packages;
      let found = false;
      let currentPackage = {};
      await currentPackages.map(pack => {
        // (pack.id == packageID) ? found = true: null
        if(pack.id == packageID){
          found = true;
          currentPackage = pack;
        }
      })

      targetPackage.packageItems.map(item => {
        switch(item.type){
          case "internet" :
            if(item.value > 0){
              user.totalQuota += item.value;
              user.remainingQuota += item.remaining;
            }
            break;
          case "telpon":
            user.totalCall += item.value;
            user.remainingCall += item.remaining;
            break;
          case "sms":
            user.totalSMS += item.value;
            user.remainingSMS += item.remaining;
            break;
        }
      })
      const totalAndRemaining = {
        totalQuota:user.totalQuota,
        totalCall:user.totalCall,
        totalSMS:user.totalSMS,
        remainingQuota:user.remainingQuota,
        remainingCall:user.remainingCall,
        remainingSMS:user.remainingSMS
      }
      userModels.updateUser(number,totalAndRemaining)
      
      const dataHistory = {
        number,
        id: targetPackage.id,
        name: targetPackage.name,
        price: targetPackage.price,
        date: new Date().toDateString()
      };
      transactionModels.newTransaction(dataHistory);

      if(found){
        //add quota to existing package
        currentPackage.packageItems.map((item, index) => {
          if(currentPackage.packageItems[index].value > 0){
            currentPackage.packageItems[index].value += targetPackage.packageItems[index].value
            currentPackage.packageItems[index].remaining += targetPackage.packageItems[index].remaining
          }
        })

        currentPackages.map(pack => {
          if(pack.id == currentPackage.id){
            pack = currentPackage;
          }
        })
        
        userModels.editPackage(number, currentPackages)
        .then(result => {
          formResponse.success(res, 200, currentPackages);
        })

      } else {
        //add new package
        await userModels.addPackage(number, targetPackage)
        .then(result => {
          formResponse.success(res, 200, targetPackage)
        })
      }
    }

  },

  removePackage: async (req, res) => {
    const number = req.params.number;
    const packageID = req.body.packageID;

    
    const user = await userModels.getUser(number)
    .then(result => {
      return result[0];
    })
    let targetPackage = {};
    user.packages.map(pack => {
      if(pack.id == packageID){
        targetPackage = pack
      }
    })
    
    targetPackage.packageItems.map(item => {
      switch(item.type){
        case "internet" :
          if(item.value > 0){
            user.totalQuota -= item.value;
            user.remainingQuota -= item.remaining;
          }
          break;
        case "telpon":
          user.totalCall -= item.value;
          user.remainingCall -= item.remaining;
          break;
        case "sms":
          user.totalSMS -= item.value;
          user.remainingSMS -= item.remaining;
          break;
      }
    })
    const totalAndRemaining = {
      totalQuota:user.totalQuota,
      totalCall:user.totalCall,
      totalSMS:user.totalSMS,
      remainingQuota:user.remainingQuota,
      remainingCall:user.remainingCall,
      remainingSMS:user.remainingSMS
    }
    userModels.updateUser(number,totalAndRemaining)

    userModels.removePackage(number, packageID)
    .then(result => {
      const data = {
        number,
        packageID
      }
      formResponse.success(res, 200, data)
    })
  },

  topUp: async (req, res) => {
    const number = req.params.number;
    const amount = req.body.amount;

    const user = await userModels.getUser(number)
    .then(result => {
      return result[0];
    })
    .catch(error => {
      res.json(error)
    })

  
    const balance = parseInt(user.balance)+parseInt(amount);

    //reset daysuntilexpired to 30 and set expirationdate
    user.daysUntilExpired = 30;
    let date = new Date();
    date.setDate(date.getDate() + user.daysUntilExpired);
    user.expirationDate = date;
    let expiration = {
      expirationDate:user.expirationDate,
      daysUntilExpired: user.daysUntilExpired
    }
    userModels.updateUser(number, expiration)
    
    try {
      userModels.setBalance(number, balance)
      
      const data = {
        number,
        balance
      } 
      formResponse.success(res, 200, data)

    } catch (error) {
      res.json(error);
    }
      
  },

  shareBalance: (req, res) => {
    const number = req.params.number;
    const target = req.body.target;
    const amount = req.body.amount;

    userModels.getUser(number)
    .then(result => {
      return result[0].balance;
    })
    .then(result => {
      if(parseInt(result) <= parseInt(amount)){
        res.json({error:'Maaf, pulsa anda tidak cukup!'})
      } else {
        const balance = parseInt(result)-parseInt(amount);
        try {
          userModels.setBalance(number, balance)
        } catch (error) {
          res.json(error);
        }
        
        userModels.getUser(target)
        .then(result => {
          return result[0].balance;
        })
        .then(result => {
          const balance = parseInt(result)+parseInt(amount);
    
          try {
            userModels.setBalance(target, balance)
            const data = {
              number:target,
              balance
            } 
            formResponse.success(res, 200, data)
          } catch (error) {
            res.json(error);
          }
        })   
        .catch(error => {
          res.json(error)
        })
      }
      
    })   
    .catch(error => {
      res.json(error)
    })
  },

  decreaseDay: async (req, res) => {
    const users = await userModels.getAllUsers()
    .then(result => {
      return result
    })
    .catch(err => {
      res.json(err)
    })

    users.map(user => {
      let expiration = {};
      if(user.daysUntilExpired > 0){
        user.daysUntilExpired -= 1;
        let date = new Date();
        date.setDate(date.getDate() + user.daysUntilExpired);
        user.expirationDate = date;

        expiration = {
          expirationDate:user.expirationDate,
          daysUntilExpired: user.daysUntilExpired
        }
        let tmpPackages = [];
        user.packages.map(package => {
          if(package.validUntil > 0){
            package.validUntil -= 1;
            tmpPackages.push(package);
          } else {
            userModels.removePackage(user.number, package.id)
          }
        })
        userModels.editPackage(user.number, tmpPackages);
      }
      userModels.updateUser(user.number, expiration)
      .then(result => {
        console.log('result', user.number);
      })
      .catch(error => {
        console.log("error : " + user.number + " is already expired")
      })
    })
  }
};
