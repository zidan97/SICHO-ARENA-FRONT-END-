import React from "react";
import { Result, Button } from "antd";
import { useNavigate } from "react-router-dom";

const FailPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex justify-center items-center min-h-screen bg-red-50">
      <Result
        status="error"
        title="Payment Failed"
        subTitle="Unfortunately, your payment could not be completed. Please try again."
        extra={
          <Button
            type="primary"
            onClick={() => navigate("/booking")}
            className="bg-red-600 hover:bg-red-700"
          >
            Retry Booking
          </Button>
        }
      />
    </div>
  );
};

export default FailPage;
