const PaymentModels = require("../models/payment");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/usermodel");

class PaymentControllers {
  static paymentProcess = async (req, res) => {
    try {
      const status = await PaymentModels.paymentProcess(req.body);
      res.status(200).json({
        status: true,
      });
    } catch (error) {
      res.status(404).json({
        status: false,
      });
    }
  };
  static debtProcess = async (req, res) => {
    try {
      const status = await PaymentModels.debtProcess(req.body);
      res.status(200).json({
        status: true,
      });
    } catch (error) {
      res.status(404).json({
        status: false,
      });
    }
  };
  static topup = async (req, res) => {
    try {
      const token = req.headers["authorization"];
      if (token !== "null") {
        const data = { token: token, user_id: parseInt(req.body.user_id) };
        var result = await UserModel.IsAuthenticated(data);
        if (result) {
          const status = await PaymentModels.topup(req.body);
          res.status(200).json({
            status: true,
          });
        } else {
          res.status(200).json({
            status: false,
            error: "Unauthorized action",
          });
        }
      } else {
        res.status(200).json({
          status: false,
          error: "Unauthorized action",
        });
      }
    } catch (error) {
      res.status(404).json({
        status: false,
        error: error,
      });
    }
  };
}

module.exports = PaymentControllers;
