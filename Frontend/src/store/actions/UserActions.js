import axios from "axios";
import { UserConstants } from "./UserConstants.js";
import { AlertActions } from "./AlertActions";
import { store } from "../../store.js";

//Sign Up admin
export const signUpAdmin = (username, password, name) => {
  const admin = { username, password, name };
  return (dispatch) => {
    dispatch(request(admin));
    store.dispatch({ type: UserConstants.REGISTER_REQUEST });
    return axios
      .post("/v1/api/auth/sign-up-admin", {
        username: admin.username,
        password: admin.password,
        name: admin.name,
        role: "admin",
        status: "active",
      })
      .then(
        (res) => {
          dispatch(success(res.data));
          dispatch(AlertActions.success("Registration successful"));
          store.dispatch({
            type: UserConstants.REGISTER_SUCCESS,
            payload: res.data,
          });
          return res.data;
        },
        (error) => {
          dispatch(failure(error.toString()));
          dispatch(AlertActions.error(error.toString()));
          store.dispatch({
            type: UserConstants.REGISTER_FAILURE,
            payload: error,
          });
          return error;
        }
      );
  };

  function request(admin) {
    return { type: UserConstants.REGISTER_REQUEST, admin };
  }
  function success(admin) {
    return { type: UserConstants.REGISTER_SUCCESS, admin };
  }
  function failure(error) {
    return { type: UserConstants.REGISTER_FAILURE, error };
  }
};

export const signUpManager = (username, password) => {
  const manager = { username, password };
  return (dispatch) => {
    dispatch(request(manager));
    store.dispatch({ type: UserConstants.REGISTER_REQUEST });
    return axios
      .post("/v1/api/auth/sign-up-manager", {
        username: manager.username,
        password: manager.password,
        name: "Manager",
        role: "manager",
        status: "active",
      })
      .then(
        (res) => {
          dispatch(success(res.data));
          dispatch(AlertActions.success("Registration successful"));
          store.dispatch({
            type: UserConstants.REGISTER_SUCCESS,
            payload: res.data,
          });
          return res.data;
        },
        (error) => {
          dispatch(failure(error.toString()));
          dispatch(AlertActions.error(error.toString()));
          store.dispatch({
            type: UserConstants.REGISTER_FAILURE,
            payload: error,
          });
          return error;
        }
      );
  };

  function request(manager) {
    return { type: UserConstants.REGISTER_REQUEST, manager };
  }
  function success(manager) {
    return { type: UserConstants.REGISTER_SUCCESS, manager };
  }
  function failure(error) {
    return { type: UserConstants.REGISTER_FAILURE, error };
  }
};

export const signUpUser = (user) => {
  return (dispatch) => {
    dispatch(request(user));
    store.dispatch({ type: UserConstants.REGISTER_REQUEST });
    return axios.post("/v1/api/auth/sign-up-user", user).then(
      (res) => {
        dispatch(success(res.data));
        dispatch(AlertActions.success("Registration successful"));
        store.dispatch({
          type: UserConstants.REGISTER_SUCCESS,
          payload: res.data,
        });
        return res.data;
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(AlertActions.error(error.toString()));
        store.dispatch({
          type: UserConstants.REGISTER_FAILURE,
          payload: error,
        });
        return error;
      }
    );
  };

  function request(user) {
    return { type: UserConstants.REGISTER_REQUEST, user };
  }
  function success(user) {
    return { type: UserConstants.REGISTER_SUCCESS, user };
  }
  function failure(error) {
    return { type: UserConstants.REGISTER_FAILURE, error };
  }
};

//User create password
export const userCreatePassword = (name, password) => {
  return async (dispatch) => {
    return await axios
      .post("/v1/api/auth/user-create-password", {
        name: name,
        password: password,
      })
      .then((res) /*response*/ => {
        return res.data;
      })
      .catch((error) => {
        return error;
      });
  };
};

//User payment create password
export const userPaymentCreatePassword = (username, password) => {
  return async (dispatch) => {
    return await axios
      .post("/v1/api/auth/user-payment-create-password", {
        username: username,
        password: password,
      })
      .then((res) /*response*/ => {
        return res.data;
      })
      .catch((error) => {
        return error;
      });
  };
};

