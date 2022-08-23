require("dotenv").config();
const host = require("../../config/connectMySql");
const bcrypt = require("bcrypt");
const moment = require("moment");
const jwt = require("jsonwebtoken");
const {
  HostedNumberOrderContext,
} = require("twilio/lib/rest/preview/hosted_numbers/hostedNumberOrder");

const client = require("twilio")(
  "AC7777ca9aeeae7c0582e1499a2e50efcd",
  "d1fa0bc2fb18e8cbae0def56acc2967b",
  {
    lazyLoading: true,
  }
);

class UserModel {
  constructor(data) {
    this.account_id = data.account_id ? data.account_id : null;
    this.name = data.name ? data.name : null;
    this.username = data.username ? data.username : null;
    this.password = data.password ? data.password : null;
    this.role = data.role ? data.role : null;
    this.status = data.status ? data.status : null;
    this.national_id = data.national_id ? data.national_id : null;
    this.year_of_birth = data.year_of_birth ? data.year_of_birth : null;
    this.address = data.address ? data.address : null;
    this.state = data.state ? data.state : null;
    this.treatment_location = data.treatment_location
      ? data.treatment_location
      : null;
    this.related_user = data.related_user ? data.related_user : null;
  }

  async register(data) {
    let sql = `INSERT INTO account(username, password, name, role, status)
    VALUES(
      '${this.username}',
      '${this.password}',
      '${this.name}',
      '${this.role}',
      '${this.status}'
    )`;
    const [newUser, _] = await host.execute(sql);
    return newUser;
  }

  async registerUser(user_id) {
    let sql = `INSERT INTO user_account(user_id, national_id_char, year_of_birth, address, state, treatment_location)
    VALUES(
      '${user_id}',
      '${this.national_id}',
      '${this.year_of_birth}',
      '${this.address}',
      '${this.state}',
      '${this.treatment_location}'
    )`;

    const [newUser, _] = await host.execute(sql);

    return newUser;
  }

  static async registerUserPayment(user_id) {
    let sql = `INSERT INTO payment_account(user_id, balance, debt)
    VALUES(
      ${parseInt(user_id)},
      0,
      0
    )`;
    await host.execute(sql);
    return true;
  }

  static async insertRelation(user_id, related_id) {
    let sql = `INSERT INTO relation(user_id, related_id)
    VALUES(
      ${user_id},
      ${related_id}
    )`;
    const [newUser, _] = await host.execute(sql);

    return newUser;
  }

  static async createStateHistory(state) {
    const date = new Date();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let sql = `INSERT INTO state_history(state, quantity, month, year)
    VALUES(
      '${state}',
      1,
      ${month},
      ${year}
    )`;

    const [history, _] = await host.execute(sql);

    return history;
  }

  static insertUserToTreatmentLocation(treatment_location) {
    let sql = `UPDATE treatment_location SET current_patients_number = current_patients_number + 1 WHERE location_id = '${treatment_location}'`;

    return host.execute(sql);
  }

  static insertState(state) {
    const date = new Date();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    let sql = `UPDATE state_history SET quantity = quantity + 1 WHERE state = '${state}' and month = ${month} and year = ${year}`;

    return host.execute(sql);
  }

  static addTreatmentLocation(data) {
    let sql = `INSERT INTO treatment_location(name, capacity, current_patients_number)
    VALUES(
      '${data.name}',
      '${data.capacity}',
      '${data.currentPatients}'
    )`;

    return host.execute(sql);
  }

  static addProduct(data) {
    let sql = `INSERT INTO product(name, image, price, quantity_unit)
    VALUES(
      '${data.name}',
      '${data.image}',
      ${data.price},
      '${data.quantity_unit}'
    )`;

    return host.execute(sql);
  }

