import { Button, message, Popconfirm, Table, Tag } from "antd";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";

const BookingsTable = () => {
  const handleTerminate = async (record) => {
    // console.log("Record", record._id);
    try {
      const response = await axios.patch(
        `http://localhost:3000/form/terminate/${record._id}`
      );
      if (response.status === 200) {
        message.success("Status updated to TERMINATED.");
        setDatas((prevData: any[]) =>
          prevData.map((item) =>
            item._id === record._id ? { ...item, status: "TERMINATED" } : item
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
          Sports
        </span>
      ),

      dataIndex: "sportsCategory",
      key: "sportsCategory",
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
      dataIndex: "person",
      key: "person",
    },
    {
      title: (
        <span
          style={{ color: "rgb(43, 54, 116)" }}
          className="font-custom font-extrabold"
        >
          Date
        </span>
      ),
      dataIndex: "date",
      key: "date",
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
    },
    {
      title: (
        <span
          style={{ color: "rgb(43, 54, 116)" }}
          className="font-custom font-extrabold"
        >
          Customer Email
        </span>
      ),
      dataIndex: "email",
      key: "email",
    },
    //  {
    //    title: (
    //      <span
    //        style={{ color: "rgb(43, 54, 116)" }}
    //        className="font-custom font-extrabold"
    //      >
    //        Customer Phone
    //      </span>
    //    ),
    //    dataIndex: "pn",
    //    key: "pn",
    //  },
    {
      title: (
        <span
          style={{ color: "rgb(43, 54, 116)" }}
          className="font-custom font-extrabold"
        >
          Tran.Id
        </span>
      ),
      dataIndex: "transactionId",
      key: "transactionId",
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
            status === "VALID"
              ? "green"
              : status === "CANCELLED"
              ? "red"
              : status === "TERMINATED"
              ? "gray"
              : "yellow"
          }
        >
          {status}
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
          title="Are you sure you want to terminate this booking?"
          onConfirm={() => handleTerminate(record)}
          okText="Yes"
          cancelText="No"
        >
          {record.status === "VALID" && (
            <Button className="text-red-500">Terminate</Button>
          )}
          {/* //  <Button className="text-red-500">Terminate</Button> */}
        </Popconfirm>
      ),
    },
  ];

  // find the data from the backend

  const [datas, setDatas] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:3000/form");

        setDatas(response.data);
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };

    fetchUsers();
  }, []);

  // const data = [];
  console.log("datas", datas);

  return (
    <div className="max-w-full mx-auto">
      {/* Services Table */}
      <Table
        columns={columns}
        dataSource={datas}
        pagination={{ pageSize: 5 }}
      />
    </div>
  );
};

export default BookingsTable;