//Login User
export const login = (username, password) => {
  const user = { username, password };
  return async (dispatch) => {
    dispatch(request(user));
    store.dispatch({ type: UserConstants.LOGIN_REQUEST });

    return await axios
      .post("/v1/api/auth/sign-in", {
        username: user.username,
        password: user.password,
      })
      .then((user) /*response*/ => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        dispatch(success(user));
        store.dispatch({
          type: UserConstants.LOGIN_SUCCESS,
          payload: user.data,
        });
        return user.data;
      })
      .catch((error) => {
        dispatch(failure(error.toString()));
        dispatch(AlertActions.error(error.toString()));
        store.dispatch({ type: UserConstants.LOGIN_FAIL, payload: error });
        return error;
      });
  };

  function request(user) {
    return { type: UserConstants.LOGIN_REQUEST, user };
  }
  function success(user) {
    return { type: UserConstants.LOGIN_SUCCESS, user };
  }
  function failure(error) {
    return { type: UserConstants.LOGIN_FAILURE, error };
  }
};

//Login Payment User
export const loginPayment = (username, password) => {
  return async (dispatch) => {
    return await axios
      .post("/v1/api/auth/sign-in-payment", {
        username: username,
        password: password,
      })
      .then((result) /*response*/ => {
        return result.data;
      })
      .catch((error) => {
        return error;
      });
  };

  function request(user) {
    return { type: UserConstants.LOGIN_REQUEST, user };
  }
  function success(user) {
    return { type: UserConstants.LOGIN_SUCCESS, user };
  }
  function failure(error) {
    return { type: UserConstants.LOGIN_FAILURE, error };
  }
};

//Get Manager List
export const getManagerList = () => {
  return async (dispatch) => {
    return await axios
      .post("/v1/api/auth/get-manager-list")
      .then((res) /*response*/ => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        return res.data;
      })
      .catch((error) => {
        return error;
      });
  };
};

//Get Manager History
export const getManagerHistory = (id) => {
  return async (dispatch) => {
    return await axios
      .post("/v1/api/auth/get-manager-history", {
        manager_id: id,
      })
      .then((res) /*response*/ => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        return res.data;
      })
      .catch((error) => {
        return error;
      });
  };
};

//Get User List
export const getUserList = () => {
  return async (dispatch) => {
    return await axios
      .post("/v1/api/auth/get-user-list")
      .then((res) /*response*/ => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        return res.data;
      })
      .catch((error) => {
        return error;
      });
  };
};

//Get Product List
export const getProductList = () => {
  return async (dispatch) => {
    return await axios
      .post("/v1/api/auth/get-product-list")
      .then((res) /*response*/ => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        return res.data;
      })
      .catch((error) => {
        return error;
      });
  };
};

//Get Package List
export const getPackageList = () => {
  return async (dispatch) => {
    return await axios
      .post("/v1/api/auth/get-package-list")
      .then((res) /*response*/ => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        return res.data;
      })
      .catch((error) => {
        return error;
      });
  };
};

//Search packages with order
export const searchPackagesWithOder = (searchTerm, isAscending) => {
  return async (dispatch) => {
    return await axios
      .post("/v1/api/auth/search-packages-order-by", {
        searchTerm: searchTerm,
        isAscending: isAscending,
      })
      .then((res) /*response*/ => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        return res.data;
      })
      .catch((error) => {
        return error;
      });
  };
};

//Get State Statistics data
export const getStateStatisticsData = () => {
  return async (dispatch) => {
    return await axios
      .post("/v1/api/auth/get-state-statistics-data")
      .then((res) /*response*/ => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        return res.data.result;
      })
      .catch((error) => {
        return error;
      });
  };
};

//Get State Statistics data
export const getStateChangeStatisticsData = () => {
  return async (dispatch) => {
    return await axios
      .post("/v1/api/auth/get-state-change-statistics-data")
      .then((res) /*response*/ => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        return res.data.result;
      })
      .catch((error) => {
        return error;
      });
  };
};

//Get Package Consumption Statistics data
export const getPackageConsumptionStatisticsData = () => {
  return async (dispatch) => {
    return await axios
      .post("/v1/api/auth/get-package-consumption-statistics-data")
      .then((res) /*response*/ => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        return res.data.result;
      })
      .catch((error) => {
        return error;
      });
  };
};