  static async addPackage(data) {
    let sql1 = `SELECT MAX(package_id) + 1 AS result FROM package`;
    const [result1, _] = await host.execute(sql1);
    const package_id = result1[0].result;

    let sql2 = `INSERT INTO package(package_id, name, image, max_per_person_per_duration, duration, duration_unit)
    VALUES(
      ${package_id},
      '${data.name}',
      '${data.image}',
      ${parseInt(data.max_per_person_per_duration)},
      ${parseInt(data.duration)},
      '${data.duration_unit}'
    )`;
    await host.execute(sql2);
    data.products.map(async (item) => {
      let sql3 = `INSERT INTO packing(package_id, product_id, min, max)
    VALUES(
      ${package_id},
      ${item.id},
      ${item.min},
      ${item.max}
    )`;
      await host.execute(sql3);
    });
    return true;
  }

  static async addToPackage(data) {
    data.products.map(async (item) => {
      let sql = `INSERT INTO packing(package_id, product_id, min, max)
    VALUES(
      ${parseInt(data.package_id)},
      ${item.id},
      ${item.min},
      ${item.max}
    )`;
      await host.execute(sql);
    });
    return true;
  }

  static findTreatmentLocationByName(name) {
    let sql = `SELECT * FROM treatment_location WHERE name = '${name}'`;
    return host.execute(sql);
  }

  static checkAdminExistence = async () => {
    let sql = `SELECT * FROM covidmanagement.account WHERE role = 'admin'`;
    const [result, _] = await host.execute(sql);
    if (result[0]) return true;
    else return false;
  };

  static checkStateHistory = async (state) => {
    const date = new Date();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let sql = `SELECT * FROM covidmanagement.state_history WHERE state = '${state}' and month = ${month} and year = ${year}`;
    const [result, _] = await host.execute(sql);
    if (result[0]) return true;
    else return false;
  };

  static findUserByUsername(username) {
    let sql = `SELECT * FROM covidmanagement.account WHERE username = '${username}'`;

    return host.execute(sql);
  }

  static findPaymentUserByID(id) {
    let sql = `SELECT * FROM covidmanagement.payment_account WHERE user_id = ${parseInt(
      id
    )}`;

    return host.execute(sql);
  }

  static findUserByNationalID(national_id) {
    let sql = `SELECT * FROM covidmanagement.user_account WHERE national_id_char = '${national_id}'`;

    return host.execute(sql);
  }

  static async validateLogin(data) {
    if (data.username) {
      var [result, _] = await UserModel.findUserByUsername(data.username);
      if (result[0].role === "user") {
        if (result[0].password === 'null') {
          return {
            loginState: false,
            error: "First time user login",
          };
        }
      }
      if (result[0]) {
        return {
          loginState: await bcrypt.compare(data.password, result[0].password),
        };
      } else return { loginState: false };
    }
  }

  static async authPaymentAccount(token){
    if(token){
      const decoded = jwt.verify(token, 'mysecrettoken');
      let sql = `UPDATE payment_account SET token = '${token}' WHERE user_id = ${decoded.user.id}`
      return host.execute(sql); 
    }
  }

  static async removeAuthPaymentAccount(token){
    if(token){
      const decoded = jwt.verify(token, 'mysecrettoken');
      let sql = `UPDATE payment_account SET token = ${null} WHERE user_id = ${decoded.user.id}`
      await host.execute(sql);
      return true; 
    }
  }

  static async IsAuthenticated(data){
    const decoded = jwt.verify(data.token, 'mysecrettoken');
    if(decoded.user.id !== data.user_id)
      return false;
    let sql = `SELECT * FROM payment_account WHERE user_id = ${decoded.user.id}`;
    const [result, _] = await host.execute(sql);
    if(result[0]){
      if(result[0]["token"] === data.token)
        return true;
    }
    return false;
  }

  static async validatePaymentLogin(data) {
    if (data.ID) {
      var [result, _] = await UserModel.findPaymentUserByID(data.ID);
      if (result[0].password === null) {
        return {
          loginState: false,
          error: "First time user login",
        };
      }
      if (result[0]) {
        return {
          loginState: await bcrypt.compare(data.password, result[0].password),
        };
      } else return { loginState: false };
    }
  }

  static async validatePassword(data) {
    if (data.user_id) {
      var result = await UserModel.getUserByID(parseInt(data.user_id));
      if (result[0].role === "user") {
        if (result[0].password === "null") {
          return {
            state: false,
            error: "First time user login, login to create new password",
          };
        }
      }
      return {
        state: await bcrypt.compare(data.currentPassword, result[0].password),
      };
    }
  }

