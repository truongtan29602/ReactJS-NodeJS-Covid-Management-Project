import React from "react";
import { useEffect } from "react";
import "./Screens.css";
import { Provider } from "react-redux";
import { store } from "../store";
import { BrowserRouter as Switch, Route, Router } from "react-router-dom";
import SignIn from "./SignIn/SignIn";
import SignUp from "./SignUp/SignUp";
import AdminHome from "./Admin/HomeAdmin/HomeAdmin";
import AdminCreate from "./Admin/Create/Create";
import AdminManager from "./Admin/Manager/Manager";
import AdminManagerHistory from "./Admin/Manager/ManagerHistory/ManagerHistory";
import AdminTreatmentLocation from "./Admin/TreatmentLocation/TreatmentLocation";
import AdminTreatmentLocationCreate from "./Admin/TreatmentLocationCreate/TreatmentLocationCreate";
import AdminTreatmentLocationEdit from "./Admin/TreatmentLocationEdit/TreatmentLocationEdit";

import ManagerHome from "./Manager/HomeManager/HomeManager";
import ManagerUserList from "./Manager/UserList/UserList";
import ManagerUserDetails from "./Manager/UserDetails/UserDetails";
import ManagerUserRegistration from "./Manager/UserRegistration/UserRegistration";
import ManagerProductList from "./Manager/ProductList/ProductList";
import ManagerAddProduct from "./Manager/AddProduct/AddProduct";
import ManagerEditProduct from "./Manager/EditProduct/EditProduct";
import ManagerPackageList from "./Manager/PackageList/PackageList";
import ManagerAddPackage from "./Manager/AddPackage/AddPackage";
import ManagerEditPackage from "./Manager/EditPackage/EditPackage";
import ManagerStateStatistics from "./Manager/StateStatistics/StateStatistics";
import ManagerStateChangeStatistics from "./Manager/StateChangeStatistics/StateChangeStatistics";
import ManagerPackageConsumptionStatistics from "./Manager/PackageConsumptionStatistics/PackageConsumptionStatistics";
import ManagerProductConsumptionStatistics from "./Manager/ProductConsumptionStatistics/ProductConsumptionStatistics";
import ManagerMinimumPaymentLimit from "./Manager/MinimumPaymentLimit/MinimumPaymentLimit";
import ManagerBalanceDebtPaymentStatistics from "./Manager/BalanceDebtPaymentStatistics/BalanceDebtPaymentStatistics";
import ManagerSendPaymentNotification from "./Manager/SendPaymentNotification/SendPaymentNotification";

import UserPersonalInfo from "./User/PersonalInfo/PersonalInfo";
import UserResetPassword from "./User/ResetPassword/ResetPassword";
import UserManagedHistory from "./User/ManagedHistory/ManagedHistory";
import UserPackagePurchasedHistory from "./User/PackagePurchasedHistory/PackagePurchasedHistory";
import UserPaymentHistory from "./User/PaymentHistory/PaymentHistory";

import UserBalance from "./User/Balance/Balance";
import UserPackages from "./User/Packages/Packages";
import UserPackage from "./User/Package/Package";

import PaymentSignIn from "./PaymentSystem/PaymentSignIn/PaymentSignIn";
import PaymentTopup from "./PaymentSystem/PaymentTopup/PaymentTopup";
import PaymentResetPassword from "./PaymentSystem/PaymentResetPassword/PaymentResetPassword";

import { createBrowserHistory } from "history";

//import setAuthToken from "utils/setAuthToken";
//import { loadUser } from "store/actions/UserActions";
//import { UserConstants } from "store/actions/UserConstants";

const history = createBrowserHistory();
//import { loadUser } from "store/actions/UserActions";

const Screens = (props) => {
  return (
    <Provider store={store}>
      <Router history={history}>
        <Switch>
          <Route exact path="/sign-in" component={SignIn} />
          <Route exact path="/" component={SignUp} />
          <Route exact path="/admin" component={AdminHome} />
          <Route exact path="/admin/create" component={AdminCreate} />
          <Route exact path="/admin/manage" component={AdminManager} />
          <Route
            exact
            path="/admin/treatment"
            component={AdminTreatmentLocation}
          />
          <Route
            exact
            path="/admin/treatment/create"
            component={AdminTreatmentLocationCreate}
          />
          <Route
            path="/admin/treatment/edit/:id"
            component={AdminTreatmentLocationEdit}
          />
          <Route
            path="/admin/manager/detail/:id"
            component={AdminManagerHistory}
          />
          <Route exact path="/manager/:id" component={ManagerHome} />
          <Route
            exact
            path="/manager/:id/userList"
            component={ManagerUserList}
          />
          <Route
            exact
            path="/manager/:id/addUser"
            component={ManagerUserRegistration}
          />
          <Route
            exact
            path="/manager/:id/productList"
            component={ManagerProductList}
          />
          <Route
            exact
            path="/manager/:id/detail/:user_id"
            component={ManagerUserDetails}
          />
          <Route
            exact
            path="/manager/:id/addProduct"
            component={ManagerAddProduct}
          />
          <Route
            exact
            path="/manager/:id/editProduct/:product_id"
            component={ManagerEditProduct}
          />
          <Route
            exact
            path="/manager/:id/packageList"
            component={ManagerPackageList}
          />
          <Route
            exact
            path="/manager/:id/addPackage"
            component={ManagerAddPackage}
          />
          <Route
            exact
            path="/manager/:id/editPackage/:package_id"
            component={ManagerEditPackage}
          />
          <Route
            exact
            path="/manager/:id/chartStateByTime"
            component={ManagerStateStatistics}
          />
          <Route
            exact
            path="/manager/:id/chartStateChange"
            component={ManagerStateChangeStatistics}
          />
          <Route
            exact
            path="/manager/:id/chartPackage"
            component={ManagerPackageConsumptionStatistics}
          />
          <Route
            exact
            path="/manager/:id/chartProduct"
            component={ManagerProductConsumptionStatistics}
          />
          <Route
            exact
            path="/manager/:id/chartBalanceDeptPayment"
            component={ManagerBalanceDebtPaymentStatistics}
          />
          <Route
            exact
            path="/manager/:id/changeMinPayment"
            component={ManagerMinimumPaymentLimit}
          />
          <Route
            exact
            path="/manager/:id/sendPaymentNotification"
            component={ManagerSendPaymentNotification}
          />
          <Route exact path="/user/:user_id" component={UserPersonalInfo} />
          <Route
            exact
            path="/user/:user_id/resetPassword"
            component={UserResetPassword}
          />
          <Route
            exact
            path="/user/:user_id/managedHistory"
            component={UserManagedHistory}
          />
          <Route
            exact
            path="/user/:user_id/packagePurchasedHistory"
            component={UserPackagePurchasedHistory}
          />
          <Route
            exact
            path="/user/:user_id/paymentHistory"
            component={UserPaymentHistory}
          />
          <Route
            exact
            path="/user/:user_id/balance-debt"
            component={UserBalance}
          />
          <Route
            exact
            path="/user/:user_id/packages"
            component={UserPackages}
          />
          <Route
            exact
            path="/user/:user_id/package/:package_id"
            component={UserPackage}
          />
          <Route
            exact
            path="/paymentSystem/sign-in"
            component={PaymentSignIn}
          />
          <Route
            exact
            path="/paymentSystem/user/:user_id"
            component={PaymentTopup}
          />
          <Route
            exact
            path="/paymentSystem/user/:user_id/resetPassword"
            component={PaymentResetPassword}
          />
        </Switch>
      </Router>
    </Provider>
  );
};

export default Screens;