//Get Product Consumption Statistics data
export const getProductConsumptionStatisticsData = () => {
  return async (dispatch) => {
    return await axios
      .post("/v1/api/auth/get-product-consumption-statistics-data")
      .then((res) /*response*/ => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        return res.data.result;
      })
      .catch((error) => {
        return error;
      });
  };
};

//Get Balance Debt Payment Statistics data
export const getBalanceDeptPaymentStatisticsData = () => {
  return async (dispatch) => {
    return await axios
      .post("/v1/api/auth/get-balance-debt-payment-statistics-data")
      .then((res) /*response*/ => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        return res.data.result;
      })
      .catch((error) => {
        return error;
      });
  };
};

//Get mimimum payment limit
export const getMinimumPaymentLimit = () => {
  return async (dispatch) => {
    return await axios
      .post("/v1/api/auth/get-minimum-payment-limit")
      .then((res) /*response*/ => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        return res.data.result;
      })
      .catch((error) => {
        return error;
      });
  };
};

//Get payment debt
export const getBalanceDebt = (user_id) => {
  return async (dispatch) => {
    return await axios
      .post("/v1/api/auth/get-balance-debt", {
        user_id: user_id,
      })
      .then((res) /*response*/ => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        return res.data.result;
      })
      .catch((error) => {
        return error;
      });
  };
};

//Get User by id
export const getUserByID = (id) => {
  return async (dispatch) => {
    return await axios
      .post("/v1/api/auth/get-user-by-id", {
        id,
      })
      .then((res) /*response*/ => {
        return res.data;
      })
      .catch((error) => {
        return error;
      });
  };
};

//Get Product by id
export const getProductByID = (id) => {
  return async (dispatch) => {
    return await axios
      .post("/v1/api/auth/get-product-by-id", {
        id: id,
      })
      .then((res) /*response*/ => {
        return res.data;
      })
      .catch((error) => {
        return error;
      });
  };
};

//Get Package by id
export const getPackageByID = (id) => {
  return async (dispatch) => {
    return await axios
      .post("/v1/api/auth/get-package-by-id", {
        id: id,
      })
      .then((res) /*response*/ => {
        return res.data;
      })
      .catch((error) => {
        return error;
      });
  };
};

//Get Products not in Package by id
export const getProductsNotInPackage = (id) => {
  return async (dispatch) => {
    return await axios
      .post("/v1/api/auth/get-products-not-in-package", {
        id: id,
      })
      .then((res) /*response*/ => {
        return res.data;
      })
      .catch((error) => {
        return error;
      });
  };
};

//Get related user by id
export const getRelatedUserByID = (id) => {
  return async (dispatch) => {
    return await axios
      .post("/v1/api/auth/get-related-user-by-id", {
        id: id,
      })
      .then((res) /*response*/ => {
        return res.data;
      })
      .catch((error) => {
        return error;
      });
  };
};

//Get non related user by id
export const getNonRelatedUserByID = (id) => {
  return async (dispatch) => {
    return await axios
      .post("/v1/api/auth/get-non-related-user-by-id", {
        id: id,
      })
      .then((res) /*response*/ => {
        return res.data;
      })
      .catch((error) => {
        return error;
      });
  };
};

//Get user state history by id
export const getUserStateHistoryByID = (id) => {
  return async (dispatch) => {
    return await axios
      .post("/v1/api/auth/get-user-state-history-by-id", {
        id: id,
      })
      .then((res) /*response*/ => {
        return res.data;
      })
      .catch((error) => {
        return error;
      });
  };
};

//Get user treatment location history by id
export const getUserTreatmentLocationHistoryByID = (id) => {
  return async (dispatch) => {
    return await axios
      .post("/v1/api/auth/get-user-tl-history-by-id", {
        id: id,
      })
      .then((res) /*response*/ => {
        return res.data;
      })
      .catch((error) => {
        return error;
      });
  };
};

