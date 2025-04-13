import { Outlet } from "react-router-dom";
import TopMenu from "./layout/TopMenu";

function App() {
  return (
    <>
      <TopMenu></TopMenu>
      <Outlet />
    </>
  );
}

export default App;
