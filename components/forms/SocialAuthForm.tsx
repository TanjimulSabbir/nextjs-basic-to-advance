"use client";

import Image from "next/image";
import { signIn, signOut, useSession } from "next-auth/react";
import { toast } from "sonner";
import { Button } from "../ui/button";
import ROUTES from "@/constants/routes";

const SocialAuthForm = () => {
  const { data: session, status } = useSession();

  const buttonClass =
    "background-dark400_light900 body-medium text-dark200_light800 min-h-12 flex-1 rounded-2 px-4 py-3.5";

  const handleSignIn = async (provider: "github" | "google") => {
    try {
      await signIn(provider, {
        callbackUrl: ROUTES.HOME,
      });
    } catch (error) {
      toast.error("Sign-In Failed!", {
        description:
          error instanceof Error
            ? error.message
            : "An error occurred during sign in!",
      });
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut({
        callbackUrl: ROUTES.HOME,
      });
    } catch (error) {
      toast.error("Sign-Out Failed!", {
        description:
          error instanceof Error
            ? error.message
            : "An error occurred during sign out!",
      });
    }
  };

  return (
    <div className="mt-10 flex flex-wrap gap-2.5">
      {status === "authenticated" ? (
        <>
          <div className="flex items-center gap-3 px-4 py-2 rounded-lg border border-light-700 dark:border-dark-400">
            <Image
              src={session.user?.image || "/icons/user.svg"}
              alt="User Avatar"
              width={32}
              height={32}
              className="rounded-full object-cover"
            />
            <span className="font-medium text-dark200_light800">
              {session.user?.name || session.user?.email}
            </span>
          </div>

          <Button className={buttonClass} onClick={handleSignOut}>
            Log Out
          </Button>
        </>
      ) : (
        <>
          <Button
            className={buttonClass}
            onClick={() => handleSignIn("github")}
          >
            <Image
              src="/icons/github.svg"
              alt="Github Logo"
              width={20}
              height={20}
              className="invert-colors mr-2.5 object-contain"
            />
            <span>Log in with GitHub</span>
          </Button>

          <Button
            className={buttonClass}
            onClick={() => handleSignIn("google")}
          >
            <Image
              src="/icons/google.svg"
              alt="Google Logo"
              width={20}
              height={20}
              className="invert-colors mr-2.5 object-contain"
            />
            <span>Log in with Google</span>
          </Button>
        </>
      )}
    </div>
  );
};

export default SocialAuthForm;
