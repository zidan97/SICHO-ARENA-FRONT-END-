import React, { useState } from "react";
import { GoogleOutlined, LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, Flex } from "antd";
import { Link, Navigate, useNavigate } from "react-router-dom";
import useAuthStore from "../Store/useAuthStore";
import ShowPopUp from "../UIComponents/Modal";
import CallUserData from "../HelperFunctions/FetchingUserDataCall";

const Login: React.FC = () => {
  const loginForm = useAuthStore((state) => state.signIn);
  const navigate = useNavigate();

  const [success, setSuccess] = useState<boolean | undefined>(undefined);
  const [error, setError] = useState<string | undefined>(undefined);
  const [flag, setFlag] = useState<string | undefined>(undefined);

  const onFinish = (values: any) => {
    console.log("Received values of form: ", values);
    loginForm(values.username, values.password)
      .then(() => {
        setSuccess(true);
        setError(undefined);
        setFlag("login");
        setTimeout(() => {
          navigate("/");
        }, 1000);
      })
      .catch((err) => {
        setSuccess(false); // Show error message
        setError(` ${err}`); // Set error message
        console.error("Error logging in user", err);
      });
  };

  const closeModal = () => {
    setSuccess(undefined);
    setError(undefined);
  };

  return (
    <div className="flex flex-col items-center justify-center mt-16">
      <div className="border rounded-md border-[#17295A] p-8">
        <h1 className="mt-8 mb-8 text-center text-4xl font bold text-[#17295A]">
          Sign in
        </h1>

        <Form
          name="login"
          initialValues={{ remember: true }}
          style={{ maxWidth: 400 }}
          onFinish={onFinish}
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: "Please input your Username!" }]}
          >
            <Input prefix={<UserOutlined />} placeholder="Username" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your Password!" }]}
          >
            <Input
              prefix={<LockOutlined />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>

          <Form.Item>
            <Button
              className="bg-[#17295A] text-white text-base px-1 py-2"
              block
              htmlType="submit"
            >
              Submit
            </Button>
            {/* or <a href="/registration">Register now!</a> */}
            <div className="mt-4">
              <Link to="/registration">
                <p className="text-blue-700">
                  <span className="text-gray-500">Not Registered? </span>
                  Register now
                </p>
              </Link>
              <div className="border-t-2 mt-4 border-indigo-500 ...">
                {/* <h1 className="text-center mt-2 text-gray-500">
                  or you can sign in with
                </h1> */}
                {/* <button className="flex mt-4 mx-auto">
                  <GoogleOutlined className="text-2xl " />
                </button> */}
              </div>
            </div>
          </Form.Item>
        </Form>
        {success !== undefined && (
          <>
            <ShowPopUp
              visible={true}
              success={success}
              error={error}
              onClose={closeModal} // Close modal by resetting state
              flag={flag}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default Login;
