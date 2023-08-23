import MiniCreatePost from "@/components/miniCreatePost";
import PostFeed from "@/components/postFeed";
// import PostFeed from "@/components/PostFeed";
import { INFINITE_SCROLL_PAGINATION_RESULTS } from "@/config";
import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { notFound } from "next/navigation";

interface PageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params: { slug } }: PageProps) {
  // read route params

  return {
    title: `r/${slug}`,
  };
}

const page = async ({ params }: PageProps) => {
  const { slug } = params;

  const session = await getAuthSession();

  const subreddit = await db.subreddit.findFirst({
    where: { name: slug },
    include: {
      posts: {
        include: {
          author: true,
          votes: true,
          comments: true,
          subreddit: true,
        },
        orderBy: {
          createdAt: "desc",
        },
        take: INFINITE_SCROLL_PAGINATION_RESULTS,
      },
    },
  });

  if (!subreddit) return notFound();

  return (
    <>
      <h1 className="text-3xl font-bold md:text-4xl h-14">
        r/{subreddit.name}
      </h1>
      {session && <MiniCreatePost session={session} />}

      <PostFeed initialPosts={subreddit.posts} subredditName={subreddit.name} />
    </>
  );
};

export default page;
