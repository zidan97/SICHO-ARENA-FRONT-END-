import React, { useState } from "react";
import { AutoComplete, Button, Checkbox, Form, Input, Select } from "antd";
import { Link } from "react-router-dom";
import useAuthStore from "../Store/useAuthStore";
import ShowPopUp from "../UIComponents/Modal"; // Import your ShowPopUp component
import axios from "axios";

const { Option } = Select;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

const tailFormItemLayout = {
  wrapperCol: {
    xs: { span: 24, offset: 0 },
    sm: { span: 16, offset: 8 },
  },
};

const Registration: React.FC = () => {
  const [form] = Form.useForm();

  // Calling the Zustand hook for signup functionality
  const signUpForm = useAuthStore((state) => state.signUp);

  // State for managing pop-up visibility
  const [success, setSuccess] = useState<boolean | undefined>(undefined);
  const [error, setError] = useState<string | undefined>(undefined);
  const [flag, setFlag] = useState<string | undefined>(undefined);
  const [isDataSaved, setIsDataSaved] = useState<boolean | undefined>(
    undefined
  );

  const onFinish = async (values: any) => {
    // Call the signup function
    values.role = "user";
    console.log(values);
    signUpForm(values.email, values.password)
      .then(async () => {
        setSuccess(true); // Show success message
        setError(undefined); // Clear any previous error
        setFlag("register");

        try {
          const response = await axios.post(
            "http://localhost:3000/users",
            values
          );
          console.log(response);
          if (response.statusText == "Created") {
            setIsDataSaved(true);
          }
        } catch (error) {
          console.log(error);
          setIsDataSaved(false);
        }
      })
      .catch((error) => {
        setSuccess(false); // Show error message
        setError(` ${error}`); // Set error message
        console.error("Error registering user", error); // Log the error for debugging
      });
  };

  // Reset success and error state on modal close
  const closeModal = () => {
    setSuccess(undefined);
    setError(undefined);
  };

  return (
    <div className="flex flex-col items-center justify-center mt-16">
      <div className="border rounded-md border-[#17295A] p-8">
        <h1 className="mt-8 mb-8 text-center text-4xl font-bold text-[#17295A]">
          Sign Up
        </h1>
        <Form
          {...formItemLayout}
          form={form}
          name="register"
          onFinish={onFinish}
          initialValues={{ prefix: "86" }}
          style={{ maxWidth: 600 }}
          scrollToFirstError
        >
          <Form.Item
            name="email"
            label="E-mail"
            rules={[
              { type: "email", message: "The input is not valid E-mail!" },
              { required: true, message: "Please input your E-mail!" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="password"
            label="Password"
            rules={[{ required: true, message: "Please input your password!" }]}
            hasFeedback
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="confirm"
            label="Confirm Password"
            dependencies={["password"]}
            hasFeedback
            rules={[
              { required: true, message: "Please confirm your password!" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("The two passwords do not match!")
                  );
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="nickname"
            label="Nickname"
            rules={[{ required: true, message: "Please input your nickname!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="phone"
            label="Phone Number"
            rules={[
              { required: true, message: "Please input your phone number!" },
            ]}
          >
            <Input style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item
            name="gender"
            label="Gender"
            rules={[{ required: true, message: "Please select gender!" }]}
          >
            <Select placeholder="select your gender">
              <Option value="male">Male</Option>
              <Option value="female">Female</Option>
              <Option value="other">Other</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="agreement"
            valuePropName="checked"
            rules={[
              {
                validator: (_, value) =>
                  value
                    ? Promise.resolve()
                    : Promise.reject(new Error("Should accept agreement")),
              },
            ]}
            {...tailFormItemLayout}
          >
            <Checkbox>
              I have read the <a href="">agreement</a>
            </Checkbox>
          </Form.Item>

          <Form.Item {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit">
              Register
            </Button>
            <div className="mt-4">
              <Link to="/login">
                <p className="text-blue-700">
                  <span className="text-gray-500">Already Registered? </span>
                  Login
                </p>
              </Link>
            </div>
          </Form.Item>
        </Form>

        {/* Modal for showing success or error pop-up */}
        {success !== undefined && isDataSaved !== undefined && (
          <ShowPopUp
            visible={true}
            success={success}
            error={error}
            onClose={closeModal} // Close modal by resetting state
            flag={flag}
          />
        )}
      </div>
    </div>
  );
};

export default Registration;