  static async validatePaymentPassword(data) {
    if (data.user_id) {
      var result = await UserModel.getPaymentUserByID(parseInt(data.user_id));
      console.log(result[0]);
      if (result[0].password === null) {
        return {
          state: false,
          error: "First time user login, login to create new password",
        };
      }
      return {
        state: await bcrypt.compare(data.currentPassword, result[0].password),
      };
    }
  }

  static async changeAccountStatus(id, currentStatus) {
    let sql;
    let changeStatus;
    if (currentStatus === "active") {
      sql = `UPDATE account SET status='lock' WHERE account_id='${id}'`;
      changeStatus = "lock";
    } else {
      sql = `UPDATE account SET status='active' WHERE account_id='${id}'`;
      changeStatus = "active";
    }
    host.execute(sql);
    return changeStatus;
  }

  static async userCreatePassword(username, password) {
    let sql = `UPDATE account SET password='${password}' WHERE username='${username}'`;
    await host.execute(sql);
    return true;
  }

  static async userPaymentCreatePassword(id, password) {
    let sql = `UPDATE payment_account SET password='${password}' WHERE user_id=${parseInt(
      id
    )}`;
    await host.execute(sql);
    return true;
  }

  static async resetPassword(data) {
    let sql = `UPDATE account SET password = '${
      data.newPassword
    }' WHERE account_id = ${parseInt(data.user_id)}`;
    await host.execute(sql);
    return true;
  }

  static async paymentResetPassword(data) {
    let sql = `UPDATE payment_account SET password = '${
      data.newPassword
    }' WHERE user_id = ${parseInt(data.user_id)}`;
    await host.execute(sql);
    return true;
  }

  static async logout(data) {
    if (data.phone) {
      let sql = `UPDATE Tastie.User SET user_token = '' WHERE phone = '${data.phone}'`;
      return host.execute(sql);
    } else {
      if (data.email) {
        let sql = `UPDATE Tastie.User SET user_token = '' WHERE email = '${data.email}'`;
        return host.execute(sql);
      }
    }

    return null;
  }

  static async updateTreatmentLocation(data) {
    let sql = `UPDATE treatment_location SET name = '${data.name}', capacity = '${data.capacity}', current_patients_number = '${data.currentPatients}' WHERE location_id = '${data.id}'`;
    await host.execute(sql);
    return true;
  }

  static async updateProduct(data) {
    let sql = `UPDATE product SET name = '${data.name}', image = '${
      data.image
    }', price = ${data.price}, quantity_unit = '${
      data.quantity_unit
    }' WHERE product_id = ${parseInt(data.id)}`;
    await host.execute(sql);
    return true;
  }

  static async updatePackage(data) {
    let sql = `UPDATE package SET name = '${data.name}', image = '${
      data.image
    }', max_per_person_per_duration = ${
      data.max_per_person_per_duration
    }, duration = ${data.duration}, duration_unit = '${
      data.duration_unit
    }' WHERE
       package_id = ${parseInt(data.id)}`;
    await host.execute(sql);
    return true;
  }

  static async updatePacking(data) {
    data.products.map(async (item) => {
      let sql = `UPDATE packing SET min=${item.min}, max=${
        item.max
      } WHERE package_id=${parseInt(data.package_id)} AND product_id=${parseInt(
        item.id
      )}`;
      await host.execute(sql);
    });
    return true;
  }

  static async updateUserTreatmentLocation(data) {
    let sql1 = `UPDATE user_account SET treatment_location = '${data.treatment_location_id_new}' WHERE user_id = '${data.user_id}'`;
    await host.execute(sql1);
    const date = new Date().toISOString().slice(0, 19).replace("T", " ");
    let sql2 = `INSERT INTO user_history(user_id, date, change_type, previous_data, new_data)
    VALUES(
      '${data.user_id}',
      '${date}',
      'treatment_location',
      '${data.treatment_location_id_old}',
      '${data.treatment_location_id_new}'
    )`;
    await host.execute(sql2);
    let sql3 = `UPDATE treatment_location SET current_patients_number = current_patients_number - 1 WHERE location_id = '${data.treatment_location_id_old}'`;
    await host.execute(sql3);
    let sql4 = `UPDATE treatment_location SET current_patients_number = current_patients_number + 1 WHERE location_id = '${data.treatment_location_id_new}'`;
    await host.execute(sql4);
    return true;
  }

