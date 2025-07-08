import Image from "next/image";

export default function Logo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <Image
        src="/logo.png" // or use a PNG like /logo.png
        alt="Flaamo Logo"
        width={64}
        height={64}
        priority
      />
    </div>
  );
}
