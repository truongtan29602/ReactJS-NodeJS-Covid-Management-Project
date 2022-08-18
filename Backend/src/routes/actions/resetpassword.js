const { url_reset_pw, url_payment_reset_pw } = require("../../constant/url");
const UserControllers = require("../../controllers/usercontrollers");



const resestPasswordRoute = (app) => {
    app.post(url_reset_pw, UserControllers.resetPassword);
    app.post(url_payment_reset_pw, UserControllers.paymentResetPassword);
}

module.exports = resestPasswordRoute;