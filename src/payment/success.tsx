// import React from "react";
// import { Result, Button } from "antd";
// import { useNavigate } from "react-router-dom";

// const SuccessPage = () => {
//   const navigate = useNavigate();

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-green-50">
//       <Result
//         status="success"
//         title="Payment Successful"
//         subTitle="Thank you for your payment. Your transaction was successful."
//         extra={
//           <Button
//             type="primary"
//             onClick={() => navigate("/")}
//             className="bg-green-600 hover:bg-green-700"
//           >
//             Go to Homepage
//           </Button>
//         }
//       />
//     </div>
//   );
// };

// export default SuccessPage;


import React, { useEffect, useState } from "react";
import { Result, Button, Descriptions, Tag, Spin } from "antd";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const SuccessPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);

  const params = new URLSearchParams(location.search);
  const tranId = params.get("tran_id");

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/form/personBookingBasedOnTransactionId/${tranId}`
        );
        setBooking(response.data);
      } catch (error) {
        console.error("Error fetching booking:", error);
      } finally {
        setLoading(false);
      }
    };

    if (tranId) {
      fetchBooking();
    }
  }, [tranId]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-green-50 p-4">
      {loading ? (
        <Spin size="large" />
      ) : (
        <Result
          status="success"
          title="Payment Successful"
          subTitle="Thank you for your payment. Your transaction was successful."
          extra={
            <Button
              type="primary"
              onClick={() => navigate("/")}
              className="bg-green-600 hover:bg-green-700"
            >
              Go to Homepage
            </Button>
          }
        >
          {booking && (
            <Descriptions
              bordered
              size="middle"
              column={1}
              labelStyle={{ fontWeight: 600, backgroundColor: "#f5f5f5" }}
            >
              <Descriptions.Item label="Transaction ID">
                {booking.transactionId}
              </Descriptions.Item>
              <Descriptions.Item label="Name">
                {booking.name}
              </Descriptions.Item>
              <Descriptions.Item label="Email">
                {booking.email}
              </Descriptions.Item>
              <Descriptions.Item label="Phone">
                {booking.pn}
              </Descriptions.Item>
              <Descriptions.Item label="Sports Category">
                {booking.sportsCategory}
              </Descriptions.Item>
              <Descriptions.Item label="Person Range">
                {booking.person}
              </Descriptions.Item>
              <Descriptions.Item label="Date & Time">
                {booking.date} at {booking.time}
              </Descriptions.Item>
              <Descriptions.Item label="Place">
                {booking.place}
              </Descriptions.Item>
              <Descriptions.Item label="Status">
                <Tag
                  color={
                    booking.status === "VALID"
                      ? "green"
                      : booking.status === "CANCELLED"
                      ? "red"
                      : booking.status === "TERMINATED"
                      ? "gray"
                      : "yellow"
                  }
                >
                  {booking.status}
                </Tag>
              </Descriptions.Item>
            </Descriptions>
          )}
        </Result>
      )}
    </div>
  );
};

export default SuccessPage;