  static async insertManagerHistory(managerID, activity, details) {
    const date = new Date().toISOString().slice(0, 19).replace("T", " ");
    let sql = `INSERT INTO manager_history(manager_id, activity, date, details)
    VALUES(
      ${managerID},
      '${activity}',
      '${date}',
      '${details}'
    )`;
    await host.execute(sql);
    return true;
  }

  static async updateUserState(data) {
    let sql1 = `UPDATE user_account SET state = '${data.state_new}' WHERE user_id = '${data.user_id}'`;
    await host.execute(sql1);
    const date = new Date().toISOString().slice(0, 19).replace("T", " ");
    let sql2 = `INSERT INTO user_history(user_id, date, change_type, previous_data, new_data)
    VALUES(
      '${data.user_id}',
      '${date}',
      'state',
      '${data.state_old}',
      '${data.state_new}'
    )`;
    await host.execute(sql2);
    return true;
  }

  static async updateMinimumPaymentLimit(data) {
    let sql1 = `UPDATE payment_admin SET minimum_payment_limit = ${parseFloat(
      data.newMinimumPaymentLimit
    )} WHERE admin_id = 1`;
    await host.execute(sql1);
    return true;
  }

  static async SendNotification(data) {
    const date = new Date().toISOString().slice(0, 19).replace("T", " ");
    let sql1 = `UPDATE payment_account SET notification = ${parseFloat(
      data.debt
    )}, notification_date = '${date}' WHERE user_id = ${parseInt(
      data.user_id
    )}`;
    console.log(await host.execute(sql1));
    return true;
  }

  static async getManagerList() {
    let sql = `SELECT * FROM account WHERE role = 'manager'`;
    const [result, _] = await host.execute(sql);
    return result;
  }

  static async getManagerHistory(id) {
    let sql = `SELECT * FROM manager_history WHERE manager_id = ${parseInt(
      id
    )}`;
    const [result, _] = await host.execute(sql);
    return result;
  }

  static async getUserList() {
    let sql = `SELECT * FROM account WHERE role = 'user'`;
    const [result, _] = await host.execute(sql);
    return result;
  }

  static async getProductList() {
    let sql = `SELECT * FROM product`;
    const [result, _] = await host.execute(sql);
    return result;
  }

  static async getPackageList() {
    let sql = `SELECT * FROM package ORDER BY name ASC`;
    const [result, _] = await host.execute(sql);
    return result;
  }

