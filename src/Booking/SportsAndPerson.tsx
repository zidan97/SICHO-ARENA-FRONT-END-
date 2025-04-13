import React, { useEffect, useState } from "react";
import { Button, DatePicker, Form, Input, Select, Space } from "antd";
import { useBookingFormStore } from "../Store/Form.Store";
import axios from "axios";
import { useFetchSportsDataForStore } from "../Store/FetchSportsData";
import parsePersonPrice from "../Admin/Utils/ParsePersonPrice";
import LoopPersonPrice from "../HelperFunctions/LoopPersonPrice";

const { Option } = Select;

const layout = {
  labelCol: { span: 10 },
  wrapperCol: { span: 16 },
};

const tailLayout = {
  wrapperCol: { offset: 9, span: 16 },
};

const disableDate = (current: any) => {
  const today = new Date();
  return current && current < today.setHours(0, 0, 0, 0);
};

const SportsAndPerson: React.FC = () => {
  const [form] = Form.useForm();
  const { sportsData, updateSportsData } = useFetchSportsDataForStore();
  const [activeSports, setActiveSports] = useState([]);
  const [selectedSport, setSelectedSport] = useState("");
  const [selectedDate, setSelectedDate] = useState("");

  useEffect(() => {
    const fetchActiveSports = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/sports-service"
        );
        setActiveSports(response.data);
        console.log("Fetched Active Sports:", response.data);
      } catch (error) {
        alert(error);
        console.error("Error fetching active sports:", error);
      }
    };

    fetchActiveSports();
  }, []);

  const dateFormat = "YYYY/MM/DD";
  const updatedDate = useBookingFormStore((state) => state.updateDate);

  const updateSportsAndPerson = useBookingFormStore(
    (state) => state.updateSportsAndPerson
  );

  // select the Sports
  const handleSelectSport = (value: any) => {
    setSelectedSport(value);
  };
  const handleSelectDate = (date: any, dateString: string) => {
    setSelectedDate(dateString);
  };

  useEffect(() => {
    const fetchSportsData = async () => {
      if (selectedSport && selectedDate) {
        const url = `http://localhost:3000/sports-service/${selectedSport}/${selectedDate}`;
        console.log("url", url);
        try {
          const response = await axios.get(url);
          console.log("Fetched Sports Data:", response.data);
          updateSportsData(response.data);
        } catch (error) {
          console.error("Error fetching sports data:", error);
          alert("Failed to fetch sports data. Please try again.");
        }
      }
    };

    fetchSportsData();
  }, [selectedDate, selectedSport, updateSportsData]);

  // const onSportsCategorySelect = async () => {
  //   // console.log("onsportsCategorySelect", value);
  //   try {
  //     const response = value;
  //     const sportsCategoryFetching = await axios.get(
  //       `http://localhost:3000/sports-service/${value}`
  //     );
  //     console.log("sportsCategoryFetching", sportsCategoryFetching.data);
  //     // useFetchSportsDataForStore.updateSportsData(sportsCategoryFetching.data);
  //     updateSportsData(sportsCategoryFetching.data);
  //   } catch (error) {
  //     alert(error.message);
  //     console.log("sportsCetogiryFetch", error);
  //   }
  // };
  // useEffect(() => {
  //   console.log("Updated sportsData in store:", sportsData);
  // }, [sportsData]);

  const onFinish = (values: any) => {
    const formattedDate = values.date ? values.date.format(dateFormat) : null;
    const updatedValues = { ...values, date: formattedDate };
    console.log(values);
    updatedDate(updatedValues);
    updateSportsAndPerson(values);
    alert("submitted")
  };
  const onReset = () => {
    form.resetFields();
  };

  return (
    <div className=" border-2 rounded-e-3xl p-6 min-h-64 border-blue-300">
      {/* <h1 className="text-center text-xl font-semibold mb-4 p-8">
        Select Sports Category and Person
      </h1> */}
      <Form
        {...layout}
        form={form}
        name="control-hooks"
        onFinish={onFinish}
        style={{ maxWidth: 600 }}
      >
        <Form.Item
          name="sportsCategory"
          label="Sports"
          rules={[{ required: true }]}
        >
          <Select
            placeholder="Select Sports Category"
            allowClear
            onChange={handleSelectSport}
          >
            {activeSports.map((sport) => (
              <Option key={sport} value={sport}>
                {sport}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item name="date" label="Date" rules={[{ required: true }]}>
          <DatePicker
            onChange={(date: any, dateString: string) =>
              handleSelectDate(date, dateString)
            }
            format={dateFormat}
            disabledDate={disableDate}
          />
        </Form.Item>

        <Form.Item name="person" label="Person" rules={[{ required: true }]}>
          {sportsData.map((item) => (
            <Select placeholder="Choose Person" allowClear>
              console.log({item.personPrice});
              {LoopPersonPrice(item.personPrice).map((option, index) => (
                <Option key={index} value={option.value}>
                  {option.label}
                </Option>
              ))}
            </Select>
          ))}
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Space>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
            <Button htmlType="button" onClick={onReset}>
              Reset
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </div>
  );
};

export default SportsAndPerson;
