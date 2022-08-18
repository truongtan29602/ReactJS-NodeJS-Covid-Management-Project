import React from "react";
import "./HomeAdmin.css";
import { Link } from "react-router-dom";

const HomeAdmin = () => {
  return (
    <div className="content row">
      <div className="sidebar">
        <div className="sidebar-item">
          <div className="title">
            <span className="angle-right">
              <i className="fas fa-angle-right"></i>{" "}
            </span>
            Admin
          </div>
          <ul className="list">
            <li className="list-item active">
              <Link to="/admin" className="d-block">
                <i className="fas fa-home"></i> Home
              </Link>
            </li>
            <li className="list-item">
              <Link to="/admin/create" className="d-block">
                <i className="fas fa-user"></i> Create new manager
              </Link>
            </li>
            <li className="list-item">
              <Link to="/admin/manage" className="d-block">
                <i className="fas fa-cog"></i> Manager management
              </Link>
            </li>
            <li className="list-item">
              <Link to="/admin/treatment" className="d-block">
                <i className="fas fa-hospital"></i> Treatment Location
              </Link>
            </li>
          </ul>
          <div className="title">
            <Link to="/sign-in" className="d-block">
              <span className="angle-right">
                <i className="fas fa-angle-right"></i>{" "}
              </span>
              Logout
            </Link>
          </div>
        </div>
      </div>

      <div className="section-wrapper">
        <div className="section">
          <div className="home-content-wrapper">
            <div className="content-wrapper">
              <a href="/admin/create" className="text-dark">
                <div className="card">
                  <img
                    src="https://image.pngaaa.com/574/460574-middle.png"
                    className=""
                    alt="..."
                    style={{
                      objectFit: "contain",
                      width: "100%",
                      height: "100px",
                    }}
                  />
                  <div className="card-body">
                    <h2 className="card-title">Create new manager</h2>
                    <div className="card-text">
                      Create new manager to manage your system
                    </div>
                  </div>
                </div>
              </a>
            </div>

            <div className="content-wrapper">
              <a href="/admin/manage" className="text-dark">
                <div className="card">
                  <img
                    src="https://t3.ftcdn.net/jpg/02/17/72/08/360_F_217720838_zQcOEAOU0plHYh6WWv50te1L9d7iApAz.jpg"
                    className=""
                    alt="..."
                    style={{
                      objectFit: "contain",
                      width: "100%",
                      height: "100px",
                    }}
                  />
                  <div className="card-body">
                    <h2 className="card-title">Manager management</h2>
                    <p className="card-text">
                      Lock/unlock manager account, see manager history
                    </p>
                  </div>
                </div>
              </a>
            </div>

            <div className="content-wrapper">
              <a href="/admin/treatment" className="text-dark">
                <div className="card">
                  <img
                    src="https://png.pngtree.com/png-vector/20190711/ourlarge/pngtree-medical-suitcase-icon-png-image_1544272.jpg"
                    className=""
                    alt="..."
                    style={{
                      objectFit: "contain",
                      width: "100%",
                      height: "100px",
                    }}
                  />
                  <div className="card-body">
                    <h2 className="card-title">Treatment location</h2>
                    <p className="card-text">
                      Add, edit, update treatment location
                    </p>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeAdmin;
