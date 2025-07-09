// components/dashboard/logo.tsx
"use client";

import Image from "next/image";
import Link from "next/link";

export const Logo = () => {
  return (
    <Link href="/dashboard" className="block w-fit">
      {/* Light mode logo */}
      <Image
        src="/logo-light.png"
        alt="Flaamo logo"
        width={100}
        height={40}
        className="block dark:hidden"
        priority
      />

      {/* Dark mode logo */}
      <Image
        src="/logo-dark.png"
        alt="Flaamo dark logo"
        width={130}
        height={40}
        className="hidden dark:block"
        priority
      />
    </Link>
  );
};