//Get user package purchased history by id
export const getUserPackagePurchasedHistoryByID = (id) => {
  return async (dispatch) => {
    return await axios
      .post("/v1/api/auth/get-user-pp-history-by-id", {
        id: id,
      })
      .then((res) /*response*/ => {
        return res.data;
      })
      .catch((error) => {
        return error;
      });
  };
};

//Update user state
export const updateUserState = (manager_id, user_id, state_old, state_new) => {
  return async (dispatch) => {
    return await axios
      .post("/v1/api/auth/update-user-state", {
        manager_id: manager_id,
        user_id: user_id,
        state_old: state_old,
        state_new: state_new,
      })
      .then((res) /*response*/ => {
        return res.data;
      })
      .catch((error) => {
        return error;
      });
  };
};

//Update user treatment location
export const updateUserTreatmentLocation = (
  manager_id,
  user_id,
  treatment_location_id_old,
  treatment_location_id_new
) => {
  return async (dispatch) => {
    return await axios
      .post("/v1/api/auth/update-user-treatment-location", {
        manager_id: manager_id,
        user_id: user_id,
        treatment_location_id_old: treatment_location_id_old,
        treatment_location_id_new: treatment_location_id_new,
      })
      .then((res) /*response*/ => {
        return res.data;
      })
      .catch((error) => {
        return error;
      });
  };
};

//Get Treatment Location by id
export const getTreatmentLocationByID = (id) => {
  return async (dispatch) => {
    return await axios
      .post("/v1/api/auth/get-treatment-location-by-id", {
        id,
      })
      .then((res) /*response*/ => {
        return res.data;
      })
      .catch((error) => {
        return error;
      });
  };
};

//Get Treatment Location List
export const getTreatmentLocationList = () => {
  return async (dispatch) => {
    return await axios
      .post("/v1/api/auth/get-treatment-location-list")
      .then((res) /*response*/ => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        return res.data;
      })
      .catch((error) => {
        return error;
      });
  };
};

//Update Account Status
export const changeAccountStatus = (id, currentStatus) => {
  return async (dispatch) => {
    return await axios
      .post("/v1/api/auth/change-account-status", {
        id: id,
        status: currentStatus,
      })
      .then((res) /*response*/ => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        return res.data;
      })
      .catch((error) => {
        return error;
      });
  };
};

//Reset password
export const resetPassword = (user_id, currentPassword, newPassword) => {
  return async (dispatch) => {
    return await axios
      .post("/v1/api/auth/reset-password", {
        user_id: user_id,
        currentPassword: currentPassword,
        newPassword: newPassword,
      })
      .then((res) /*response*/ => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        return res.data;
      })
      .catch((error) => {
        return error;
      });
  };
};

//Add treatment location
export const addTreatmentLocation = (
  name,
  capacity,
  current_patients_number
) => {
  return async (dispatch) => {
    return await axios
      .post("/v1/api/auth/add-treatment-location", {
        name: name,
        capacity: capacity,
        currentPatients: current_patients_number,
      })
      .then((res) /*response*/ => {
        return res.data;
      })
      .catch((error) => {
        return error;
      });
  };
};

//Add related user
export const addRelatedUser = (user_id, related_id) => {
  return async (dispatch) => {
    return await axios
      .post("/v1/api/auth/add-related-user", {
        user_id: user_id,
        related_id: related_id,
      })
      .then((res) /*response*/ => {
        return res.data;
      })
      .catch((error) => {
        return error;
      });
  };
};

//Add product
export const addProduct = (name, image, price, quantityUnit) => {
  return async (dispatch) => {
    return await axios
      .post("/v1/api/auth/add-product", {
        name: name,
        image: image,
        price: price,
        quantity_unit: quantityUnit,
      })
      .then((res) /*response*/ => {
        return res.data;
      })
      .catch((error) => {
        return error;
      });
  };
};

//Add package
export const addPackage = (
  name,
  image,
  max_per_person_per_duration,
  duration,
  duration_unit,
  products
) => {
  return async (dispatch) => {
    return await axios
      .post("/v1/api/auth/add-package", {
        name: name,
        image: image,
        max_per_person_per_duration: max_per_person_per_duration,
        duration: duration,
        duration_unit: duration_unit,
        products: products,
      })
      .then((res) /*response*/ => {
        return res.data;
      })
      .catch((error) => {
        return error;
      });
  };
};

