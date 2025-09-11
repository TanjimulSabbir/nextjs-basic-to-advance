import { Button } from "@/components/ui/button";
import ROUTES from "@/constants/routes";
import Link from "next/link";

export default function Home() {
  return (
    <div className="">
      <h1 className="h1-bold text-dark100_light900">All Questions</h1>
      <Button
        className="primary-gradient min-h-[46px] px-4 py-3 !text-light-900"
        asChild
      >
        <Link href={ROUTES.ASK_QUESTION} className="max-sm:w-full">
          Ask a Question
        </Link>
      </Button>
    </div>
  );
}
