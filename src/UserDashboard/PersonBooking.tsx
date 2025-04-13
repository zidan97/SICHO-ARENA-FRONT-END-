import { Button, Table, Tag } from "antd";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { useFetchUserDataForStore } from "../Store/FetchUserInformation";

const PersonBooking = () => {
  const { userDataAfterFetching } = useFetchUserDataForStore();
  const columns = [
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
  ];

  // find the data from the backend

  const [datas, setDatas] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const email = userDataAfterFetching[0]?.email;
      try {
        const response = await axios.get(
          `http://localhost:3000/form/personBooking/${email}`
        );

        setDatas(response.data);
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };

    fetchUsers();
  }, [userDataAfterFetching]);

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

export default PersonBooking;
