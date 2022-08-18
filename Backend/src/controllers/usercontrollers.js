require("dotenv").config();

const user = require("../models/userTest");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/usermodel");

const { encoded_Data, decoded_Data } = require("../constant/hash");
const bcrypt = require("bcrypt");
const messageBird = require("messagebird")("YqFwMJdzEIudazqJNAMOHXRGg");

class UserControllers {
  static changeAccountStatus = async (req, res) => {
    try {
      var id = req.body.id;
      var currentStatus = req.body.status;
      var result = await UserModel.changeAccountStatus(id, currentStatus);

      res.status(200).json({
        statusChange: result,
      });
    } catch (error) {
      res.status(404).json({
        adminExistence: false,
        err: error,
      });
    }
  };
  static checkAdminExistence = async (req, res) => {
    try {
      var result = await UserModel.checkAdminExistence();
      if (result) {
        res.status(200).json({
          adminExistence: true,
        });
      } else {
        res.status(200).json({
          adminExistence: false,
        });
      }
    } catch (error) {
      res.status(404).json({
        adminExistence: false,
        err: error,
      });
    }
  };

  static async signIn(req, res) {
    try {
      var checkValidate = await UserModel.validateLogin(req.body);
      if (!checkValidate.loginState) {
        if (checkValidate.error === "First time user login") {
          console.log("Here");
          return res.json({
            err: { message: "First time user login" },
            loginState: false,
          });
        } else {
          console.log("Here1");
          return res.json({
            err: {
              statusCode: 401,
              message: "Incorrect username or password.",
              profile: null,
              account_id: -1,
            },
            loginState: false,
          });
        }
      } else {
        var [result, _] = await UserModel.findUserByUsername(req.body.username);

        if (result[0]["role"] === "manager") {
          await UserModel.insertManagerHistory(
            result[0]["account_id"],
            "Login",
            "Success"
          );
        }

        return res.json({
          loginState: true,
          statusCode: 200,
          profile: result[0],
          account_id: result[0]["account_id"],
        });
      }
    } catch (error) {
      return res.json({
        loginState: false,
        err: error,
        statusCode: 401,
        account_id: -1,
      });
    }
  }

  static async signInPayment(req, res) {
    try {
      var [result, _] = await UserModel.findUserByUsername(req.body.username);
      var checkValidate = await UserModel.validatePaymentLogin({
        ID: result[0].account_id,
        password: req.body.password,
      });
      if (!checkValidate.loginState) {
        if (checkValidate.error) {
          return res.json({
            err: { message: checkValidate.error },
            loginState: false,
          });
        }
        return res.json({
          err: {
            statusCode: 401,
            message: "Incorrect username or password.",
            profile: null,
            account_id: -1,
          },
          loginState: false,
        });
      } else {
        return res.json({
          loginState: true,
          statusCode: 200,
          profile: result[0],
          account_id: result[0]["account_id"],
        });
      }
    } catch (error) {
      return res.json({
        loginState: false,
        err: error,
        statusCode: 401,
        account_id: -1,
      });
    }
  }

