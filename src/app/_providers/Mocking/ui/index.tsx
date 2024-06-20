"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

// import { initMocks } from "@/app/_providers/Mocking/model";
import HeaderIcon from "@/shared/icons/header.svg";

const Providers = ({ children }: { children: React.ReactNode }) => {
  const [isMockingStarted, setIsMockingStarted] = useState(false);

  useEffect(() => {
    setIsMockingStarted(true);
    // initMocks()
    //   .then(() => {
    //     setIsMockingStarted(true);
    //   })
    //   .catch((error) => console.error("Mocking failed", error));
  }, []);

  // TODO: вынести в loading.tsx и пока не загрузилось, вызывать лоадер некста, а не вот это вот что это вообще такое
  if (!isMockingStarted) {
    return (
      <motion.div
        style={{
          height: "100dvh",
          width: "100dvw",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.5, repeat: Infinity }} // Adjust the duration as needed
      >
        <HeaderIcon />
      </motion.div>
    );
  }

  return <>{children}</>;
};

export default Providers;
