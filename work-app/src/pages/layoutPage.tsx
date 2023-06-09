import { Outlet } from "react-router-dom";
import HomeBar from "../navbars/AppBar";

const Layout = () => {
  return (
    <>
      <HomeBar />
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
