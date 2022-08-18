import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { UserActions } from "../../../store/actions/UserActions";
import Sidebar from "../Sidebar/Sidebar";
import "./StateStatistics.css";
import Chart from "react-apexcharts";

const StateStatistics = (props) => {
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
      categories: [],
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

  const toMonthName = (monthNumber) => {
    const date = new Date();
    date.setMonth(monthNumber - 1);

    return date.toLocaleString("en-US", {
      month: "short",
    });
  };

  useEffect(() => {
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

    let columns = [
      `${toMonthName(month1 + 1)} ${year1}`,
      `${toMonthName(month2 + 1)} ${year2}`,
      `${toMonthName(month3 + 1)} ${year3}`,
      `${toMonthName(month4 + 1)} ${year4}`,
      `${toMonthName(month5 + 1)} ${year5}`,
    ];
    setOptions((prev) => ({
      ...prev,
      xaxis: {
        ...prev.xasis,
        categories: columns,
      },
    }));
    dispatch(UserActions.getStateStatisticsData()).then((result) => {
      let temp0 = result?.F0.map((item) => item.quantity);
      let temp1 = result?.F1.map((item) => item.quantity);
      let temp2 = result?.F2.map((item) => item.quantity);
      let temp3 = result?.F3.map((item) => item.quantity);
      setSeries((prev) => [
        {
          name: "F3",
          data: temp3 || [],
        },
        {
          name: "F2",
          data: temp2 || [],
        },
        {
          name: "F1",
          data: temp1 || [],
        },
        {
          name: "F0",
          data: temp0 || [],
        },
      ]);
    });
  }, []);

  return (
    <div className="statistics-wrapper">
      <Sidebar props={props} />
      <div className="col-9">
        <div className="section">
          <div className="section-title">State statistics</div>
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

export default StateStatistics;
