const route = require("./account/login");
const registerRoute = require("./account/register");
const logoutRoute = require("./actions/logout");
const resestPasswordRoute = require("./actions/resetpassword");
const SearchRouter = require("./actions/search");
const updateRoute = require("./actions/update");
const deleteRoute = require("./actions/delete");
const CheckoutRouter = require("./actions/checkout");

const routesUser = (app) => {
  route(app);
  registerRoute(app);
  updateRoute(app);
  resestPasswordRoute(app);
  logoutRoute(app);
  CheckoutRouter(app);
  SearchRouter(app);
  deleteRoute(app);
};

module.exports = routesUser;
