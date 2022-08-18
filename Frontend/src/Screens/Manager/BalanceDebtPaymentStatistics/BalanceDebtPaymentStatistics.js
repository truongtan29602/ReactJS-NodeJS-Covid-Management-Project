import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { UserActions } from "../../../store/actions/UserActions";
import Sidebar from "../Sidebar/Sidebar";
import "./BalanceDebtPaymentStatistics.css";
import Chart from "react-apexcharts";

const BalanceDebtPaymentStatistics = (props) => {
  const dispatch = useDispatch();

  const [options, setOptions] = useState({
    chart: {
      type: "bar",
      height: 350,
      stacked: true,
      toolbar: {
        show: true,
      },
      zoom: {
        enabled: true,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        borderRadius: 10,
      },
    },
    xaxis: {
      type: "text",
      categories: ["< Average", "= Average", "> Average"],
    },
    legend: {
      position: "right",
      offsetY: 40,
    },
    fill: {
      opacity: 1,
    },
  });
  const [series, setSeries] = useState([]);

  useEffect(() => {
    dispatch(UserActions.getBalanceDeptPaymentStatisticsData()).then(
      (result) => {
      setSeries((prev) => [
        {
          name: "Total users with balance",
          data: result.balance || [],
        },
        {
          name: "Total users with debt",
          data: result.debt || [],
        },
        {
          name: "Total payments",
          data: result.payment || [],
        }
      ]);
      }
    );
  }, []);

  return (
    <div className="statistics-wrapper">
      <Sidebar props={props} />
      <div className="col-9">
        <div className="section">
          <div className="section-title">Balance, Debt and Payment statistics</div>
          <div className="statistic-wrapper">
            <Chart
              options={options}
              series={series}
              type="bar"
              width="1000"
              height="320"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BalanceDebtPaymentStatistics;
