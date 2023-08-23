import CustomFeed from "@/components/customFeed";
import GeneralFeed from "@/components/generalFeed";
import { buttonVariants } from "@/components/ui/Button";
import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { Home as HomeIcon } from "lucide-react";
import Link from "next/link";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

export default async function Home() {
  const communities =
    (await db.subreddit.findMany({ select: { name: true } })) || [];
  const session = await getAuthSession();
  let results;
  if (session) {
    results = await db.subscription.findMany({
      where: { userId: session?.user?.id },
      include: {
        subreddit: {
          select: { name: true },
        },
      },
    });
  }

  return (
    <>
      <h1 className="text-3xl font-bold md:text-4xl">Your feed</h1>
      <div className="grid grid-cols-1 py-6 md:grid-cols-3 gap-y-4 md:gap-x-4">
        {/* @ts-expect-error server component */}
        {session ? <CustomFeed /> : <GeneralFeed />}

        {/* subreddit info */}
        <div className="order-first overflow-hidden border border-gray-200 rounded-lg h-fit md:order-last">
          <div className="px-6 py-4 bg-sky-100">
            <p className="font-semibold py-3 flex items-center gap-1.5">
              <HomeIcon className="w-4 h-4" />
              Home
            </p>
          </div>
          <dl className="px-6 py-4 -my-3 text-sm leading-6 divide-y divide-gray-100">
            <div className="flex justify-between py-3 gap-x-4">
              <p className="text-zinc-500">
                Your personal Blueit frontpage. Come here to check in with your
                favorite communities.
              </p>
            </div>
            <div>
              <p className="font-bold ">Your communities</p>
              {!results && <p className=" text-zinc-500">No communities</p>}
              {results?.map((link) => {
                return (
                  <>
                    <Link
                      href={`r/${link.subreddit.name}`}
                      key={link.subreddit.name}
                      className="inline-block font-normal hover:underline decoration-sky-400 decoration-2"
                    >
                      r/ {link.subreddit.name}
                    </Link>
                    <br />
                  </>
                );
              })}
            </div>
            <div>
              <p className="font-bold ">Popular communities</p>

              {communities?.map((communitie) => {
                return (
                  <>
                    <Link
                      href={`r/${communitie.name}`}
                      key={communitie.name}
                      className="inline-block font-normal hover:underline decoration-sky-400 decoration-2"
                    >
                      r/ {communitie.name}
                    </Link>
                    <br />
                  </>
                );
              })}
            </div>
            <Link
              className={buttonVariants({
                className: "w-full mt-4 mb-6",
              })}
              href={`/r/create`}
            >
              Create Community
            </Link>
          </dl>
        </div>
      </div>
    </>
  );
}
