import React from "react";
import { Result, Button } from "antd";
import { useNavigate } from "react-router-dom";

const CancelPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex justify-center items-center min-h-screen bg-yellow-50">
      <Result
        status="warning"
        title="Payment Canceled"
        subTitle="Your payment was canceled. You can retry or explore other options."
        extra={
          <Button
            type="primary"
            onClick={() => navigate("/")}
            className="bg-yellow-600 hover:bg-yellow-700"
          >
            Return to Homepage
          </Button>
        }
      />
    </div>
  );
};

export default CancelPage;
