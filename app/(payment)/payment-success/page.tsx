"use client";

import { useRef } from "react";
import { CheckCircle2, Download, ArrowRight, RotateCcw } from "lucide-react";
import { toPng } from "html-to-image";
import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";
import { useGetPaymentReceipt } from "@/hooks/usePayment";

export default function ReceiptPage() {
  const receiptRef = useRef<HTMLDivElement>(null);
  const { paymentInfo, isLoading, isError, refetch } = useGetPaymentReceipt();

  const handleDownload = async () => {
    if (receiptRef.current) {
      const dataUrl = await toPng(receiptRef.current, {
        cacheBust: true,
        pixelRatio: 2,
      });
      const link = document.createElement("a");
      link.download = "flaamo-receipt.png";
      link.href = dataUrl;
      link.click();
    }
  };

  const isReady = !isLoading && !isError && paymentInfo;

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 py-10 bg-white dark:bg-[#0e0f11] transition-colors duration-300">
      {/* RECEIPT CARD */}
      <div
        ref={receiptRef}
        className="relative w-full max-w-md sm:rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#111214] shadow-xl p-6 transition-colors duration-300"
      >
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <Image
            src="/logo.png"
            alt="Flaamo Logo"
            width={130}
            height={40}
            className="object-contain"
          />
        </div>

        {isLoading && <ReceiptSkeleton />}

        {isError && (
          <div className="text-center text-sm text-red-500 space-y-3">
            <p>Failed to load receipt. Please try again.</p>
            <button
              onClick={() => refetch()}
              className="inline-flex items-center gap-2 text-sm font-semibold text-brand hover:underline"
            >
              <RotateCcw className="w-4 h-4" />
              Retry
            </button>
          </div>
        )}

        {isReady && (
          <>
            <div className="flex flex-col items-center text-center">
              <CheckCircle2 className="text-green-600 w-14 h-14 mb-2" />
              <h2 className="text-2xl font-semibold tracking-tight text-gray-800 dark:text-white">
                Payment Successful
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Your payment receipt is ready.
              </p>
            </div>

            <div className="h-px my-5 bg-gradient-to-r from-transparent via-gray-300 to-transparent dark:via-gray-700" />

            <div className="space-y-4 text-sm font-medium text-gray-700 dark:text-gray-300">
              <ReceiptDetail label="Group Name" value={paymentInfo.group} />
              <ReceiptDetail
                label="Dues Title"
                value={paymentInfo.dues_title}
              />
              <ReceiptDetail label="Paid By" value={paymentInfo.paidBy} />
              <ReceiptDetail
                label="Amount"
                value={`GHS ${paymentInfo.amount}`}
              />
              <ReceiptDetail
                label="Paid At"
                value={format(new Date(paymentInfo.paid_at), "PP 'at' p")}
              />
              <ReceiptDetail
                label="Reference"
                value={paymentInfo.payment_reference}
                monospace
              />
            </div>

            {/* SVG STAMP (watermark) */}
            <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
              <svg
                width="160"
                height="160"
                viewBox="0 0 120 120"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="dark:invert"
              >
                <circle
                  cx="60"
                  cy="60"
                  r="54"
                  stroke="#16A34A"
                  strokeWidth="4"
                  fill="none"
                />
                <text
                  x="60"
                  y="55"
                  textAnchor="middle"
                  fill="#16A34A"
                  fontSize="12"
                  fontWeight="bold"
                  fontFamily="sans-serif"
                >
                  PAID
                </text>
                <text
                  x="60"
                  y="75"
                  textAnchor="middle"
                  fill="#16A34A"
                  fontSize="10"
                  fontFamily="sans-serif"
                >
                  FLAAMO
                </text>
              </svg>
            </div>
          </>
        )}
      </div>

      {/* ACTIONS */}
      <div className="flex flex-col sm:flex-row items-center gap-4 mt-6">
        <button
          onClick={handleDownload}
          disabled={!isReady}
          className="inline-flex items-center gap-2 bg-black dark:bg-white text-white dark:text-black px-4 py-2 rounded-lg text-sm font-semibold shadow-md hover:opacity-90 disabled:opacity-50 transition"
        >
          <Download className="w-4 h-4" />
          Download Receipt
        </button>

        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 text-sm font-medium text-brand hover:underline mt-2 sm:mt-0"
        >
          Go to Dashboard
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </main>
  );
}

function ReceiptDetail({
  label,
  value,
  monospace = false,
}: {
  label?: string;
  value?: string;
  monospace?: boolean;
}) {
  return (
    <div className="flex justify-between">
      <span className="text-gray-500 dark:text-gray-400">{label}:</span>
      <span className={monospace ? "font-mono break-all" : "text-right"}>
        {value}
      </span>
    </div>
  );
}

function ReceiptSkeleton() {
  return (
    <>
      <div className="animate-pulse flex flex-col items-center text-center mb-4">
        <div className="w-14 h-14 rounded-full bg-gray-300 dark:bg-gray-700 mb-2" />
        <div className="h-5 w-2/3 bg-gray-300 dark:bg-gray-700 rounded mb-1" />
        <div className="h-4 w-1/3 bg-gray-200 dark:bg-gray-600 rounded" />
      </div>
      <div className="space-y-4 text-sm">
        {Array.from({ length: 6 }).map((_, i) => (
          <div className="flex justify-between" key={i}>
            <div className="w-1/3 h-4 bg-gray-200 dark:bg-gray-700 rounded" />
            <div className="w-1/3 h-4 bg-gray-100 dark:bg-gray-600 rounded" />
          </div>
        ))}
      </div>
    </>
  );
}
