const {
  url_payment_process,
  url_debt_process,
  url_topup,
} = require("../../constant/url");
const PaymentControllers = require("../../controllers/paymentcontrollers");

const CheckoutRouter = (app) => {
  app.post(url_payment_process, PaymentControllers.paymentProcess);
  app.post(url_debt_process, PaymentControllers.debtProcess);
  app.post(url_topup, PaymentControllers.topup);
};

module.exports = CheckoutRouter;
