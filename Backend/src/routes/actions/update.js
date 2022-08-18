const {
  url_change_account_status,
  url_update_treatment_location,
  url_update_user_state,
  url_update_user_treatment_location,
  url_update_product,
  url_update_package,
  url_update_packing,
  url_update_minimum_payment_limit,
  url_update,
} = require("../../constant/url");
const UserControllers = require("../../controllers/usercontrollers");

const updateRoute = (app) => {
  app.post(url_change_account_status, UserControllers.changeAccountStatus);
  app.post(url_update, UserControllers.updateAccount);
  app.post(url_update_treatment_location, UserControllers.updateTreatmentLocation);
  app.post(url_update_user_state, UserControllers.updateUserState);
  app.post(url_update_user_treatment_location, UserControllers.updateUserTreatmentLocation);
  app.post(url_update_product, UserControllers.updateProduct);
  app.post(url_update_package, UserControllers.updatePackage);
  app.post(url_update_packing, UserControllers.updatePacking);
  app.post(url_update_minimum_payment_limit, UserControllers.updateMinimumPaymentLimit);
};

module.exports = updateRoute;
