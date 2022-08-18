const {
  url_signup_admin,
  url_check_admin_existence,
  url_signup_manager,
  url_signup_user,
  url_add_treatment_location,
  url_add_related_user,
  url_add_product,
  url_add_package,
  url_add_to_package,
  url_user_create_password,
  url_user_payment_create_password,
} = require("../../constant/url");
const UserControllers = require("../../controllers/usercontrollers");

const registerRoute = (app) => {
  app.get(url_check_admin_existence, UserControllers.checkAdminExistence);
  app.post(url_signup_admin, UserControllers.signUp);
  app.post(url_signup_manager, UserControllers.signUp);
  app.post(url_signup_user, UserControllers.signUpUser);
  app.post(url_user_create_password, UserControllers.userCreatePassword);
  app.post(url_user_payment_create_password, UserControllers.userPaymentCreatePassword);
  app.post(url_add_treatment_location, UserControllers.addTreatmentLocation);
  app.post(url_add_related_user, UserControllers.addRelatedUser);
  app.post(url_add_product, UserControllers.addProduct);
  app.post(url_add_package, UserControllers.addPackage);
  app.post(url_add_to_package, UserControllers.addToPackage);
};

module.exports = registerRoute;
