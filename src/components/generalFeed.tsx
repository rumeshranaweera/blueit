import { db } from "@/lib/db";
import { INFINITE_SCROLL_PAGINATION_RESULTS } from "@/config";
import PostFeed from "./postFeed";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

const GeneralFeed = async () => {
  try {
    const posts = await db.post.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        votes: true,
        author: true,
        comments: true,
        subreddit: true,
      },
      take: INFINITE_SCROLL_PAGINATION_RESULTS, // 4 to demonstrate infinite scroll, should be higher in production
    });
    return <PostFeed initialPosts={posts} />;
  } catch (error) {
    toast({
      title: "Error",
      description: "something went wrong",
      variant: "destructive",
    });
  }
};

export default GeneralFeed;
