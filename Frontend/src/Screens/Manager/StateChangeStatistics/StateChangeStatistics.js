import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { UserActions } from "../../../store/actions/UserActions";
import Sidebar from "../Sidebar/Sidebar";
import "./StateChangeStatistics.css";
import Chart from "react-apexcharts";

const StateChangeStatistics = (props) => {
  const dispatch = useDispatch();

  const [options, setOptions] = useState({
    chart: {
      type: "bar",
      height: 350,
    },
    plotOptions: {
      bar: {
        borderRadius: 4,
        horizontal: false,
      },
    },
    dataLabels: {
      enabled: true,
    },
    xaxis: {
      categories: ['F0', 'F1', 'F2', 'F3', 'NO'],
    },
  });
  const [series, setSeries] = useState([]);

  useEffect(() => {
    dispatch(UserActions.getStateChangeStatisticsData()).then((result) => {
      setSeries((prev) => [
        {
          name: "Total state change",
          data: [
            result.F0["total"],
            result.F1["total"],
            result.F2["total"],
            result.F3["total"],
            result.NO["total"],
          ],
        },
      ]);
    });
  }, []);

  return (
    <div className="statistics-wrapper">
      <Sidebar props={props} />
      <div className="col-9">
        <div className="section">
          <div className="section-title">State change statistics</div>
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

export default StateChangeStatistics;
