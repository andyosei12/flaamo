import Image from "next/image";
import logo from "@/public/logo.png"; // adjust path if needed

type AuthLoaderProps = {
  title: string;
};

const AuthLoader = ({ title }: AuthLoaderProps) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background px-4">
      {/* Logo + Spinner container */}
      <div className="relative w-20 h-20 flex items-center justify-center">
        {/* Spinning ring */}
        <div className="absolute inset-0 rounded-full border-4 border-orange-500 border-t-transparent animate-spin" />

        {/* Logo */}
        <div className="relative w-10 h-10">
          <Image
            src={logo}
            alt="Flaamo logo"
            fill
            className="object-contain"
            priority
          />
        </div>
      </div>

      {/* Text below */}
      <p className="mt-6 text-sm text-muted-foreground text-center">{title}</p>
    </div>
  );
};

export default AuthLoader;
