import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card } from 'antd';

const AnnouncementClient = () => {
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    // Fetch announcements from the server
    const fetchAnnouncements = async () => {
      try {
        const response = await axios.get('http://localhost:3000/announcement'); // Replace with your API endpoint
        setAnnouncements(response.data);
      } catch (error) {
        console.error('Error fetching announcements:', error);
      }
    };

    fetchAnnouncements();
  }, []);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-4xl grid grid-cols-1  gap-6">
        {announcements.map((announcement) => (
          <Card
            key={announcement._id.$oid}
            className="shadow-lg rounded-lg hover:shadow-xl transition duration-300 bg-white"
            title={<span className="font-bold text-lg text-gray-800">{announcement.title}</span>}
          >
            <p className="text-base text-gray-600">{announcement.body}</p>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AnnouncementClient;
