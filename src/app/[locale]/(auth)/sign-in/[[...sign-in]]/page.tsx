import Image from "next/image";
import { Loader2 } from "lucide-react";
import { SignIn, ClerkLoaded, ClerkLoading } from "@clerk/nextjs";
import { useLocale } from "next-intl";

export default function Page() {
  const locale = useLocale();
  const path = locale === "vn" ? "/vn/sign-in" : "/en/sign-in";
  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      <div className="h-full lg:flex flex-col items-center justify-center px-4">
        <div className="flex items-center justify-center mt-8">
          <ClerkLoaded>
            <SignIn path={path} />
          </ClerkLoaded>
          <ClerkLoading>
            <Loader2 className="animate-spin text-muted-foreground"/>
          </ClerkLoading>
        </div>
      </div>
      <div className="h-full bg-blue-600 hidden lg:flex items-center justify-center">
        <Image src="/logo.svg" height={150} width={150} alt="logo"/>
      </div>
    </div>
  );
}