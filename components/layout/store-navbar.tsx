"use client";

import { cn, getRoutes } from "@/lib/utils";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import React from "react";

const StoreNavbar = ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => {
  const params = useParams();
  const pathname = usePathname();

  const routes = getRoutes(params, pathname);

  return (
    <nav
      className={cn("flex items-center space-x-4 lg:space-x-6", className)}
      {...props}
    >
      {routes.map((route) => (
        <Link
          key={route.href}
          href={route.href}
          className={cn(
            "text-sm font-medium transition-colors hover:text-primary",
            route.active
              ? "text-black dark:text-white"
              : " text-muted-foreground"
          )}
        >
          {route.label}
        </Link>
      ))}
    </nav>
  );
};

export default StoreNavbar;
