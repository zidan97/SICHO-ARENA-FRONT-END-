import React from "react";
import {
  UserOutlined,
  SolutionOutlined,
  BookOutlined,
  DollarOutlined,
  LogoutOutlined,
  SoundOutlined,
} from "@ant-design/icons";
import { Menu, Layout } from "antd";
import type { MenuProps } from "antd";
import logo from "../../public/logo/image.png";
import { useNavigate } from "react-router-dom";

const { Sider } = Layout;

const items: MenuProps["items"] = [
  {
    key: "1",
    label: (
      <span>
        <UserOutlined /> Users
      </span>
    ),
  },
  {
    key: "2",
    label: (
      <span>
        <SolutionOutlined /> Services
      </span>
    ),
  },
  {
    key: "3",
    label: (
      <span>
        <BookOutlined /> Bookings
      </span>
    ),
  },
  {
    key: "4",
    label: (
      <span>
        <DollarOutlined /> Revenue
      </span>
    ),
  },
  {
    key: "5",
    label: (
      <span>
        <SoundOutlined  /> Announcement
      </span>
    ),
  },
  {
    key: "6",
    label: (
      <span>
        <LogoutOutlined /> Go Back Home
      </span>
    ),
  },
];

const SideMenu: React.FC = () => {
  const navigate = useNavigate();
  const onClick: MenuProps["onClick"] = (e) => {
    console.log("click ", e);
    if (e.key === "1") {
      navigate("/admin/users");
    }
    if (e.key === "2") {
      navigate("/admin/services");
    }
    if (e.key === "3") {
      navigate("/admin/booking");
    }
    if (e.key === "4") {
      navigate("/admin/revenue");
    }
    if (e.key === "5") {
      navigate("/admin/announcement");
    }
    if (e.key === "6") {
      navigate("/");
    }
  };

  return (
    <Layout style={{ height: "100vh" }}>
      <Sider
        width="80%"
        style={{
          background: "rgba(40, 144, 255, 0.2)", // Bluish glass effect
          backdropFilter: "blur(15px)", // Glass effect
          WebkitBackdropFilter: "blur(15px)", // Safari support
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Subtle shadow
        }}
      >
        <div className="bg-white p-5 border-b-2 border-sky-400 text-center">
          <div className="flex gap-2">
            <img src={logo} width={50} />
            <h1
              style={{ color: "rgb(43, 54, 116)" }}
              className="text-xl  font-custom font-bold"
            >
              Sico Arena
            </h1>
          </div>
          <div
            className="font-custom1 "
            style={{
              fontSize: "14px",
              marginTop: "20px",
              color: "rgb(43, 54, 116)",
            }}
          >
            Admin Panel
          </div>
        </div>
        <Menu
          onClick={onClick}
          style={{
            height: "100%",
            color: "white", // White text
            fontWeight: "bold", // Bold font
            fontSize: "15px", // Increased text size
          }}
          mode="inline"
          items={items}
          theme="light"
        />
      </Sider>
    </Layout>
  );
};

export default SideMenu;
