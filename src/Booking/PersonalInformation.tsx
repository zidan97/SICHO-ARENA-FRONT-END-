import React, { useCallback, useEffect } from "react";
import { Button, Checkbox, Form, Input } from "antd";
import { useBookingFormStore } from "../Store/Form.Store";
import useAuthStore from "../Store/useAuthStore";
import axios from "axios";
import { useFetchUserDataForStore } from "../Store/FetchUserInformation";

// const onFinish = (values: any) => {
//   console.log("Success:", values);
// };

const PersonalInformation: React.FC = () => {
  const updatePersonalInformation = useBookingFormStore(
    (state) => state.updatePersonalInformation
  );

  const { userDataAfterFetching, updateUserData } = useFetchUserDataForStore();

  // Retrive user information from google auth for useEmail. Later pass through userEmail in an api to get the full information of the user from database.
  const { user } = useAuthStore();
  console.log("user personalInformation", user);
  const userEmailId = user?.email;
  console.log(userEmailId);

  // const fetchUserInformation = async (value: string) => {
  //   try {
  //     const informationFetching = await axios.get(
  //       `http://localhost:3000/users/${value}`
  //     );
  //     console.log(informationFetching.data);
  //     updateUserData(informationFetching.data);
  //   } catch (error) {
  //     console.error(error); // Adjusted to use console.error for errors
  //   }
  // };

  // useEffect(() => {
  //   if (user && userEmailId) {
  //     fetchUserInformation(userEmailId); // Call the fetch function inside useEffect
  //   }
  // }, [user, userEmailId]);

  useEffect(() => {
    console.log("Updated PersonData in store:", userDataAfterFetching);
  }, [userDataAfterFetching]);

  const onFinish = (values: any) => {
    console.log("Success:", values);
    updatePersonalInformation(values);
    alert("submitted")
  };
  const initialValues =
    userDataAfterFetching.length > 0
      ? {
          name: userDataAfterFetching[0].nickname || "",
          email: userDataAfterFetching[0].email || "",
          pn: userDataAfterFetching[0].phone || "",
        }
      : {
          name: "",
          email: "",
          pn: "",
        };
  // console.log("initialValues", initialValues);
  return (
    <div className="border-2 rounded-e-3xl p-4 min-h-64 border-blue-300">
      {/* <h1 className="text-center text-xl font-semibold mb-4 p-8">
      Personal Information
    </h1> */}
      <Form
        name="basic"
        labelCol={{ span: 9 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={initialValues}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: "Please input your name!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: "Please input your Email!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Phone Number"
          name="pn"
          rules={[
            { required: true, message: "Please input your Phone Number!" },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default PersonalInformation;
