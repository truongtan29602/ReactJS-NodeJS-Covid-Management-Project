import React from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";
import "./HomeManager.css";

const HomeManager = (props) => {
  const params = useParams();
  return (
    <div className="content row">
      <Sidebar props={props} />
      <div className="col-9">
        <div className="section general-information">
          <div className="manager-card  w-100">
            <div className="manager-card-header">
              <h1>User management</h1>
            </div>
            <div className="manager-card-body">
              <div className="content-container">
                <div className="manager-content-wrapper">
                  <a
                    href={"/manager/" + params.id + "/userList"}
                    className="text-dark"
                  >
                    <div className="manager-card" style={{ width: "200px" }}>
                      <img
                        src="https://icons.iconarchive.com/icons/dtafalonso/modern-xp/512/ModernXP-15-Group-icon.png"
                        className=""
                        alt="..."
                        style={{
                          objectFit: "contain",
                          width: "200px",
                          height: "100px",
                        }}
                      />
                      <div className="manager-card-body">
                        <h3 className="manager-card-title text-center">
                          User list
                        </h3>
                        <p className="manager-card-text text-center">
                          See detailed user list
                        </p>
                      </div>
                    </div>
                  </a>
                </div>

                <div className="manager-content-wrapper">
                  <a
                    href={"/manager/" + params.id + "/addUser"}
                    className="text-dark"
                  >
                    <div className="manager-card" style={{ width: "200px" }}>
                      <img
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMRnym8QJSxutfISwhVfBIjXGPljdnl1x1BvRdApR60vLbhGCpyQxp-w3Ybt8v_Tg5rSI&usqp=CAU"
                        className=""
                        alt="..."
                        style={{
                          objectFit: "contain",
                          width: "200px",
                          height: "100px",
                        }}
                      />
                      <div className="manager-card-body">
                        <h3 className="manager-card-title text-center">
                          Add users
                        </h3>
                        <p className="manager-card-text text-center">
                          Create account for new users
                        </p>
                      </div>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="manager-card ">
            <div className="manager-card-header">
              <h1>Product management</h1>
            </div>
            <div className="manager-card-body">
              <div className="content-container">
                <div className="manager-content-wrapper">
                  <a
                    href={"/manager/" + params.id + "/productList"}
                    className="text-dark"
                  >
                    <div className="manager-card" style={{ width: "200px" }}>
                      <img
                        src="https://cdn-icons-png.flaticon.com/512/2934/2934085.png"
                        className=""
                        alt="..."
                        style={{
                          objectFit: "contain",
                          width: "200px",
                          height: "100px",
                        }}
                      />
                      <div className="manager-card-body">
                        <h3 className="manager-card-title text-center">
                          Product list
                        </h3>
                        <p className="manager-card-text text-center">
                          See detailed product list<br/>Edit/Delete product
                        </p>
                        
                      </div>
                    </div>
                  </a>
                </div>

                <div className="manager-content-wrapper">
                  <a
                    href={"/manager/" + params.id + "/addProduct"}
                    className="text-dark"
                  >
                    <div className="manager-card" style={{ width: "200px" }}>
                      <img
                        src="https://cdn4.iconfinder.com/data/icons/business-model-canvas-3/512/ValueProposition-productvalue-value-qualityproduct-newproduct-512.png"
                        className=""
                        alt="..."
                        style={{
                          objectFit: "contain",
                          width: "200px",
                          height: "100px",
                        }}
                      />
                      <div className="manager-card-body">
                        <h3 className="manager-card-title text-center">
                          Add product
                        </h3>
                        <p className="manager-card-text text-center">
                          Add new product
                        </p>
                      </div>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="manager-card ">
            <div className="manager-card-header">
              <h1>Package management</h1>
            </div>
            <div className="manager-card-body">
              <div className="content-container">
                <div className="manager-content-wrapper">
                  <a
                    href={"/manager/" + params.id + "/packageList"}
                    className="text-dark"
                  >
                    <div className="manager-card" style={{ width: "200px" }}>
                      <img
                        src="https://thumbs.dreamstime.com/b/grocery-bag-food-gastronomy-set-flat-icon-grocery-bag-food-gastronomy-set-flat-icon-131481091.jpg"
                        className=""
                        alt="..."
                        style={{
                          objectFit: "contain",
                          width: "200px",
                          height: "100px",
                        }}
                      />
                      <div className="manager-card-body">
                        <h3 className="manager-card-title text-center">
                          Package list
                        </h3>
                        <p className="manager-card-text text-center">
                          See detailed package list<br/>Edit/Delete package
                        </p>
                      </div>
                    </div>
                  </a>
                </div>

                <div className="manager-content-wrapper">
                  <a
                    href={"/manager/" + params.id + "/updatePackage"}
                    className="text-dark"
                  >
                    <div className="manager-card" style={{ width: "200px" }}>
                      <img
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrxIOQd3WxAEEO4R3n0tu3TMqDg2HLlQzqYOLNCkZREaSbY2nzjhDs7Ry9zi2qBPDi4q0&usqp=CAU"
                        className=""
                        alt="..."
                        style={{
                          objectFit: "contain",
                          width: "200px",
                          height: "100px",
                        }}
                      />
                      <div className="manager-card-body">
                        <h3 className="manager-card-title text-center">
                          Add package
                        </h3>
                        <p className="manager-card-text text-center">
                          Add new package
                        </p>
                      </div>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="manager-card ">
            <div className="manager-card-header">
              <h1>Statistics</h1>
            </div>
            <div className="manager-card-body">
              <div className="content-container">
                <div className="manager-content-wrapper">
                  <a
                    href={"/manager/" + params.id + "/chartStateByTime"}
                    className="text-dark"
                  >
                    <div className="manager-card" style={{ width: "200px" }}>
                      <img
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTh4zTdcNKkZX072SYH3U51kVbeEtrOSnO0qIIkEoDfrbt1jtHCnkO8b9xCA1Gzl8fLrd0&usqp=CAU"
                        className=""
                        alt="..."
                        style={{
                          objectFit: "contain",
                          width: "200px",
                          height: "100px",
                        }}
                      />
                      <div className="manager-card-body">
                        <h3 className="manager-card-title text-center">
                          Number of people by states
                        </h3>
                        <p className="manager-card-text text-center">
                          Statistics for number of people by states in the last 5 months
                        </p>
                      </div>
                    </div>
                  </a>
                </div>

                <div className="manager-content-wrapper">
                  <a
                    href={"/manager/" + params.id + "/chartStateChange"}
                    className="text-dark"
                  >
                    <div className="manager-card" style={{ width: "200px" }}>
                      <img
                        src="https://static.vecteezy.com/system/resources/previews/004/590/572/original/people-icon-with-chart-business-symbol-simple-illustration-editable-stroke-design-template-vector.jpg"
                        className=""
                        alt="..."
                        style={{
                          objectFit: "contain",
                          width: "200px",
                          height: "100px",
                        }}
                      />
                      <div className="manager-card-body">
                        <h3 className="manager-card-title text-center">
                          Number of state change
                        </h3>
                        <p className="manager-card-text text-center">
                          Statistics for number of states change
                        </p>
                      </div>
                    </div>
                  </a>
                </div>

                <div className="manager-content-wrapper">
                  <a
                    href={"/manager/" + params.id + "/chartPackage"}
                    className="text-dark"
                  >
                    <div className="manager-card" style={{ width: "200px" }}>
                      <img
                        src="https://cdn2.iconfinder.com/data/icons/seo-internet-marketing-services/91/SEO_Internet_marketing_business_12-512.png"
                        className=""
                        alt="..."
                        style={{
                          objectFit: "contain",
                          width: "200px",
                          height: "100px",
                        }}
                      />
                      <div className="manager-card-body">
                        <h3 className="manager-card-title text-center">
                          Packages consumption
                        </h3>
                        <p className="manager-card-text text-center">
                          Statistics for packages consumption
                        </p>
                      </div>
                    </div>
                  </a>
                </div>

                <div className="manager-content-wrapper">
                  <a
                    href={"/manager/" + params.id + "/chartProduct"}
                    className="text-dark"
                  >
                    <div className="manager-card" style={{ width: "200px" }}>
                      <img
                        src="https://kingly.vn/khuyenmai/upload/images/product-combo.png"
                        className=""
                        alt="..."
                        style={{
                          objectFit: "contain",
                          width: "200px",
                          height: "100px",
                        }}
                      />
                      <div className="manager-card-body">
                        <h3 className="manager-card-title text-center">
                          Products consumption
                        </h3>
                        <p className="manager-card-text text-center">
                        Statistics for products consumption
                        </p>
                      </div>
                    </div>
                  </a>
                </div>

                <div className="manager-content-wrapper">
                  <a
                    href={"/manager/" + params.id + "/chartBalanceDeptPayment"}
                    className="text-dark"
                  >
                    <div className="manager-card" style={{ width: "200px" }}>
                      <img
                        src="https://png.pngtree.com/png-vector/20190814/ourlarge/pngtree-increase-profit-chart-vector-icon-filled-flat-sign-for-mobile-png-image_1692145.jpg"
                        className=""
                        alt="..."
                        style={{
                          objectFit: "contain",
                          width: "200px",
                          height: "100px",
                        }}
                      />
                      <div className="manager-card-body">
                        <h3 className="manager-card-title text-center">
                          Debts & payments
                        </h3>
                        <p className="manager-card-text text-center">
                          Statistics for debts and payments
                        </p>
                      </div>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="manager-card ">
            <div className="manager-card-header">
              <h1>Payment management</h1>
            </div>
            <div className="manager-card-body">
              <div className="content-container">
                <div className="manager-content-wrapper">
                  <a
                    href={"/manager/" + params.id + "/changeMinPayment"}
                    className="text-dark"
                  >
                    <div className="manager-card" style={{ width: "200px" }}>
                      <img
                        src="https://cdn-icons-png.flaticon.com/128/1999/1999259.png"
                        className=""
                        alt="..."
                        style={{
                          objectFit: "contain",
                          width: "200px",
                          height: "100px",
                        }}
                      />
                      <div className="manager-card-body">
                        <h3 className="manager-card-title text-center">
                          Change minimum payment limit
                        </h3>
                        <p className="manager-card-text text-center">
                          Change minimum payment limit for users
                        </p>
                      </div>
                    </div>
                  </a>
                </div>

                <div className="manager-content-wrapper">
                  <a
                    href={"/manager/" + params.id + "/sendPaymentNotification"}
                    className="text-dark"
                  >
                    <div className="manager-card" style={{ width: "200px" }}>
                      <img
                        src="https://static.vecteezy.com/system/resources/previews/002/553/023/non_2x/mobile-banking-message-notification-money-flat-style-icon-free-vector.jpg"
                        className=""
                        alt="..."
                        style={{
                          objectFit: "contain",
                          width: "200px",
                          height: "100px",
                        }}
                      />
                      <div className="manager-card-body">
                        <h3 className="manager-card-title text-center">
                          Browse user payment list
                        </h3>
                        <p className="manager-card-text text-center">
                          Browse user payment list
                          <br /> Send payment reminder notification
                        </p>
                      </div>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeManager;
