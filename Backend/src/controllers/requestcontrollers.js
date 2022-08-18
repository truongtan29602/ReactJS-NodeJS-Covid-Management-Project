const UserModel = require("../models/usermodel");
const user = require("../models/userTest");
const jwt = require("jsonwebtoken");
const { encoded_Data, decoded_Data } = require("../constant/hash");
const bcrypt = require("bcrypt");
const messageBird = require("messagebird")("YqFwMJdzEIudazqJNAMOHXRGg");

class requestControllers {
  static async SearchPackagesOrderBy(req, res) {
    try {
      var result = await UserModel.searchPackagesOrderBy(req.body);
      if (result) {
        res.status(200).json({
          packageList: result,
        });
      } else {
        res.status(200).json({
          packageList: null,
        });
      }
    } catch (error) {
      res.status(404).json({
        packageList: null,
        err: error,
      });
    }
  }

  static async SendNotification(req, res) {
    try {
      console.log(req.body);
      var result = await UserModel.SendNotification(req.body);
      res.status(200).json({
        state: result
      });
    } catch (error) {
      res.status(404).json({
        state: false,
        err: error,
      });
    }
  }
}

module.exports = requestControllers;
