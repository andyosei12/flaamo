"use client";

import { useEffect } from "react";
import { setupAxiosInterceptors } from "@/lib/interceptors";

const AppInit = () => {
  useEffect(() => {
    setupAxiosInterceptors();
  }, []);

  return null;
};

export default AppInit;
