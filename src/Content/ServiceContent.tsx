import { Card } from "antd";
import { useEffect, useState } from "react";
import axios from "axios";

const { Meta } = Card;

const ServiceContent = () => {
  const [datas, setDatas] = useState([]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/sports-service/active"
        );
        setDatas(response.data);
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };

    fetchServices();
  }, []);

  return (
    <div className="h-screen bg-[url('/sportsService/greenField.jpg')] bg-cover bg-center backdrop-blur-lg flex items-center justify-center p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {datas.map((data, index) => (
          <Card
            key={data._id.$oid || index}
            hoverable
            className="rounded-lg shadow-lg transform transition duration-300 hover:scale-105 bg-white overflow-hidden"
          >
            <div className="p-4">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                {data.inputValue || `Card Title ${index + 1}`}
              </h2>

              <p className="text-gray-600">
                <strong>Person Price:</strong>{" "}
                {data.personPrice.map((priceRange, idx) => {
                  const [min, max] = priceRange.split("-");
                  return (
                    <span key={idx}>
                      {min} person - {max} BDT
                      {idx !== data.personPrice.length - 1 && ", "}
                    </span>
                  );
                })}
              </p>
              <p className="text-gray-600">
                <strong>Place:</strong> {data.place.join(", ")}
              </p>
              <p className="text-gray-600">
                <strong>Status:</strong> {data.status.join(", ")}
              </p>
              <p className="text-gray-600">
                <strong>Time:</strong> {data.time.join(", ")}
              </p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ServiceContent;
