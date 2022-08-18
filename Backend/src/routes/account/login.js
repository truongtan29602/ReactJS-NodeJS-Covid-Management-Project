require("dotenv").config();

const {
  url_login,
  url_login_payment,
  url_get_manager_list,
  url_get_manager_history,
  url_get_user_list,
  url_get_user_by_id,
  url_get_related_user_by_id,
  url_get_non_related_user_by_id,
  url_get_product_list,
  url_get_product_by_id,
  url_get_package_list,
  url_get_package_by_id,
  url_get_products_not_in_package,
  url_get_treatment_location_by_id,
  url_get_treatment_location_list,
  url_get_user_state_history,
  url_get_user_tl_history,
  url_get_user_pp_history,
  url_get_state_statistics_data,
  url_get_state_change_statistics_data,
  url_get_package_consumption_statistics_data,
  url_get_product_consumption_statistics_data,
  url_get_balance_debt_payment_statistics_data,
  url_get_minimum_payment_limit,
  url_get_balance_debt,
  url_get_in_debt_user_list,
  url_get_total_packages_purchased,
} = require("../../constant/url");
const verifySecurity = require("../../middleware/auth");

const UserControllers = require("../../controllers/usercontrollers");

function route(app) {
  app.post(url_login, UserControllers.signIn);
  app.post(url_login_payment, UserControllers.signInPayment);
  app.post("/v1/api/auth/login-with-otp", UserControllers.loginWithOtp);
  app.post(url_get_manager_list, UserControllers.getManagerList);
  app.post(url_get_manager_history, UserControllers.getManagerHistory);
  app.post(url_get_user_list, UserControllers.getUserList);
  app.post(url_get_user_by_id, UserControllers.getUserByID);
  app.post(
    url_get_treatment_location_by_id,
    UserControllers.getTreatmentLocationByID
  );
  app.post(
    url_get_treatment_location_list,
    UserControllers.getTreatmentLocationList
  );
  app.post(url_get_product_list, UserControllers.getProductList);
  app.post(url_get_product_by_id, UserControllers.getProductByID);
  app.post(url_get_related_user_by_id, UserControllers.getRelatedUserByID);
  app.post(url_get_non_related_user_by_id, UserControllers.getNonRelatedUser);

  app.post(url_get_user_state_history, UserControllers.getUserStateHistory);
  app.post(url_get_user_tl_history, UserControllers.getUserTLHistory);
  app.post(url_get_user_pp_history, UserControllers.getUserPPHistory);
  app.post(url_get_package_list, UserControllers.getPackageList);
  app.post(url_get_package_by_id, UserControllers.getPackageByID);
  app.post(
    url_get_products_not_in_package,
    UserControllers.getProductsNotInPackage
  );
  app.post(
    url_get_state_statistics_data,
    UserControllers.getStateStatisticsData
  );
  app.post(
    url_get_state_change_statistics_data,
    UserControllers.getStateChangeStatisticsData
  );
  app.post(
    url_get_package_consumption_statistics_data,
    UserControllers.getPackageConsumptionStatisticsData
  );
  app.post(
    url_get_product_consumption_statistics_data,
    UserControllers.getProductConsumptionStatisticsData
  );
  app.post(
    url_get_balance_debt_payment_statistics_data,
    UserControllers.getBalanceDebtPaymentStatisticsStatisticsData
  );
  app.post(
    url_get_minimum_payment_limit,
    UserControllers.getMinimumPaymentLimit
  );
  app.post(url_get_balance_debt, UserControllers.getBalanceDebt);
  app.post(url_get_in_debt_user_list, UserControllers.getInDebtUserList);
  app.post(
    url_get_total_packages_purchased,
    UserControllers.getTotalPackagesPurchased
  );
}

module.exports = route;
