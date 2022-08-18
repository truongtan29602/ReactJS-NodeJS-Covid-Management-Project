const host = require("../../config/connectMySql");

class PaymentModels {
  static async paymentProcess(data) {
    let sql0 = `UPDATE payment_admin SET balance = balance + ${parseFloat(
      data.total
    )} WHERE admin_id = 1`;
    await host.execute(sql0);

    let sql1 = `UPDATE payment_account SET balance = ${parseFloat(
      data.newBalance
    )} WHERE user_id = ${parseInt(data.user_id)}`;
    await host.execute(sql1);
    const date = new Date().toISOString().slice(0, 19).replace("T", " ");
    let sql2 = `INSERT INTO package_payment_history(user_id, date, package, total)
    VALUES(
        ${parseInt(data.user_id)},
        '${date}',
      '${data.packageName}',
      ${parseFloat(data.total)}
    )`;
    await host.execute(sql2);
    data.productList.map(async (item) => {
      let sql3 = `INSERT INTO product_payment_history(user_id, date, product, quantity)
    VALUES(
        ${parseInt(data.user_id)},
        '${date}',
        '${item.name}',
        ${item.quantity}
    )`;
      await host.execute(sql3);
    });
    return true;
  }

  static async debtProcess(data) {
    let sql = `UPDATE payment_admin SET balance = balance + ${
      parseFloat(data.total) - parseFloat(data.debt)
    } WHERE admin_id = 1`;
    await host.execute(sql);

    let sql0 = `UPDATE payment_account SET debt = ${parseFloat(
      data.debt
    )} WHERE user_id = ${parseInt(data.user_id)}`;
    await host.execute(sql0);

    let sql1 = `UPDATE payment_account SET balance = ${parseFloat(
      data.newBalance
    )} WHERE user_id = ${parseInt(data.user_id)}`;
    await host.execute(sql1);
    const date = new Date().toISOString().slice(0, 19).replace("T", " ");
    let sql2 = `INSERT INTO package_payment_history(user_id, date, package, total)
    VALUES(
        ${parseInt(data.user_id)},
        '${date}',
      '${data.packageName}',
      ${parseFloat(data.total)}
    )`;
    await host.execute(sql2);
    data.productList.map(async (item) => {
      let sql3 = `INSERT INTO product_payment_history(user_id, date, product, quantity)
    VALUES(
        ${parseInt(data.user_id)},
        '${date}',
        '${item.name}',
        ${item.quantity}
    )`;
      await host.execute(sql3);
    });
    return true;
  }

  static async topup(data) {
    let sql = `UPDATE payment_account SET balance = ${parseFloat(
      data.balance
    )}, debt = ${parseFloat(data.debt)} WHERE user_id = ${parseInt(
      data.user_id
    )}`;
    await host.execute(sql);
    if (parseFloat(data.old_debt) > 0) {
      let sql0 = `UPDATE payment_admin SET balance = balance + ${
        parseFloat(data.old_debt) - parseFloat(data.debt)
      } WHERE admin_id = 1`;
      await host.execute(sql0);
    }
    if (parseFloat(data.debt) <= 0) {
      let sql1 = `UPDATE payment_account SET notification = NULL, notification_date = NULL WHERE user_id = ${parseInt(
        data.user_id
      )}`;
      await host.execute(sql1);
    }
    return true;
  }
}

module.exports = PaymentModels;
