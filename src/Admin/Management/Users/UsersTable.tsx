import { Button, Table, Tag } from "antd";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";

const UsersTable = () => {
  const columns = [
    {
      title: (
        <span
          style={{ color: "rgb(43, 54, 116)" }}
          className="font-custom font-extrabold"
        >
          Name
        </span>
      ),

      dataIndex: "nickname",
      key: "nickname",
    },
    {
      title: (
        <span
          style={{ color: "rgb(43, 54, 116)" }}
          className="font-custom font-extrabold"
        >
          Email
        </span>
      ),
      dataIndex: "email",
      key: "email",
    },
    {
      title: (
        <span
          style={{ color: "rgb(43, 54, 116)" }}
          className="font-custom font-extrabold"
        >
          phone
        </span>
      ),
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: (
        <span
          style={{ color: "rgb(43, 54, 116)" }}
          className="font-custom font-extrabold"
        >
          Agreement
        </span>
      ),
      dataIndex: "agreement",
      key: "agreement",
      render: (agreement) => (agreement ? "Yes" : "No"),
    },
    {
      title: (
        <span
          style={{ color: "rgb(43, 54, 116)" }}
          className="font-custom font-extrabold"
        >
          Role
        </span>
      ),
      dataIndex: "role",
      key: "role",
      render: (role) => (
        <Tag
          color={
            role === "admin" ? "green" : role === "user" ? "yellow" : "red"
          }
        >
          {role}
        </Tag>
      ),
    },
  ];

  // find the data from the backend

  const [datas, setDatas] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:3000/users");

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
    <div className="p-6">
      {/* Services Table */}
      <Table
        columns={columns}
        dataSource={datas}
        pagination={{ pageSize: 5 }}
      />
    </div>
  );
};

export default UsersTable;
