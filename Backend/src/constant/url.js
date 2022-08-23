//authentication
const url_login = "/v1/api/auth/sign-in";
const url_login_payment = "/v1/api/auth/sign-in-payment";
const url_check_admin_existence = "/v1/api/auth/check-admin-existence";
const url_signup_admin = "/v1/api/auth/sign-up-admin";
const url_signup_manager = "/v1/api/auth/sign-up-manager";
const url_signup_user = "/v1/api/auth/sign-up-user";
const url_user_create_password = "/v1/api/auth/user-create-password";
const url_user_payment_create_password = "/v1/api/auth/user-payment-create-password";
const url_add_treatment_location = "/v1/api/auth/add-treatment-location";
const url_add_related_user = "/v1/api/auth/add-related-user";
const url_add_product = "/v1/api/auth/add-product";
const url_add_package = "/v1/api/auth/add-package";
const url_add_to_package = "/v1/api/auth/add-to-package";
const url_reset_pw = "/v1/api/auth/reset-password";

//update
const url_change_account_status = "/v1/api/auth/change-account-status";
const url_update = "/v1/api/auth/update";
const url_update_treatment_location = "/v1/api/auth/update-treatment-location";
const url_update_user_state = "/v1/api/auth/update-user-state";
const url_update_user_treatment_location = "/v1/api/auth/update-user-treatment-location";
const url_update_product = "/v1/api/auth/update-product";
const url_update_package = "/v1/api/auth/update-package";
const url_update_packing = "/v1/api/auth/update-packing";
const url_update_minimum_payment_limit = "/v1/api/auth/update-minimum-payment-limit";

//get info
const url_get_manager_list = "/v1/api/auth/get-manager-list";
const url_get_manager_history = "/v1/api/auth/get-manager-history";
const url_get_user_list = "/v1/api/auth/get-user-list";
const url_get_product_list = "/v1/api/auth/get-product-list";
const url_get_product_by_id = "/v1/api/auth/get-product-by-id";
const url_get_package_list = "/v1/api/auth/get-package-list";
const url_get_package_by_id = "/v1/api/auth/get-package-by-id";
const url_get_products_not_in_package = "/v1/api/auth/get-products-not-in-package";
const url_get_user_by_id = "/v1/api/auth/get-user-by-id";
const url_get_related_user_by_id = "/v1/api/auth/get-related-user-by-id";
const url_get_non_related_user_by_id = "/v1/api/auth/get-non-related-user-by-id";
const url_get_treatment_location_by_id = "/v1/api/auth/get-treatment-location-by-id";
const url_get_treatment_location_list = "/v1/api/auth/get-treatment-location-list";
const url_get_user_state_history = "/v1/api/auth/get-user-state-history-by-id";
const url_get_user_tl_history = "/v1/api/auth/get-user-tl-history-by-id";
const url_get_user_pp_history = "/v1/api/auth/get-user-pp-history-by-id";
const url_get_state_statistics_data = "/v1/api/auth/get-state-statistics-data";
const url_get_state_change_statistics_data = "/v1/api/auth/get-state-change-statistics-data";
const url_get_package_consumption_statistics_data = "/v1/api/auth/get-package-consumption-statistics-data";
const url_get_product_consumption_statistics_data = "/v1/api/auth/get-product-consumption-statistics-data";
const url_get_balance_debt_payment_statistics_data = "/v1/api/auth/get-balance-debt-payment-statistics-data";
const url_get_minimum_payment_limit = "/v1/api/auth/get-minimum-payment-limit";
const url_get_balance_debt = "/v1/api/auth/get-balance-debt";
const url_get_in_debt_user_list = "/v1/api/auth/get-in-debt-user-list";

//logout
const url_logout = "/v1/api/auth/logout";

//delete
const url_delete_treatment_location = "/v1/api/auth/delete-treatment-location";
const url_delete_product = "/v1/api/auth/delete-product";
const url_delete_package = "/v1/api/auth/delete-package";
const url_remove_product_from_package = "/v1/api/auth/remove-product-from-package";

//search
const url_search_packages_order_by = "/v1/api/auth/search-packages-order-by";

//payment
const url_get_total_packages_purchased = "/v1/api/auth/get-total-packages-purchased";
const url_payment_process = "/v1/api/auth/payment-process";
const url_debt_process = "/v1/api/auth/debt-process";
const url_topup = "/v1/api/auth/topup";
const url_payment_reset_pw = "/v1/api/auth/payment-reset-password";

//send notification
const url_send_notification = "/v1/api/auth/send-notification";

//authorization
const url_is_authenticated = "/v1/api/auth/is-authenticated";

module.exports = {
  url_add_treatment_location,
  url_add_related_user,
  url_add_product,
  url_add_package,
  url_login,
  url_login_payment,
  url_check_admin_existence,
  url_reset_pw,
  url_signup_admin,
  url_signup_manager,
  url_signup_user,
  url_user_create_password,
  url_user_payment_create_password,
  url_change_account_status,
  url_update,
  url_update_treatment_location,
  url_update_user_state,
  url_update_user_treatment_location,
  url_update_product,
  url_update_package,
  url_update_packing,
  url_update_minimum_payment_limit,
  url_add_to_package,
  url_logout,
  url_get_user_list,
  url_get_manager_list,
  url_get_manager_history,
  url_get_product_list,
  url_get_product_by_id,
  url_get_package_list,
  url_get_package_by_id,
  url_get_products_not_in_package,
  url_get_user_by_id,
  url_get_related_user_by_id,
  url_get_non_related_user_by_id,
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
  url_delete_treatment_location,
  url_delete_product,
  url_delete_package,
  url_remove_product_from_package,
  url_search_packages_order_by,
  url_get_total_packages_purchased,
  url_payment_process,
  url_debt_process,
  url_topup,
  url_payment_reset_pw,
  url_send_notification,
  url_is_authenticated
};
