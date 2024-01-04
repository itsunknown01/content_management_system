"use client";

import React from "react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import Heading from "@/components/ui/heading";
import SocialLogin from "@/components/auth/login/social-login";
import BackButton from "@/components/auth/login/back-button";

interface CardWrapperProps {
  children: React.ReactNode;
  heading: string;
  description: string
  backButtonTitle: string;
  backButtonLink: string;
  showSocial?: boolean;
}

const CardWrapper = ({
  children,
  heading,
  description,
  backButtonTitle,
  backButtonLink,
  showSocial,
}: CardWrapperProps) => {
  return (
    <Card className="w-[450px] shadow-md">
      <CardHeader>
        <Heading title={heading} description={description} />
      </CardHeader>
      <CardContent>{children}</CardContent>
      {showSocial && (
        <CardFooter>
            <SocialLogin />
        </CardFooter>
      )}
      <CardFooter>
        <BackButton href={backButtonLink} label={backButtonTitle} />
      </CardFooter>
    </Card>
  );
};

export default CardWrapper;