  static signUp = async (req, res) => {
    try {
      var _username = req.body.username;
      var [result, _] = await UserModel.findUserByUsername(_username);
      if (result[0]) {
        return res.json({
          registerState: false,
          error: "Username already exists",
          statusCode: 200,
          profile: result[0],
          account_id: result[0]["account_id"],
        });
      }

      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password, salt);
      let usermodel = new UserModel(req.body);

      usermodel = await usermodel.register();

      var [result, _] = await UserModel.findUserByUsername(req.body.username);
      return res.json({
        registerState: true,
        statusCode: 200,
        profile: result[0],
        account_id: result[0]["account_id"],
      });
    } catch (error) {
      return res.json({
        registerState: false,
        err: error,
        statusCode: 404,
        account_id: -1,
      });
    }
  };

  static signUpUser = async (req, res) => {
    try {
      var _username = req.body.username;
      var [result, _] = await UserModel.findUserByUsername(_username);
      if (result[0]) {
        return res.json({
          registerState: false,
          error: "Username already exists",
          statusCode: 200,
          profile: result[0],
          account_id: result[0]["account_id"],
        });
      }

      var _national_id = req.body.national_id;
      var [result, _] = await UserModel.findUserByNationalID(_national_id);
      if (result[0]) {
        return res.json({
          registerState: false,
          error: "National ID used",
          statusCode: 200,
        });
      }

      let usermodel1 = new UserModel(req.body);
      usermodel1 = await usermodel1.register();
      var [result, _] = await UserModel.findUserByUsername(_username);

      let usermodel2 = new UserModel(req.body);
      usermodel2 = await usermodel2.registerUser(result[0]["account_id"]);

      UserModel.insertUserToTreatmentLocation(req.body.treatment_location);

      if (req.body.related_user) {
        UserModel.insertRelation(
          result[0]["account_id"],
          parseInt(req.body.related_user)
        );
      }

      let isHistory = await UserModel.checkStateHistory(req.body.state);
      if (isHistory) {
        UserModel.insertState(req.body.state);
      } else {
        await UserModel.createStateHistory(req.body.state);
      }
      await UserModel.registerUserPayment(parseInt(result[0]["account_id"]));
      return res.json({
        registerState: true,
        statusCode: 200,
        profile: result[0],
        account_id: result[0]["account_id"],
      });
    } catch (error) {
      return res.json({
        registerState: false,
        err: error,
        statusCode: 404,
        account_id: -1,
      });
    }
  };

  static userCreatePassword = async (req, res) => {
    try {
      const salt = await bcrypt.genSalt(10);

      req.body.password = req.body.password
        ? await bcrypt.hash(req.body.password, salt)
        : null;

      var result = await UserModel.userCreatePassword(
        req.body.name,
        req.body.password
      );

      if (result) {
        return res.status(200).json({
          message: "Password created successfully",
        });
      } else {
        return res.status(404).json({
          message: "Failed to create password",
        });
      }
    } catch (error) {
      return res.status(404).json({
        message: "Cannot create new passwoed",
      });
    }
  };

  static userPaymentCreatePassword = async (req, res) => {
    try {
      const salt = await bcrypt.genSalt(10);

      req.body.password = req.body.password
        ? await bcrypt.hash(req.body.password, salt)
        : null;
      var [result1, _] = await UserModel.findUserByUsername(req.body.username);
      var result = await UserModel.userPaymentCreatePassword(
        result1[0].account_id,
        req.body.password
      );

      if (result) {
        return res.status(200).json({
          message: "Password created successfully",
        });
      } else {
        return res.status(404).json({
          message: "Failed to create password",
        });
      }
    } catch (error) {
      return res.status(404).json({
        message: "Cannot create new passwoed",
      });
    }
  };

  static addTreatmentLocation = async (req, res) => {
    try {
      var [result, _] = await UserModel.findTreatmentLocationByName(
        req.body.name
      );
      if (result[0]) {
        return res.json({
          addLocationState: false,
          error: "Location already exists",
          statusCode: 200,
          location: result[0],
        });
      }
      const location = await UserModel.addTreatmentLocation(req.body);
      [result, _] = await UserModel.findTreatmentLocationByName(req.body.name);
      if (result[0]) {
        return res.json({
          addLocationState: true,
          statusCode: 200,
          location: result[0],
        });
      } else {
        return res.json({
          addLocationState: false,
          statusCode: 200,
          location: null,
        });
      }
    } catch {
      return res.json({
        addLocationState: false,
        err: error,
        statusCode: 404,
      });
    }
  };

  static addRelatedUser = async (req, res) => {
    try {
      console.log(req.body);
      UserModel.insertRelation(
        parseInt(req.body.user_id),
        parseInt(req.body.related_id)
      );
      console.log(req.body);
      return res.json({
        addRelationState: true,
        statusCode: 200,
      });
    } catch {
      return res.json({
        addRelationState: false,
        err: error,
        statusCode: 404,
      });
    }
  };

  static addProduct = async (req, res) => {
    try {
      console.log(req.body);
      UserModel.addProduct(req.body);
      return res.json({
        addProductState: true,
        message: "Product added successfully",
        statusCode: 200,
      });
    } catch {
      return res.json({
        addProductState: false,
        message: "Failed to add product",
        err: error,
        statusCode: 404,
      });
    }
  };

  static addPackage = async (req, res) => {
    try {
      console.log(req.body);
      UserModel.addPackage(req.body);
      return res.json({
        addPackageState: true,
        statusCode: 200,
      });
    } catch {
      return res.json({
        addPackageState: false,
        err: error,
        statusCode: 404,
      });
    }
  };

  static addToPackage = async (req, res) => {
    try {
      UserModel.addToPackage(req.body);
      return res.json({
        addToPackageState: true,
        message: "Product added to package successfully",
        statusCode: 200,
      });
    } catch {
      return res.json({
        addToPackageState: false,
        message: "Failed to add product to package",
        err: error,
        statusCode: 404,
      });
    }
  };

  static loginWithOtp = async (req, res) => {
    try {
      const { phone, otp } = req.body;
      var result = await UserAction.loginWithOtp(phone, otp);
      return res.status(result.status ? 200 : 404).json({
        message: result.status ? "login successfully" : "login failed",
        token: result.token ? result.token : null,
        status: result.status,
      });
    } catch (error) {
      return res.status(401).json({
        message: "login failed",
        status: false,
      });
    }
  };

  static updateAccount = async (req, res) => {
    try {
      const salt = await bcrypt.genSalt(10);

      req.body.password = req.body.password
        ? await bcrypt.hash(req.body.password, salt)
        : null;

      var result = await UserModel.updateUser(req.body);
      if (result["inforUpdate"] !== null) {
        return res.status(200).json({
          message: "Update successfully",
          refreshToken: result["refreshToken"],
        });
      } else {
        return res.status(404).json({
          message: "Account id not exist",
        });
      }
    } catch (error) {
      return res.status(404).json({
        message: "Cannot update",
      });
    }
  };

  static updateTreatmentLocation = async (req, res) => {
    try {
      var result = await UserModel.updateTreatmentLocation(req.body);

      return res.status(200).json({
        message: "Update successfully",
      });
    } catch (error) {
      return res.status(404).json({
        message: "Cannot update",
      });
    }
  };

  static updateProduct = async (req, res) => {
    try {
      var result = await UserModel.updateProduct(req.body);

      return res.status(200).json({
        message: "Update successfully",
      });
    } catch (error) {
      return res.status(404).json({
        message: "Cannot update",
      });
    }
  };

  static updatePackage = async (req, res) => {
    try {
      var result = await UserModel.updatePackage(req.body);

      return res.status(200).json({
        message: "Update successfully",
      });
    } catch (error) {
      return res.status(404).json({
        message: "Cannot update",
      });
    }
  };

  static updatePacking = async (req, res) => {
    try {
      console.log(req.body);
      var result = await UserModel.updatePacking(req.body);

      return res.status(200).json({
        message: "Update successfully",
      });
    } catch (error) {
      return res.status(404).json({
        message: "Cannot update",
      });
    }
  };

  static updateUserState = async (req, res) => {
    try {
      console.log(req.body);
      var result = await UserModel.updateUserState(req.body);
      await UserModel.insertManagerHistory(
        req.body.manager_id,
        "Update user state",
        `User ${req.body.user_id}: ${req.body.state_old} -> ${req.body.state_new}`
      );

      let isHistory = await UserModel.checkStateHistory(req.body.state_new);
      if (isHistory) {
        UserModel.insertState(req.body.state_new);
      } else {
        await UserModel.createStateHistory(req.body.state_new);
      }
      //await UserModel.updateRelatedState(req.body);

      return res.status(200).json({
        message: "Update successfully",
      });
    } catch (error) {
      return res.status(404).json({
        message: "Cannot update",
      });
    }
  };

  static updateUserTreatmentLocation = async (req, res) => {
    try {
      var result = await UserModel.updateUserTreatmentLocation(req.body);
      await UserModel.insertManagerHistory(
        req.body.manager_id,
        "Update user location",
        `User ${req.body.user_id}: ${req.body.treatment_location_id_old} -> ${req.body.treatment_location_id_new}`
      );
      return res.status(200).json({
        message: "Update successfully",
      });
    } catch (error) {
      return res.status(404).json({
        message: "Cannot update",
      });
    }
  };

  static updateMinimumPaymentLimit = async (req, res) => {
    try {
      console.log(req.body);
      var result = await UserModel.updateMinimumPaymentLimit(req.body);
      await UserModel.insertManagerHistory(
        req.body.manager_id,
        "Update minimum payment limit",
        `MPL: ${req.body.minimumPaymentLimit} -> ${req.body.newMinimumPaymentLimit}`
      );
      return res.status(200).json({
        message: "Update successfully",
      });
    } catch (error) {
      return res.status(404).json({
        message: "Cannot update",
      });
    }
  };

  static logout = async (req, res) => {
    try {
      const [result, _] = await UserModel.logout(req.body);
      if (result) {
        res.json({
          status: true,
        });
      } else {
        res.json({
          status: false,
        });
      }
    } catch (error) {
      res.json({
        status: false,
      });
    }
  };

  static getManagerList = async (req, res) => {
    try {
      var result = await UserModel.getManagerList();
      if (result) {
        res.status(200).json({
          managerList: result,
        });
      } else {
        res.status(200).json({
          managerList: null,
        });
      }
    } catch (error) {
      res.status(404).json({
        managerList: null,
        err: error,
      });
    }
  };

  static getManagerHistory = async (req, res) => {
    try {
      const id = parseInt(req.body.manager_id);
      var result = await UserModel.getManagerHistory(id);
      console.log(result);
      if (result) {
        res.status(200).json({
          history: result,
        });
      } else {
        res.status(200).json({
          history: null,
        });
      }
    } catch (error) {
      res.status(404).json({
        history: null,
        err: error,
      });
    }
  };

  static getUserList = async (req, res) => {
    try {
      var result = await UserModel.getUserList();
      if (result) {
        res.status(200).json({
          userList: result,
        });
      } else {
        res.status(200).json({
          userList: null,
        });
      }
    } catch (error) {
      res.status(404).json({
        userList: null,
        err: error,
      });
    }
  };

  static getProductList = async (req, res) => {
    try {
      var result = await UserModel.getProductList();
      if (result) {
        res.status(200).json({
          productList: result,
        });
      } else {
        res.status(200).json({
          productList: null,
        });
      }
    } catch (error) {
      res.status(404).json({
        productList: null,
        err: error,
      });
    }
  };

  static getPackageList = async (req, res) => {
    try {
      var result = await UserModel.getPackageList();
      if (result) {
        res.status(200).json({
          packageList: result,
        });
      } else {
        res.status(200).json({
          packageList: null,
        });
      }
    } catch (error) {
      res.status(404).json({
        packageList: null,
        err: error,
      });
    }
  };

  static getStateStatisticsData = async (req, res) => {
    try {
      var result = await UserModel.getStateStatisticsData();
      if (result) {
        res.status(200).json({
          result,
        });
      } else {
        res.status(200).json({
          result,
        });
      }
    } catch (error) {
      res.status(404).json({
        err: error,
      });
    }
  };

  static getStateChangeStatisticsData = async (req, res) => {
    try {
      var result = await UserModel.getStateChangeStatisticsData();
      res.status(200).json({
        result,
      });
    } catch (error) {
      res.status(404).json({
        err: error,
      });
    }
  };

  static getPackageConsumptionStatisticsData = async (req, res) => {
    try {
      var result = await UserModel.getPackageConsumptionStatisticsData();
      res.status(200).json({
        result,
      });
    } catch (error) {
      res.status(404).json({
        err: error,
      });
    }
  };

  static getProductConsumptionStatisticsData = async (req, res) => {
    try {
      var result = await UserModel.getProductConsumptionStatisticsData();
      res.status(200).json({
        result,
      });
    } catch (error) {
      res.status(404).json({
        err: error,
      });
    }
  };

  static getBalanceDebtPaymentStatisticsStatisticsData = async (req, res) => {
    try {
      var result =
        await UserModel.getBalanceDebtPaymentStatisticsStatisticsData();
      res.status(200).json({
        result,
      });
    } catch (error) {
      res.status(404).json({
        err: error,
      });
    }
  };

  static getMinimumPaymentLimit = async (req, res) => {
    try {
      var result = await UserModel.getMinimumPaymentLimit();
      res.status(200).json({
        result,
      });
    } catch (error) {
      res.status(404).json({
        err: error,
      });
    }
  };

  static getBalanceDebt = async (req, res) => {
    try {
      var result = await UserModel.getBalanceDebt(parseInt(req.body.user_id));
      res.status(200).json({
        result,
      });
    } catch (error) {
      res.status(404).json({
        err: error,
      });
    }
  };

  static getInDebtUserList = async (req, res) => {
    try {
      var result = await UserModel.getInDebtUserList();
      if (result) {
        res.status(200).json({
          userList: result,
        });
      } else {
        res.status(200).json({
          userList: null,
        });
      }
    } catch (error) {
      res.status(404).json({
        userList: null,
        err: error,
      });
    }
  };

  static getTotalPackagesPurchased = async (req, res) => {
    try {
      var result = await UserModel.getTotalPackagesPurchased(req.body);
      res.status(200).json({
        result,
      });
    } catch (error) {
      res.status(404).json({
        err: error,
      });
    }
  };

  static getProductByID = async (req, res) => {
    try {
      const id = req.body.id;
      var result = await UserModel.getProductByID(id);
      if (result) {
        res.status(200).json({
          product: result[0],
        });
      } else {
        res.status(200).json({
          product: null,
        });
      }
    } catch (error) {
      res.status(404).json({
        product: null,
        err: error,
      });
    }
  };

  static getPackageByID = async (req, res) => {
    try {
      const id = req.body.id;
      var result1 = await UserModel.getPackageByID(id);
      var result2 = await UserModel.getPackageProductsByID(id);
      if (result1) {
        res.status(200).json({
          package: result1[0],
          products: result2,
        });
      } else {
        res.status(200).json({
          package: null,
        });
      }
    } catch (error) {
      res.status(404).json({
        package: null,
        err: error,
      });
    }
  };

  static getProductsNotInPackage = async (req, res) => {
    try {
      const id = parseInt(req.body.id);
      var result2 = await UserModel.getProductsNotInPackage(id);
      if (result2) {
        res.status(200).json({
          products: result2,
        });
      } else {
        res.status(200).json({
          products: null,
        });
      }
    } catch (error) {
      res.status(404).json({
        products: null,
        err: error,
      });
    }
  };

  static getUserByID = async (req, res) => {
    try {
      const id = req.body.id;
      var result = await UserModel.getUserByID(id);
      if (result) {
        res.status(200).json({
          user: result[0],
        });
      } else {
        res.status(200).json({
          user: null,
        });
      }
    } catch (error) {
      res.status(404).json({
        user: null,
        err: error,
      });
    }
  };

  static getRelatedUserByID = async (req, res) => {
    try {
      const id = req.body.id;
      var result = await UserModel.getRelatedUserByID(id);
      if (result) {
        res.status(200).json({
          related_users: result[0],
        });
      } else {
        res.status(200).json({
          related_users: null,
        });
      }
    } catch (error) {
      res.status(404).json({
        related_users: null,
        err: error,
      });
    }
  };

  static getNonRelatedUser = async (req, res) => {
    try {
      const id = req.body.id;
      var result = await UserModel.getNonRelatedUser(id);
      if (result) {
        res.status(200).json({
          non_related_users: result[0],
        });
      } else {
        res.status(200).json({
          non_related_users: null,
        });
      }
    } catch (error) {
      res.status(404).json({
        non_related_users: null,
        err: error,
      });
    }
  };

  static getUserStateHistory = async (req, res) => {
    try {
      const id = req.body.id;
      var result = await UserModel.getUserStateHistory(id);
      if (result) {
        res.status(200).json({
          historyList: result,
        });
      } else {
        res.status(200).json({
          historyList: null,
        });
      }
    } catch (error) {
      res.status(404).json({
        historyList: null,
        err: error,
      });
    }
  };

  static getUserTLHistory = async (req, res) => {
    try {
      const id = req.body.id;
      var result = await UserModel.getUserTLHistory(id);
      if (result) {
        res.status(200).json({
          historyList: result,
        });
      } else {
        res.status(200).json({
          historyList: null,
        });
      }
    } catch (error) {
      res.status(404).json({
        historyList: null,
        err: error,
      });
    }
  };

  static getUserPPHistory = async (req, res) => {
    try {
      const id = req.body.id;
      var result = await UserModel.getUserPPHistory(id);
      if (result) {
        res.status(200).json({
          historyList: result,
        });
      } else {
        res.status(200).json({
          historyList: null,
        });
      }
    } catch (error) {
      res.status(404).json({
        historyList: null,
        err: error,
      });
    }
  };

  static getTreatmentLocationByID = async (req, res) => {
    try {
      const id = req.body.id;
      var result = await UserModel.getTreatmentLocationByID(id);
      if (result) {
        res.status(200).json({
          treatmentLocation: result[0],
        });
      } else {
        res.status(200).json({
          treatmentLocation: null,
        });
      }
    } catch (error) {
      res.status(404).json({
        treatmentLocation: null,
        err: error,
      });
    }
  };

  static getTreatmentLocationList = async (req, res) => {
    try {
      var result = await UserModel.getTreatmentLocationList();
      if (result) {
        res.status(200).json({
          treatmentLocationList: result,
        });
      } else {
        res.status(200).json({
          treatmentLocationList: null,
        });
      }
    } catch (error) {
      res.status(404).json({
        treatmentLocationList: null,
        err: error,
      });
    }
  };

  static resetPassword = async (req, res) => {
    try {
      var checkValidate = await UserModel.validatePassword(req.body);
      if (!checkValidate.state) {
        if (checkValidate.error) {
          return res.json({
            error: checkValidate.error,
            resetPasswordState: false,
          });
        }
        return res.json({
          error: "Current password is incorrect",
          resetPasswordState: false,
        });
      } else {
        const salt = await bcrypt.genSalt(10);
        req.body.newPassword = await bcrypt.hash(req.body.newPassword, salt);
        await UserModel.resetPassword(req.body);
        return res.json({
          resetPasswordState: true,
        });
      }
    } catch (error) {
      res.status(404).json({
        resetPasswordState: false,
        error: error,
      });
    }
  };

  static paymentResetPassword = async (req, res) => {
    try {
      var checkValidate = await UserModel.validatePaymentPassword(req.body);
      if (!checkValidate.state) {
        if (checkValidate.error) {
          return res.json({
            error: checkValidate.error,
            resetPasswordState: false,
          });
        }
        return res.json({
          error: "Current password is incorrect",
          resetPasswordState: false,
        });
      } else {
        const salt = await bcrypt.genSalt(10);
        req.body.newPassword = await bcrypt.hash(req.body.newPassword, salt);
        await UserModel.paymentResetPassword(req.body);
        return res.json({
          resetPasswordState: true,
        });
      }
    } catch (error) {
      res.status(404).json({
        resetPasswordState: false,
        error: error,
      });
    }
  };

  static deleteTreatmentLocation = async (req, res) => {
    try {
      const id = req.body.id;

      await UserModel.deleteTreatmentLocation(id);
      res.status(200).json({
        status: true,
      });
    } catch (error) {
      res.status(404).json({
        status: false,
      });
    }
  };

  static deleteProduct = async (req, res) => {
    try {
      console.log(req.body);
      const id = req.body.id;
      const result = await UserModel.deleteProduct(id);
      if (!result) {
        res.status(200).json({
          status: false,
          error:
            "There are packages that do not have at least 2 products without this product",
        });
      }
      res.status(200).json({
        status: true,
      });
    } catch (error) {
      res.status(404).json({
        status: false,
        error: error,
      });
    }
  };
  static deletePackage = async (req, res) => {
    try {
      console.log(req.body);
      const id = req.body.id;
      await UserModel.deletePackage(id);
      res.status(200).json({
        status: true,
      });
    } catch (error) {
      res.status(404).json({
        status: false,
      });
    }
  };

  static removeProductFromPackage = async (req, res) => {
    try {
      console.log(req.body);
      const package_id = parseInt(req.body.package_id);
      const product_id = parseInt(req.body.product_id);
      await UserModel.removeProductFromPackage(product_id, package_id);
      res.status(200).json({
        status: true,
      });
    } catch (error) {
      res.status(404).json({
        status: false,
      });
    }
  };
}

module.exports = UserControllers;
