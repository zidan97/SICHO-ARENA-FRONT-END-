import React, { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import axios from 'axios';
import ColumnGroup from 'antd/es/table/ColumnGroup';

const AnnouncementPage = () => {
  
  const [loading, setLoading] = useState(false);

  // Form submission handler
  const onFinish = async (values) => {
    setLoading(true);
  
console.log("values",values)
    try {
      const response = await axios.post('http://localhost:3000/announcement', values);
      message.success('Announcement posted successfully!');
      console.log('Server Response:', response.data);
    } catch (error) {
      console.error('Error posting announcement:', error);
      message.error('Failed to post announcement. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
      <h1 className="text-2xl font-bold text-center mb-6">Admin Announcement Panel</h1>
      <Form 
        layout="vertical" 
        onFinish={onFinish} 
        className="space-y-4"
      >
        {/* Title Field */}
        <Form.Item 
          label="Title" 
          name="title" 
          rules={[{ required: true, message: 'Please enter the title!' }]} 
        >
          <Input placeholder="Enter announcement title" className="rounded-md" />
        </Form.Item>

        {/* Body Field */}
        <Form.Item 
          label="Body" 
          name="body" 
          rules={[{ required: true, message: 'Please enter the announcement body!' }]} 
        >
          <Input.TextArea 
            rows={5} 
            placeholder="Write the details of the announcement here..." 
            className="rounded-md" 
          />
        </Form.Item>

        {/* Submit Button */}
        <Form.Item>
          <Button 
            type="primary" 
            htmlType="submit" 
            loading={loading} 
            className="bg-blue-500 hover:bg-blue-600 w-full rounded-md"
          >
            {loading ? 'Posting...' : 'Post Announcement'}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AnnouncementPage;
