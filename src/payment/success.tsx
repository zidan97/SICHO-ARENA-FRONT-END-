import React from "react";
import { Result, Button } from "antd";
import { useNavigate } from "react-router-dom";

const SuccessPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex justify-center items-center min-h-screen bg-green-50">
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
      />
    </div>
  );
};

export default SuccessPage;
