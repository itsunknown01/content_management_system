"use client";

import { useRouter } from "next/navigation";
import React from "react";

interface LoginButtonProps {
  children: React.ReactNode;
  mode?: "modal" | "redirect";
  asChild?: boolean;
}

const LoginButton = ({
  children,
  asChild,
  mode = "redirect",
}: LoginButtonProps) => {
  const router = useRouter();

  const handleClick = () => {
    router.push("/login");
  };

  return (
    <span onClick={handleClick} className=" cursor-pointer">
      {children}
    </span>
  );
};

export default LoginButton;
