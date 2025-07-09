"use client";

import { AlertCircle } from "lucide-react";

export const SmartCta = () => {
  return (
    <div className=" p-4 sm:p-5 bg-brand/10 border border-brand/20 rounded-md flex items-start gap-3 flex-col sm:flex-row">
      <AlertCircle className="text-brand" />
      <div className="text-sm text-brand leading-snug">
        You have unpaid dues in 2 groups. Don’t forget to contribute this week.
      </div>
    </div>
  );
};