  static async getStateStatisticsData() {
    const date5 = new Date();
    let month5 = date5.getMonth();
    let year5 = date5.getFullYear();

    const date4 = new Date(year5, month5 - 1);
    let month4 = date4.getMonth();
    let year4 = date4.getFullYear();

    const date3 = new Date(year4, month4 - 1);
    let month3 = date3.getMonth();
    let year3 = date3.getFullYear();

    const date2 = new Date(year3, month3 - 1);
    let month2 = date2.getMonth();
    let year2 = date2.getFullYear();

    const date1 = new Date(year2, month2 - 1);
    let month1 = date1.getMonth();
    let year1 = date1.getFullYear();

    let sql0 = `SELECT quantity, month, year 
    FROM state_history 
    WHERE state='F0' 
    AND ((month = ${month1 + 1} AND year = ${year1}) 
    OR (month = ${month2 + 1} AND year = ${year2})
    OR (month = ${month3 + 1} AND year = ${year3})
    OR (month = ${month4 + 1} AND year = ${year4})
    OR (month = ${month5 + 1} AND year = ${year5}))
    ORDER BY year, month;`;
    const [result0, _] = await host.execute(sql0);

    let sql1 = `SELECT quantity, month, year 
    FROM state_history 
    WHERE state='F1' 
    AND ((month = ${month1 + 1} AND year = ${year1}) 
    OR (month = ${month2 + 1} AND year = ${year2})
    OR (month = ${month3 + 1} AND year = ${year3})
    OR (month = ${month4 + 1} AND year = ${year4})
    OR (month = ${month5 + 1} AND year = ${year5}))
    ORDER BY year, month;`;
    const [result1, __] = await host.execute(sql1);

    let sql2 = `SELECT quantity, month, year 
    FROM state_history 
    WHERE state='F2' 
    AND ((month = ${month1 + 1} AND year = ${year1}) 
    OR (month = ${month2 + 1} AND year = ${year2})
    OR (month = ${month3 + 1} AND year = ${year3})
    OR (month = ${month4 + 1} AND year = ${year4})
    OR (month = ${month5 + 1} AND year = ${year5}))
    ORDER BY year, month;`;
    const [result2, ___] = await host.execute(sql2);

    let sql3 = `SELECT quantity, month, year 
    FROM state_history 
    WHERE state='F3' 
    AND ((month = ${month1 + 1} AND year = ${year1}) 
    OR (month = ${month2 + 1} AND year = ${year2})
    OR (month = ${month3 + 1} AND year = ${year3})
    OR (month = ${month4 + 1} AND year = ${year4})
    OR (month = ${month5 + 1} AND year = ${year5}))
    ORDER BY year, month;`;
    const [result3, ____] = await host.execute(sql3);

    return {
      F0: result0,
      F1: result1,
      F2: result2,
      F3: result3,
    };
  }

  static async getStateChangeStatisticsData() {
    let sql0 = `SELECT COUNT(user_history_id) AS total FROM user_history
    WHERE change_type='state' AND new_data='F0'`;
    const [result0, _] = await host.execute(sql0);

    let sql1 = `SELECT COUNT(user_history_id) AS total FROM user_history
    WHERE change_type='state' AND new_data='F1'`;
    const [result1, __] = await host.execute(sql1);

    let sql2 = `SELECT COUNT(user_history_id) AS total FROM user_history
    WHERE change_type='state' AND new_data='F2'`;
    const [result2, ___] = await host.execute(sql2);

    let sql3 = `SELECT COUNT(user_history_id) AS total FROM user_history
    WHERE change_type='state' AND new_data='F3'`;
    const [result3, ____] = await host.execute(sql3);

    let sql4 = `SELECT COUNT(user_history_id) AS total FROM user_history
    WHERE change_type='state' AND new_data='NO'`;
    const [result4, _____] = await host.execute(sql4);

    return {
      F0: result0[0],
      F1: result1[0],
      F2: result2[0],
      F3: result3[0],
      NO: result4[0],
    };
  }

  static async getPackageConsumptionStatisticsData() {
    const date5 = new Date();
    let month5 = date5.getMonth() + 1;
    let year5 = date5.getFullYear();

    const date4 = new Date(year5, month5 - 1);
    let month4 = date4.getMonth();
    let year4 = date4.getFullYear();

    const date3 = new Date(year4, month4 - 1);
    let month3 = date3.getMonth();
    let year3 = date3.getFullYear();

    const date2 = new Date(year3, month3 - 1);
    let month2 = date2.getMonth();
    let year2 = date2.getFullYear();

    const date1 = new Date(year2, month2 - 1);
    let month1 = date1.getMonth();
    let year1 = date1.getFullYear();

    let sql0 = `SELECT COUNT(package_payment_history_id) AS total FROM package_payment_history WHERE MONTH(date) = ${month1} AND YEAR(date)= ${year1};`;
    const [result0, _] = await host.execute(sql0);

    let sql1 = `SELECT COUNT(package_payment_history_id) AS total FROM package_payment_history WHERE MONTH(date) = ${month2} AND YEAR(date)= ${year2};`;
    const [result1, __] = await host.execute(sql1);

    let sql2 = `SELECT COUNT(package_payment_history_id) AS total FROM package_payment_history WHERE MONTH(date) = ${month3} AND YEAR(date)= ${year3};`;
    const [result2, ___] = await host.execute(sql2);

    let sql3 = `SELECT COUNT(package_payment_history_id) AS total FROM package_payment_history WHERE MONTH(date) = ${month4} AND YEAR(date)= ${year5};`;
    const [result3, ____] = await host.execute(sql3);

    let sql4 = `SELECT COUNT(package_payment_history_id) AS total FROM package_payment_history WHERE MONTH(date) = ${month5} AND YEAR(date)= ${year5};`;
    const [result4, _____] = await host.execute(sql4);
    return {
      month1: result0[0],
      month2: result1[0],
      month3: result2[0],
      month4: result3[0],
      month5: result4[0],
    };
  }

