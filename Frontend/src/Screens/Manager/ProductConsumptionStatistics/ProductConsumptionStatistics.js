import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { UserActions } from "../../../store/actions/UserActions";
import Sidebar from "../Sidebar/Sidebar";
import "./ProductConsumptionStatistics.css";
import Chart from "react-apexcharts";

const ProductConsumptionStatistics = (props) => {
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
      categories: [],
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
        categories: columns,
      },
    }));
    dispatch(UserActions.getProductConsumptionStatisticsData()).then(
      (result) => {
        setSeries((prev) => [
          {
            name: "Total product consumed",
            data: [
              result.month1["total"],
              result.month2["total"],
              result.month3["total"],
              result.month4["total"],
              result.month5["total"],
            ],
          },
        ]);
      }
    );
  }, []);

  return (
    <div className="statistics-wrapper">
      <Sidebar props={props} />
      <div className="col-9">
        <div className="section">
          <div className="section-title">Product Consumption statistics</div>
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

export default ProductConsumptionStatistics;
