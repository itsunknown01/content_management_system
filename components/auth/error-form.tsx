import React from "react";
import CardWrapper from "@/components/auth/card-wrapper";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

const ErrorForm = () => {
  return (
    <CardWrapper
      heading="Content Management System"
      description="Oops! Something went wrong!"
      backButtonLink="/login"
      backButtonTitle="Back to Login"
    >
      <div className="w-full flex justify-center items-center">
        <ExclamationTriangleIcon className="text-destructive" />
      </div>
    </CardWrapper>
  );
};

export default ErrorForm;
