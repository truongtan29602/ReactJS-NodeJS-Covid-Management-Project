import React from "react";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import "./Packages.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faChevronDown,
  faChevronUp,
} from "@fortawesome/fontawesome-free-solid";
import UserSidebar from "../UserSidebar/UserSidebar";
import { UserActions } from "../../../store/actions/UserActions";

const Packages = (props) => {
  const [packages, setPackages] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAscending, setIsAscending] = useState(true);

  const dispatch = useDispatch();
  const { user_id } = useParams();
  const search = () => {
    dispatch(UserActions.searchPackagesWithOder(searchTerm, isAscending)).then(
      (result) => {
        setPackages(result.packageList);
      }
    );
  };

  useEffect(() => {
    dispatch(UserActions.searchPackagesWithOder(searchTerm, isAscending)).then(
      (result) => {
        setPackages(result.packageList);
      }
    );
  }, [isAscending]);

  return (
    <div className="purchase-wrapper">
      <UserSidebar props={props} />
      <div className="purchase-container">
        <div className="search-bar-wrapper">
          <div className="search-bar-type">
            <div className="search-type-dropdown">
              <span className="search-type-text">Package</span>
              <FontAwesomeIcon
                className="nav-icon-prefix"
                icon={faChevronDown}
              />
            </div>
          </div>
          <input
            type="text"
            className="searchTerm"
            placeholder="What are you looking for?"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="btn-search-wrapper" onClick={search}>
            <FontAwesomeIcon className="search-icon" icon={faSearch} />
            <span className="btn-search-text">Search</span>
          </div>
        </div>
        <div className="package-purchase-background">
          <div className="package-purchase-list-wrapper">
            <span
              className="package-main-head-title"
              onClick={() => {
                setIsAscending(!isAscending);
              }}
            >
              Packages A-Z &nbsp;
              {isAscending ? (
                <FontAwesomeIcon icon={faChevronUp} />
              ) : (
                <FontAwesomeIcon icon={faChevronDown} />
              )}
            </span>
            {packages
              ? packages.map((item) => {
                  return (
                    <div className="package-card">
                      <div className="package-photo">
                        <img src={item.image} alt="" />
                      </div>
                      <span className="package-name">{item.name}</span>
                      <span className="package-address">
                        {item.max_per_person_per_duration} packages /{" "}
                        {item.duration} {item.duration_unit}
                      </span>
                      <div className="package-rate"></div>
                      <button
                        className="further-more"
                        onClick={() =>
                          props.history.push(
                            `/user/${user_id}/package/${item.package_id}`
                          )
                        }
                      >
                        More Details
                      </button>
                    </div>
                  );
                })
              : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Packages;
