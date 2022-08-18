const { url_delete_treatment_location, url_delete_product, url_delete_package, url_remove_product_from_package } = require("../../constant/url")
const UserControllers = require("../../controllers/usercontrollers");


const deleteRoute = app => {
   app.post(url_delete_treatment_location, UserControllers.deleteTreatmentLocation);
   app.post(url_delete_product, UserControllers.deleteProduct);
   app.post(url_delete_package, UserControllers.deletePackage);
   app.post(url_remove_product_from_package, UserControllers.removeProductFromPackage);

}



module.exports = deleteRoute;