//Update treatment location
export const updateTreatmentLocation = (
  id,
  name,
  capacity,
  current_patients_number
) => {
  return async (dispatch) => {
    return await axios
      .post("/v1/api/auth/update-treatment-location", {
        id: id,
        name: name,
        capacity: capacity,
        currentPatients: current_patients_number,
      })
      .then((res) /*response*/ => {
        return res.data;
      })
      .catch((error) => {
        return error;
      });
  };
};

//Update product
export const updateProduct = (id, name, image, price, quantity_unit) => {
  return async (dispatch) => {
    return await axios
      .post("/v1/api/auth/update-product", {
        id: id,
        name: name,
        image: image,
        price: price,
        quantity_unit: quantity_unit,
      })
      .then((res) /*response*/ => {
        return res.data;
      })
      .catch((error) => {
        return error;
      });
  };
};

//Update package
export const updatePackage = (
  id,
  name,
  image,
  max_per_person_per_duration,
  duration,
  duration_unit
) => {
  return async (dispatch) => {
    return await axios
      .post("/v1/api/auth/update-package", {
        id: id,
        name: name,
        image: image,
        max_per_person_per_duration: max_per_person_per_duration,
        duration: duration,
        duration_unit: duration_unit,
      })
      .then((res) /*response*/ => {
        return res.data;
      })
      .catch((error) => {
        return error;
      });
  };
};

//Update packing
export const updatePacking = (package_id, products) => {
  return async (dispatch) => {
    return await axios
      .post("/v1/api/auth/update-packing", {
        package_id: package_id,
        products: products,
      })
      .then((res) /*response*/ => {
        return res.data;
      })
      .catch((error) => {
        return error;
      });
  };
};

//Update minimum payment limit
export const updateMinimumPaymentLimit = (
  id,
  minimumPaymentLimit,
  newMinimumPaymentLimit
) => {
  return async (dispatch) => {
    return await axios
      .post("/v1/api/auth/update-minimum-payment-limit", {
        manager_id: id,
        minimumPaymentLimit: minimumPaymentLimit,
        newMinimumPaymentLimit: newMinimumPaymentLimit,
      })
      .then((res) /*response*/ => {
        return res.data;
      })
      .catch((error) => {
        return error;
      });
  };
};

//Add new product to package
export const addToPackage = (package_id, products) => {
  return async (dispatch) => {
    return await axios
      .post("/v1/api/auth/add-to-package", {
        package_id: package_id,
        products: products,
      })
      .then((res) /*response*/ => {
        return res.data;
      })
      .catch((error) => {
        return error;
      });
  };
};

//Delete treatment location
export const deleteTreatmentLocation = (id) => {
  return async (dispatch) => {
    return await axios
      .post("/v1/api/auth/delete-treatment-location", {
        id: id,
      })
      .then((res) /*response*/ => {
        return res.data;
      })
      .catch((error) => {
        return error;
      });
  };
};

//Delete product
export const deleteProduct = (id) => {
  return async (dispatch) => {
    return await axios
      .post("/v1/api/auth/delete-product", {
        id: id,
      })
      .then((res) /*response*/ => {
        return res.data;
      })
      .catch((error) => {
        return error;
      });
  };
};

//Delete package
export const deletePackage = (id) => {
  return async (dispatch) => {
    return await axios
      .post("/v1/api/auth/delete-package", {
        id: id,
      })
      .then((res) /*response*/ => {
        return res.data;
      })
      .catch((error) => {
        return error;
      });
  };
};

//Delete package
export const removeProductFromPackage = (product_id, package_id) => {
  return async (dispatch) => {
    return await axios
      .post("/v1/api/auth/remove-product-from-package", {
        product_id: product_id,
        package_id: package_id,
      })
      .then((res) /*response*/ => {
        return res.data;
      })
      .catch((error) => {
        return error;
      });
  };
};

//payment process
export const getTotalPackgesPurchased = (
  user_id,
  packageName,
  duration,
  duration_unit
) => {
  return async (dispatch) => {
    return await axios
      .post("/v1/api/auth/get-total-packages-purchased", {
        user_id: user_id,
        packageName: packageName,
        duration: duration,
        duration_unit: duration_unit,
      })
      .then((res) /*response*/ => {
        return res.data;
      })
      .catch((error) => {
        return error;
      });
  };
};

