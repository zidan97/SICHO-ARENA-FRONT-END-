
import { Rate, Card, Button, Modal, Form, Input } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";

const { TextArea } = Input;

const AllReviews = () => {
  interface ReviewData {
    rating: number | undefined;
    review: string;
    name: string;
    _id: { $oid: string };
  }

  const [datas, setDatas] = useState<ReviewData[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get("http://localhost:3000/reviews");
        setDatas(response.data);
      } catch (error) {
        alert(error);
      }
    };
    fetchReviews();
  }, []);

  const handleSubmit = async (values: any) => {
    try {
      await axios.post("http://localhost:3000/reviews", values);
      setDatas(prev => [...prev, values]);
      form.resetFields();
      setIsModalOpen(false);
    } catch (err) {
      alert("Failed to submit review");
    }
  };

  return (
    <div className="mt-8 w-1/2 mx-auto">
      
      <div className="flex flex-row items-center justify-between px-2 mb-8">
        <h1 className="text-4xl font-semibold">All Reviews</h1>
        <Button
          type="primary"
          className="text-base font-semibold bg-[#17295A]"
          onClick={() => setIsModalOpen(true)}
        >
          Give a Review
        </Button>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-3 gap-x-40 gap-y-8 mb-24">
        {datas.map((data, index) => (
          <Card
            key={data._id?.$oid || index}
            size="default"
            title={<Rate allowHalf defaultValue={data?.rating} disabled />}
            style={{ width: 290 }}
          >
            <div className="flex flex-col space-y-4">
              <h1>{data.review}</h1>
              <h1 className="text-xs text-center text-gray-600">{data.name}</h1>
            </div>
          </Card>
        ))}
      </div>

      {/* Modal Form */}
      <Modal
        title="Give a Review"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item
            label="Rating"
            name="rating"
            rules={[{ required: true, message: "Please provide a rating" }]}
          >
            <Rate allowHalf />
          </Form.Item>

          <Form.Item
            label="Review (max 70 words)"
            name="review"
            rules={[
              { required: true, message: "Please enter your review" },
              {
                validator: (_, value) =>
                  value && value.split(" ").length > 70
                    ? Promise.reject("Maximum 70 words allowed")
                    : Promise.resolve(),
              },
            ]}
          >
            <TextArea rows={4} />
          </Form.Item>

          <Form.Item
            label="Your Name"
            name="name"
            rules={[{ required: true, message: "Please enter your name" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" className="bg-[#17295A]">
              Submit Review
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AllReviews;
