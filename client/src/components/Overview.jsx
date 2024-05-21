import { useState, useEffect } from "react";
import Chart from "react-apexcharts";

const Overview = () => {
  const baseURL = import.meta.env.VITE_API_BASE_URL;
  const [options] = useState({
    chart: {
      id: "basic-bar",
    },
    xaxis: {
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sept",
        "Oct",
        "Nov",
        "Dec",
      ],
    },
  });

  const [series, setSeries] = useState([
    {
      name: "Applicants",
      data: [],
    },
  ]);

  useEffect(() => {
    fetch(`${baseURL}/${"applicants/all"}`)
      .then((response) => response.json())
      .then((data) => {
        // Group data by month and count applicants per month
        const monthlyCounts = {};
        data.forEach((item) => {
          const month = new Date(item.createdAt).getMonth(); // Extract month from createdAt
          monthlyCounts[month] = (monthlyCounts[month] || 0) + 1; // Increment count for the month
        });

        // Fill the series data array with counts for each month
        const applicantsPerMonth = Array.from(
          { length: 12 },
          (_, index) => monthlyCounts[index] || 0
        );
        setSeries([{ name: "Applicants", data: applicantsPerMonth }]);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <div className="app">
      <div className="row">
        <div className="mixed-chart">
          <Chart options={options} series={series} type="bar" width="100%" />
        </div>
      </div>
    </div>
  );
};

export default Overview;
