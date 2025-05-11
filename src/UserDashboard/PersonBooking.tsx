import { Button, Table, Tag, Modal, Descriptions } from "antd";
import { useEffect, useState } from "react";
import axios from "axios";
import { useFetchUserDataForStore } from "../Store/FetchUserInformation";

const PersonBooking = () => {
  const { userDataAfterFetching } = useFetchUserDataForStore();

  const [datas, setDatas] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      const email = userDataAfterFetching[0]?.email;
      try {
        const response = await axios.get(
          `http://localhost:3000/form/personBooking/${email}`
        );
        setDatas(response.data);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };

    if (userDataAfterFetching[0]?.email) {
      fetchUsers();
    }
  }, [userDataAfterFetching]);

  const showModal = (record) => {
    setSelectedRecord(record);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setSelectedRecord(null);
  };

  const columns = [
    {
      title: (
        <span style={{ color: "rgb(43, 54, 116)" }} className="font-custom font-extrabold">
          Email
        </span>
      ),
      dataIndex: "email",
      key: "email",
    },
    {
      title: (
        <span style={{ color: "rgb(43, 54, 116)" }} className="font-custom font-extrabold">
          Date
        </span>
      ),
      dataIndex: "date",
      key: "date",
    },
    {
      title: (
        <span style={{ color: "rgb(43, 54, 116)" }} className="font-custom font-extrabold">
          Place
        </span>
      ),
      dataIndex: "place",
      key: "place",
    },
    {
      title: (
        <span style={{ color: "rgb(43, 54, 116)" }} className="font-custom font-extrabold">
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
        <span style={{ color: "rgb(43, 54, 116)" }} className="font-custom font-extrabold">
          Slip
        </span>
      ),
      key: "slip",
      render: (record) => (
        <Button type="link" onClick={() => showModal(record)}>
          View Slip
        </Button>
      ),
    },
  ];

  return (
    <div className="p-6">
      <Table
        columns={columns}
        dataSource={datas}
        pagination={{ pageSize: 5 }}
        rowKey="_id"
      />

      <Modal
        title="Booking Slip"
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        {selectedRecord && (
          <Descriptions
            bordered
            size="middle"
            column={1}
            labelStyle={{ fontWeight: 600, backgroundColor: "#f5f5f5" }}
          >
            <Descriptions.Item label="Transaction ID">
              {selectedRecord.transactionId}
            </Descriptions.Item>
            <Descriptions.Item label="Name">
              {selectedRecord.name}
            </Descriptions.Item>
            <Descriptions.Item label="Email">
              {selectedRecord.email}
            </Descriptions.Item>
            <Descriptions.Item label="Phone">
              {selectedRecord.pn}
            </Descriptions.Item>
            <Descriptions.Item label="Sports Category">
              {selectedRecord.sportsCategory}
            </Descriptions.Item>
            <Descriptions.Item label="Person Range">
              {selectedRecord.person}
            </Descriptions.Item>
            <Descriptions.Item label="Date & Time">
              {selectedRecord.date} at {selectedRecord.time}
            </Descriptions.Item>
            <Descriptions.Item label="Place">
              {selectedRecord.place}
            </Descriptions.Item>
            <Descriptions.Item label="Status">
              <Tag
                color={
                  selectedRecord.status === "VALID"
                    ? "green"
                    : selectedRecord.status === "CANCELLED"
                    ? "red"
                    : selectedRecord.status === "TERMINATED"
                    ? "gray"
                    : "yellow"
                }
              >
                {selectedRecord.status}
              </Tag>
            </Descriptions.Item>
          </Descriptions>
        )}
      </Modal>
    </div>
  );
};

export default PersonBooking;