//payment process
export const paymentProcess = (
  user_id,
  packageName,
  productList,
  total,
  newBalance
) => {
  return async (dispatch) => {
    return await axios
      .post("/v1/api/auth/payment-process", {
        user_id: user_id,
        packageName: packageName,
        productList: productList,
        total: total,
        newBalance: newBalance,
      })
      .then((res) /*response*/ => {
        return res.data;
      })
      .catch((error) => {
        return error;
      });
  };
};

//debt process
export const debtProcess = (
  user_id,
  packageName,
  productList,
  total,
  newBalance,
  debt
) => {
  return async (dispatch) => {
    return await axios
      .post("/v1/api/auth/debt-process", {
        user_id: user_id,
        packageName: packageName,
        productList: productList,
        total: total,
        newBalance: newBalance,
        debt: debt,
      })
      .then((res) /*response*/ => {
        return res.data;
      })
      .catch((error) => {
        return error;
      });
  };
};

//topup
export const topup = (user_id, balance, debt, oldDebt) => {
  return async (dispatch) => {
    return await axios
      .post("/v1/api/auth/topup", {
        user_id: user_id,
        balance: balance,
        debt: debt,
        old_debt: oldDebt,
      })
      .then((res) /*response*/ => {
        return res.data;
      })
      .catch((error) => {
        return error;
      });
  };
};

//Reset payment password
export const paymentResetPassword = (user_id, currentPassword, newPassword) => {
  return async (dispatch) => {
    return await axios
      .post("/v1/api/auth/payment-reset-password", {
        user_id: user_id,
        currentPassword: currentPassword,
        newPassword: newPassword,
      })
      .then((res) /*response*/ => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        return res.data;
      })
      .catch((error) => {
        return error;
      });
  };
};

//Get in debt user list
export const getInDebtUserList = () => {
  return async (dispatch) => {
    return await axios
      .post("/v1/api/auth/get-in-debt-user-list")
      .then((res) /*response*/ => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        return res.data;
      })
      .catch((error) => {
        return error;
      });
  };
};

//send notification
export const sendNotification = (user_id, debt) => {
  return async (dispatch) => {
    return await axios
      .post("/v1/api/auth/send-notification", {
        user_id: user_id,
        debt: debt
      })
      .then((res) /*response*/ => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        return res.data;
      })
      .catch((error) => {
        return error;
      });
  };
};

// Logout
export const logout = () => ({ type: UserConstants.LOGOUT });

export const UserActions = {
  signUpAdmin,
  signUpManager,
  signUpUser,
  login,
  loginPayment,
  userCreatePassword,
  userPaymentCreatePassword,
  getManagerList,
  getManagerHistory,
  getUserList,
  getProductList,
  getPackageList,
  getStateStatisticsData,
  getStateChangeStatisticsData,
  getPackageConsumptionStatisticsData,
  getProductConsumptionStatisticsData,
  getBalanceDeptPaymentStatisticsData,
  getMinimumPaymentLimit,
  getBalanceDebt,
  getTotalPackgesPurchased,
  searchPackagesWithOder,
  getUserByID,
  getProductByID,
  getPackageByID,
  getProductsNotInPackage,
  getRelatedUserByID,
  getNonRelatedUserByID,
  getUserStateHistoryByID,
  getUserTreatmentLocationHistoryByID,
  getUserPackagePurchasedHistoryByID,
  updateUserState,
  updateUserTreatmentLocation,
  getTreatmentLocationByID,
  getTreatmentLocationList,
  addTreatmentLocation,
  addRelatedUser,
  addProduct,
  addPackage,
  updateTreatmentLocation,
  updateProduct,
  updatePackage,
  updatePacking,
  updateMinimumPaymentLimit,
  addToPackage,
  deleteTreatmentLocation,
  deleteProduct,
  deletePackage,
  removeProductFromPackage,
  changeAccountStatus,
  resetPassword,
  paymentResetPassword,
  paymentProcess,
  debtProcess,
  topup,
  getInDebtUserList,
  sendNotification,
  logout,
};
