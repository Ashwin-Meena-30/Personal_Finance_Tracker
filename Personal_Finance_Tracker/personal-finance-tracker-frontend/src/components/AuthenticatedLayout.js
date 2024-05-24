import React from "react";
import { Outlet } from "react-router-dom";
import LogoutButton from "./LogoutButton";

function AuthenticatedLayout() {
  return (
    <div>
      <LogoutButton />
      <Outlet />
    </div>
  );
}

export default AuthenticatedLayout;
