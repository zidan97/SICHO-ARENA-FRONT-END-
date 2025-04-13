import { Button, message, Popconfirm, Table, Tag } from "antd";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import parsePersonPrice from "../../Utils/ParsePersonPrice";

const Services = () => {
  const handleDeactivate = async (record) => {
    console.log("Record", record._id);
    try {
      const response = await axios.patch(
        `http://localhost:3000/sports-service/deactivate/${record._id}`
      );
      if (response.status === 200) {
        message.success("This service is deactivated .");
        setDatas((prevData: any[]) =>
          prevData.map((item) =>
            item._id === record._id ? { ...item, status: ["Deactivate"] } : item
          )
        );
      }
    } catch (error) {
      console.error("Error updating status:", error);
      message.error("Failed to update status.");
    }
  };
  const columns = [
    {
      title: (
        <span
          style={{ color: "rgb(43, 54, 116)" }}
          className="font-custom font-extrabold"
        >
          Sports Name
        </span>
      ),

      dataIndex: "inputValue",
      key: "inputValue",
    },
    {
      title: (
        <span
          style={{ color: "rgb(43, 54, 116)" }}
          className="font-custom font-extrabold"
        >
          Person
        </span>
      ),
      dataIndex: "person",
      key: "person",
    },
    {
      title: (
        <span
          style={{ color: "rgb(43, 54, 116)" }}
          className="font-custom font-extrabold"
        >
          Person-Price
        </span>
      ),
      dataIndex: "personPrice",
      key: "personPrice",
      // render: (personPrice) => parsePersonPrice(personPrice.join(",")),
      render: (personPrice) => personPrice.join(","),
    },
    {
      title: (
        <span
          style={{ color: "rgb(43, 54, 116)" }}
          className="font-custom font-extrabold"
        >
          Place
        </span>
      ),
      dataIndex: "place",
      key: "place",
      render: (place) => place.join(","),
    },
    {
      title: (
        <span
          style={{ color: "rgb(43, 54, 116)" }}
          className="font-custom font-extrabold"
        >
          Time
        </span>
      ),
      dataIndex: "time",
      key: "time",
      render: (time) => time.join(","),
    },

    {
      title: (
        <span
          style={{ color: "rgb(43, 54, 116)" }}
          className="font-custom font-extrabold"
        >
          Status
        </span>
      ),
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag
          color={
            status[0] === "Active"
              ? "green"
              : status[0] === "Deactivate"
              ? "gray"
              : "red"
          }
        >
          {status[0]}
        </Tag>
      ),
    },
    {
      title: (
        <span
          style={{ color: "rgb(43, 54, 116)" }}
          className="font-custom font-extrabold"
        >
          Action
        </span>
      ),
      key: "action",
      render: (_, record) => (
        <Popconfirm
          title="Are you sure you want to deactivate this service?"
          onConfirm={() => handleDeactivate(record)}
          okText="Yes"
          cancelText="No"
        >
          {record.status[0] === "Active" && (
            <Button className="text-red-500">Deactivate</Button>
          )}
          {/* //  <Button className="text-red-500">Terminate</Button> */}
        </Popconfirm>
      ),
    },
  ];

  // find the data from the backend

  const [datas, setDatas] = useState([]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/sports-service/admin"
        );

        // const formattedData = response.data.map((item) => ({
        //   ...item,
        //   personPrice: item.personPrice[0] || "",
        //   place: item.place[0] || "",
        //   time: item.time[0] || "",
        //   status: item.status[0] || "",
        // }));

        // setDatas(formattedData);
        setDatas(response.data);
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };

    fetchServices();
  }, []);

  // const data = [];
  console.log("datas", datas);

  return (
    <div className="p-6">
      {/* Add Service Button */}
      <div className="flex justify-end mb-4">
        <Button
          type="primary"
          style={{ backgroundColor: "#17295A", borderColor: "#17295A" }}
          className="text-white"
        >
          <Link to="/admin/services/add">Add Service</Link>
        </Button>
      </div>

      {/* Services Table */}
      <Table
        columns={columns}
        dataSource={datas}
        pagination={{ pageSize: 5 }}
      />
    </div>
  );
};

export default Services;