  static async getProductConsumptionStatisticsData() {
    const date5 = new Date();
    let month5 = date5.getMonth() + 1;
    let year5 = date5.getFullYear();

    const date4 = new Date(year5, month5 - 1);
    let month4 = date4.getMonth();
    let year4 = date4.getFullYear();

    const date3 = new Date(year4, month4 - 1);
    let month3 = date3.getMonth();
    let year3 = date3.getFullYear();

    const date2 = new Date(year3, month3 - 1);
    let month2 = date2.getMonth();
    let year2 = date2.getFullYear();

    const date1 = new Date(year2, month2 - 1);
    let month1 = date1.getMonth();
    let year1 = date1.getFullYear();

    let sql0 = `SELECT SUM(quantity) AS total FROM product_payment_history WHERE MONTH(date) = ${month1} AND YEAR(date)= ${year1};`;
    const [result0, _] = await host.execute(sql0);

    let sql1 = `SELECT SUM(quantity) AS total FROM product_payment_history WHERE MONTH(date) = ${month2} AND YEAR(date)= ${year2};`;
    const [result1, __] = await host.execute(sql1);

    let sql2 = `SELECT SUM(quantity) AS total FROM product_payment_history WHERE MONTH(date) = ${month3} AND YEAR(date)= ${year3};`;
    const [result2, ___] = await host.execute(sql2);

    let sql3 = `SELECT SUM(quantity) AS total FROM product_payment_history WHERE MONTH(date) = ${month4} AND YEAR(date)= ${year5};`;
    const [result3, ____] = await host.execute(sql3);

    let sql4 = `SELECT SUM(quantity) AS total FROM product_payment_history WHERE MONTH(date) = ${month5} AND YEAR(date)= ${year5};`;
    const [result4, _____] = await host.execute(sql4);
    return {
      month1: result0[0],
      month2: result1[0],
      month3: result2[0],
      month4: result3[0],
      month5: result4[0],
    };
  }

  static async getBalanceDebtPaymentStatisticsStatisticsData() {
    let sql0 = `SELECT AVG(balance) AS avg FROM payment_account;`;
    const [result0, _] = await host.execute(sql0);

    let sql1 = `SELECT AVG(debt) AS avg FROM payment_account;`;
    const [result1, __] = await host.execute(sql1);

    let sql2 = `SELECT AVG(total) AS avg FROM package_payment_history;`;
    const [result2, ___] = await host.execute(sql2);

    let sql3 = `SELECT COUNT(user_id) AS total FROM payment_account WHERE balance < ${result0[0].avg};`;
    const [result3, ____] = await host.execute(sql3);

    let sql4 = `SELECT COUNT(user_id) AS total FROM payment_account WHERE balance = ${result0[0].avg};`;
    const [result4, _____] = await host.execute(sql4);

    let sql5 = `SELECT COUNT(user_id) AS total FROM payment_account WHERE balance > ${result0[0].avg};`;
    const [result5, ______] = await host.execute(sql5);

    let sql6 = `SELECT COUNT(user_id) AS total FROM payment_account WHERE debt < ${result1[0].avg};`;
    const [result6, a] = await host.execute(sql6);

    let sql7 = `SELECT COUNT(user_id) AS total FROM payment_account WHERE debt = ${result1[0].avg};`;
    const [result7, b] = await host.execute(sql7);

    let sql8 = `SELECT COUNT(user_id) AS total FROM payment_account WHERE debt > ${result1[0].avg};`;
    const [result8, c] = await host.execute(sql8);

    let sql9 = `SELECT COUNT(package_payment_history_id) AS total FROM package_payment_history WHERE total < ${result2[0].avg};`;
    const [result9, d] = await host.execute(sql9);

    let sql10 = `SELECT COUNT(package_payment_history_id) AS total FROM package_payment_history WHERE total = ${result2[0].avg};`;
    const [result10, e] = await host.execute(sql10);

    let sql11 = `SELECT COUNT(package_payment_history_id) AS total FROM package_payment_history WHERE total > ${result2[0].avg};`;
    const [result11, f] = await host.execute(sql11);

    return {
      balance: [result3[0].total, result4[0].total, result5[0].total],
      debt: [result6[0].total, result7[0].total, result8[0].total],
      payment: [result9[0].total, result10[0].total, result11[0].total],
    };
  }

