"use client";
import React, { useEffect } from "react";

const Providers = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      const mocking = import("../model");
      mocking
        .then(() => console.log("Mocking started"))
        .catch((error) => console.error("Mocking failed", error));
    }
  }, []);

  return <>{children}</>;
};

export default Providers;
