import React, { useEffect, useState } from "react";
import { Card, Table } from "antd";
import axios from "axios";

const RevenueSummary = () => {
  const parsePrice = (value: string) => {
    const price = value.split("-")[1];
    return Number(price);
  };

  const columns = [
    {
      title: "Sports Category",
      dataIndex: "sportsCategory",
      key: "sportsCategory",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (value: number) => `${value} BDT`,
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
  ];

  const [datas, setDatas] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const fetchReveneu = async () => {
      try {
        const response = await axios.get("http://localhost:3000/form/revenue");
        console.log("revenew response", response);
        const updatedData = response.data.map((entry, index) => ({
          ...entry,
          key: index.toString(),
          price: parsePrice(entry.price),
        }));

        setDatas(updatedData);
        setTotalPrice(updatedData.reduce((acc, item) => acc + item.price, 0));
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };

    fetchReveneu();
  }, []);

  return (
    <div className="p-4">
      {/* Card Container */}
      <div className="grid grid-cols-1 gap-4">
        {/* Sports Revenue Table */}
        <Card
          title="Sports Revenue"
          bordered
          className="w-full bg-white shadow-md"
        >
          <Table
            columns={columns}
            dataSource={[
              ...datas,
              {
                key: "total", // Special key for total row
                sportsCategory: "Total",
                price: totalPrice,

                // date: "-", // Placeholder for date
              },
            ]}
            pagination={false}
            bordered
            rowClassName={(record) =>
              record.key === "total" ? "bg-blue-100 font-bold" : ""
            }
          />
        </Card>
      </div>
    </div>
  );
};

export default RevenueSummary;