  static async getMinimumPaymentLimit() {
    let sql0 = `SELECT minimum_payment_limit FROM payment_admin`;
    const [result0, _] = await host.execute(sql0);

    return result0[0];
  }

  static async getBalanceDebt(user_id) {
    let sql = `SELECT * FROM payment_account WHERE user_id = ${user_id}`;
    const [result, _] = await host.execute(sql);
    return result[0];
  }

  static async getInDebtUserList() {
    let sql = `SELECT * FROM payment_account JOIN account ON payment_account.user_id = account.account_id AND payment_account.debt > 0 AND payment_account.notification IS NULL`;
    const [result, _] = await host.execute(sql);
    return result;
  }

  static async getTotalPackagesPurchased(data) {
    console.log(data);
    let date = new Date();
    let prev_date = new Date();

    if (data.duration_unit === "day") {
      prev_date.setDate(date.getDate() - parseInt(data.duration));
    }
    if (data.duration_unit === "month") {
      prev_date.setMonth(date.getMonth() - parseInt(data.duration));
    }
    if (data.duration_unit === "year") {
      prev_date.setFullYear(date.getFullYear() - parseInt(data.duration));
    }
    date = date.toISOString().slice(0, 19).replace("T", " ");
    prev_date = prev_date.toISOString().slice(0, 19).replace("T", " ");

    let sql = `SELECT COUNT(package_payment_history_id) AS total FROM package_payment_history WHERE user_id =${parseInt(
      data.user_id
    )} AND package='${
      data.packageName
    }' AND date BETWEEN '${prev_date}' AND '${date}'`;
    console.log(sql);
    const [result, _] = await host.execute(sql);
    return result[0].total;
  }

  static async getUserByID(id) {
    let sql = `SELECT * FROM account JOIN user_account on account_id = user_id and account_id = ${parseInt(
      id
    )}`;
    const [result, _] = await host.execute(sql);
    return result;
  }

  static async getPaymentUserByID(id) {
    let sql = `SELECT * FROM payment_account WHERE user_id = ${parseInt(id)}`;
    const [result, _] = await host.execute(sql);
    return result;
  }

  static async getProductByID(id) {
    let sql = `SELECT * FROM product WHERE product_id = ${id}`;
    const [result, _] = await host.execute(sql);
    return result;
  }
  static async getPackageByID(id) {
    let sql = `SELECT * FROM package WHERE package_id = ${id}`;
    const [result, _] = await host.execute(sql);
    return result;
  }

  static async getPackageProductsByID(id) {
    let sql = `SELECT pr.product_id, pr.name, pr.image, pr.price, pr.quantity_unit, pa.min, pa.max
    FROM product pr 
    JOIN packing pa
    ON pr.product_id = pa.product_id
    AND pr.product_id IN (SELECT product_id FROM packing WHERE package_id = ${id});`;
    const [result, _] = await host.execute(sql);
    return result;
  }

  static async getProductsNotInPackage(id) {
    let sql = `SELECT * FROM product
    WHERE product_id NOT IN (SELECT product_id FROM packing WHERE package_id = ${id});`;
    const [result, _] = await host.execute(sql);
    return result;
  }

