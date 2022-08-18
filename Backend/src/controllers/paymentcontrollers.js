const PaymentModels = require("../models/payment");

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
      console.log(req.body)
      const status = await PaymentModels.topup(req.body);
      res.status(200).json({
        status: true,
      });
    } catch (error) {
      res.status(404).json({
        status: false,
        error: error
      });
    }
  };
}

module.exports = PaymentControllers;
