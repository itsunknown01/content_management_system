"use client";

import { logout } from "@/actions/auth/logout";
import { Button } from "./button";

const Logout = () => {
  const handleSubmit = () => {
    logout();
  };
  return <Button onClick={handleSubmit}>Log Out</Button>;
};

export default Logout;
