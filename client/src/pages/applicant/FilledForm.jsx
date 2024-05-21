import React, { useState, useEffect } from "react";
import axios from "axios";
import ClipLoader from "react-spinners/ClipLoader";
const DataDisplay = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const baseURL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userId = localStorage.getItem("userId");
        const response = await axios.get(`${baseURL}/applicants/${userId}`);
        setData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="sm:ml-40 mt-20">
      {loading ? (
        <ClipLoader color="#123abc" loading={loading} size={50} />
      ) : (
        <>
          {data ? (
            <div>
              <div>
                {data.map((datas) => (
                  <div key={datas._id} className="mb-4">
                    <ul>
                      {datas.fields.map((field) => (
                        <li key={field._id}>
                          <span className="font-semibold">{field.name}: </span>
                          {field.value}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <p>No data available.</p>
          )}
        </>
      )}
    </div>
  );
};

export default DataDisplay;
