import { Outlet } from "react-router-dom";
import Header from "../Header/Header";
import UserList from "../UserList/UserList";

export default function LayoutRoot() {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
}
