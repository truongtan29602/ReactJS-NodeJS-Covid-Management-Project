const {
  url_search_packages_order_by,
  url_send_notification,
} = require("../../constant/url");
const requestControllers = require("../../controllers/requestcontrollers");

const SearchRouter = (app) => {
  app.post(
    url_search_packages_order_by,
    requestControllers.SearchPackagesOrderBy
  );
  app.post(url_send_notification, requestControllers.SendNotification);
};

module.exports = SearchRouter;
