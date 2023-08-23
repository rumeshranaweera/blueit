import { Icons } from "@/components/icons";
import UserAuthForm from "@/components/userAuthForm";
import Link from "next/link";

const SignUp = () => {
  return (
    <div className="container mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[400px]">
      <div className="flex flex-col space-y-2 text-center">
        <Icons.logo className="w-10 h-10 mx-auto" />
        <h1 className="text-2xl font-semibold tracking-tight">Sign Up</h1>
        <p className="max-w-xs mx-auto text-sm">
          By continuing, you are setting up a Blueit account and agree to our
          User Agreement and Privacy Policy.
        </p>
      </div>
      <UserAuthForm />
      <p className="px-8 text-sm text-center text-muted-foreground">
        already have an account?{" "}
        <Link
          replace
          href="/sign-in"
          className="text-sm underline hover:text-brand underline-offset-4"
        >
          Sign In
        </Link>
      </p>
    </div>
  );
};

export default SignUp;
