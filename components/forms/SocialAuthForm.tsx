"use client";

import Image from "next/image";
import { signIn, signOut, useSession } from "next-auth/react";
import React from "react";
import ROUTES from "@/constants/routes";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { redirect } from "next/dist/server/api-utils";

const SocialAuthForm = () => {
  const buttonClass =
    "background-dark400_light900 body-medium text-dark200_light800 min-h-12 flex-1 rounded-2 px-4 py-3.5";
  const { data: session, status } = useSession();

  const handleSignIn = async (provider: "github" | "google") => {
    try {
      await signIn(provider, { callbackUrl: ROUTES.HOME, redirect: false });
    } catch (error) {
      toast.error("Sign-In Failed!", {
        description:
          error instanceof Error
            ? error.message
            : "An error occurred during sign in!",
      });
    }
  };
  console.log(session,"session");
  
  return (
    <div className="mt-10 flex flex-wrap gap-2.5">
      {status !== "authenticated" ? (
        <Button className={buttonClass} onClick={() => handleSignIn("github")}>
          <Image
            src="/icons/github.svg"
            alt="Github Logo"
            width={20}
            height={20}
            className="invert-colors mr-2.5 object-contain"
          />
          <span>Log in with GitHub</span>
        </Button>
      ) : (
        <Button
          className={buttonClass}
          onClick={() => signOut({ redirect: false })}
        >
          <span>Log Out</span>
        </Button>
      )}

      <Button className={buttonClass} onClick={() => handleSignIn("google")}>
        <Image
          src={session?.user?.image || "/icons/google.svg"}
          alt="Google Logo"
          width={20}
          height={20}
          className={session?.user?.image ? "rounded-full w-10 h-10" : "invert-colors mr-2.5 object-contain"}
        />
        <span>{session?.user?.name || "Log in with Google"}</span>
      </Button>
    </div>
  );
};

export default SocialAuthForm;
