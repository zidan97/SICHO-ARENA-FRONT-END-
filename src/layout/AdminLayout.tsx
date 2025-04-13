import React from "react";
import { Button, Layout } from "antd"; // Optionally use Ant Design Layout for structure
import SideMenu from "./SideMenu";
import { Outlet } from "react-router-dom";

const { Sider, Content } = Layout;

const AdminLayout: React.FC = () => {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider width={250} style={{ background: "#fff" }}>
        <SideMenu />
      </Sider>
      <Layout>
        <Content style={{ padding: "30px", left: "50px" }}>
          <Outlet /> {/* This renders nested routes */}
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;