  static async getRelatedUserByID(id) {
    let sql = `SELECT * FROM account where Exists(
      SELECT related_id from relation where account.account_id = user_id and related_id = ${id}) 
        OR Exists(SELECT user_id from relation where account.account_id = related_id and user_id = ${id})`;
    const result = await host.execute(sql);
    return result;
  }

  static async getTreatmentLocationByID(id) {
    let sql = `SELECT * FROM treatment_location WHERE location_id = '${id}'`;
    const [result, _] = await host.execute(sql);
    return result;
  }

  static async getTreatmentLocationList() {
    let sql = `SELECT * FROM treatment_location`;
    const [result, _] = await host.execute(sql);
    return result;
  }

  static async getUserStateHistory(id) {
    let sql = `SELECT * FROM user_history WHERE user_id = '${id}' AND change_type = 'state'`;
    const [result, _] = await host.execute(sql);
    return result;
  }

  static async getUserTLHistory(id) {
    let sql = `SELECT user_history_id, user_id, date, prev, new
    FROM user_history, (SELECT name AS prev, location_id as prev_id FROM treatment_location) h2, (SELECT name AS new, location_id as new_id FROM treatment_location) h3
    WHERE user_id = ${id} AND change_type = 'treatment_location' AND h2.prev_id = user_history.previous_data AND h3.new_id = user_history.new_data`;
    const [result, _] = await host.execute(sql);
    return result;
  }

  static async getUserPPHistory(id) {
    let sql = `SELECT * FROM package_payment_history WHERE user_id = ${parseInt(
      id
    )}`;
    const [result, _] = await host.execute(sql);
    return result;
  }

  static async getNonRelatedUser(id) {
    let sql = `SELECT * FROM account WHERE NOT EXISTS (
      SELECT related_id FROM relation WHERE account.account_id = user_id and related_id = ${id}) 
        AND NOT EXISTS(SELECT user_id FROM relation WHERE account.account_id = related_id AND user_id = ${id}) AND account.role='user' AND NOT account.account_id=${id}`;
    let result = await host.execute(sql);
    return result;
  }

  static async searchPackagesOrderBy(data) {
    console.log(data);
    let sql = `SELECT * FROM package 
        WHERE name LIKE '%${data.searchTerm}%'
        OR max_per_person_per_duration LIKE '%${data.searchTerm}%'
        OR duration LIKE '%${data.searchTerm}%'
        OR duration_unit LIKE '%${data.searchTerm}%'
        ORDER BY name ${
          data.isAscending ? "ASC" : "DESC"
        }, max_per_person_per_duration ${
      data.isAscending ? "ASC" : "DESC"
    }, duration_unit ${data.isAscending ? "ASC" : "DESC"}, duration ${
      data.isAscending ? "ASC" : "DESC"
    }`;
    console.log(sql);
    const [result, _] = await host.execute(sql);
    return result;
  }

  static async deleteTreatmentLocation(id) {
    try {
      let sql = `DELETE FROM treatment_location WHERE location_id = '${id}'`;
      await host.execute(sql);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  static async deleteProduct(id) {
    try {
      let sql1 = `SELECT DISTINCT package_id FROM packing p1 WHERE (SELECT COUNT(p2.product_id) FROM packing p2 WHERE p1.package_id = p2.package_id AND NOT p2.product_id = ${parseInt(
        id
      )}) < 2`;
      const [result, _] = await host.execute(sql1);
      console.log(result[0]);
      if (result[0]) {
        return false;
      }
      let sql = `DELETE FROM packing WHERE product_id = ${id}`;
      await host.execute(sql);
      sql = `DELETE FROM product WHERE product_id = ${id}`;
      await host.execute(sql);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  static async deletePackage(id) {
    try {
      let sql = `DELETE FROM packing WHERE package_id = ${id}`;
      await host.execute(sql);
      sql = `DELETE FROM package WHERE package_id = ${id}`;
      await host.execute(sql);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  static async removeProductFromPackage(product_id, package_id) {
    try {
      let sql = `DELETE FROM packing WHERE package_id = ${package_id} AND product_id = ${product_id}`;
      await host.execute(sql);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}

module.exports = UserModel;
