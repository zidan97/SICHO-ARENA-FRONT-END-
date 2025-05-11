import React, { useState } from "react";
import { AppstoreOutlined, MailOutlined } from "@ant-design/s";
import type { MenuProps } from "antd";
import { Menu, Dropdown } from "antd";
import { icons } from "antd/es/image/PreviewGroup";
import { useNavigate } from "react-router-dom";
import { UserOutlined } from "@ant-design/icons";
import useAuthStore from "../Store/useAuthStore";
import CallUserData from "../HelperFunctions/FetchingUserDataCall";
import { useFetchUserDataForStore } from "../Store/FetchUserInformation";
type MenuItem = Required<MenuProps>["items"][number];
type MenuItemtwo = Required<MenuProps>["itemstwo"][number];

const itemstwo: MenuItemtwo[] = [
  {
    label: "Sicho Arena",
    key: "sa",
    icons: "../../public/logo/image.png",
  },
];
const items: MenuItem[] = [
  {
    label: "Home",
    key: "home",

    style: { color: "white" },
  },

  {
    label: "Our Services",
    key: "services",

    style: { color: "white" },
  },

  {
    label: "Announcements",
    key: "annc",

    style: { color: "white" },
  },

  {
    label: "About",
    key: "about",
    style: { color: "white" },
  },
  {
    label: "Review",
    key: "review",
    style: { color: "white" },
  },

  {
    label: "Contact",
    key: "contact",

    style: { color: "white" },
  },
  {
    label: "Book Now",

    key: "booking",

    style: {
      color: "white",
      backgroundColor: "#6EC1E4",
    },
  },
  // {
  //   // label: "Login",
  //   key: "user",
  //   icon: <UserOutlined />,
  //   style: { color: "white" },
  // },
];

const itemsAuthentications: MenuItem[] = [
  {
    label: "Login",
    key: "login",
  },
  {
    label: "Registration",
    key: "reg",
  },
];

const itemsafterlogin: MenuItem[] = [
  {
    label: "Dashboard",
    key: "dashboard",
  },
  {
    label: "Logout",
    key: "logout",
  },
];

const TopMenu: React.FC = () => {
  const [current, setCurrent] = useState("home");
  const { userDataAfterFetching } = useFetchUserDataForStore();
  const role = userDataAfterFetching[0]?.role;

  const navigate = useNavigate();

  const { user } = useAuthStore();
  console.log("user exist", user);
  CallUserData();
  // console.log("user exist", user?.user?.email);
  const { signOut } = useAuthStore();

  const onClick: MenuProps["onClick"] = (e) => {
    setCurrent(e.key);
    if (e.key === "about") {
      navigate("/about");
    } else if (e.key === "booking") {
      navigate("/booking");
    } 
    else if(e.key==="review"){
      navigate("/allreview");
    }
    else if (e.key === "services") {
      navigate("/service");
    } else if (e.key === "contact") {
      navigate("/contact");
    } else if (e.key === "annc") {
      navigate("/clientannounce");
    } else {
      navigate("/");
    }
  };

  const authenticationMenu = (
    <>
      {user ? (
        <Menu
          items={itemsafterlogin}
          onClick={(e) => {
            setCurrent(e.key);
            if (e.key === "dashboard") {
              // navigate("/dashboard");
              {
                role === "user"
                  ? navigate("/personBooking")
                  : navigate("/admin");
              }
            } else if (e.key === "logout") {
              signOut();
            }
          }}
        />
      ) : (
        <Menu
          items={itemsAuthentications}
          onClick={(e) => {
            setCurrent(e.key);
            if (e.key === "login") {
              navigate("/login");
            } else if (e.key === "reg") {
              navigate("/registration");
            }
          }}
        />
      )}
    </>
  );

  return (
    <Menu
      onClick={onClick}
      mode="horizontal"
      selectedKeys={[current]}
      className="p-6 items-center justify-end gap-4 bg-[#17295A] font-semibold"
    >
      {items.map((item) => (
        <Menu.Item key={item.key} style={item.style}>
          {item.label}
        </Menu.Item>
      ))}
      <Dropdown overlay={authenticationMenu} trigger={["click"]}>
        <Menu.Item
          key="user"
          icon={<UserOutlined />}
          style={{ color: "white" }}
        />
      </Dropdown>
    </Menu>
  );
};

export default TopMenu;
