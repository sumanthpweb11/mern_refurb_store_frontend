import { Tabs } from "antd";
import Products from "./Products";

const items = [
  {
    key: "1",
    label: `Products`,
    children: <Products />,
  },
  {
    key: "2",
    label: `Bids`,
    children: `Content of Tab Pane 2`,
  },
  {
    key: "3",
    label: `General`,
    children: `Content of Tab Pane 3`,
  },
];

const Profile = () => {
  return <Tabs defaultActiveKey="1" items={items} />;
};

export default Profile;
