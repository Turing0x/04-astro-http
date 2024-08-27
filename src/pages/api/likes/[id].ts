import type { APIRoute } from "astro";
import { db, eq, Likes } from "astro:db";

export const prerender = false;

export const GET: APIRoute = async ({ params, request }) => {
  const postId = params.id;
  const likes = await db
    .select()
    .from(Likes)
    .where(eq(Likes.id, postId!));

  if (likes.length === 0) {
    return new Response("This post doesn't have any likes yet", {
      status: 404,
      headers: { "content-type": "aplication/json" },
    });
  }

  return new Response(JSON.stringify({ likes: likes[0].counter }), {
    headers: { "content-type": "aplication/json" },
  });
};

export const PUT: APIRoute = async ({ params, request }) => {
  const postId = params.id;
  const likes = await db
    .select()
    .from(Likes)
    .where(eq(Likes.id, postId!));

  if (likes.length === 0) {
    await db.insert(Likes).values({ post: postId!, counter: 1 });
    return new Response(
      JSON.stringify({ text: "The like has been added" }),
      {
        headers: {
          "content-type": "application/json",
        },
      }
    );
  }

  await db
    .update(Likes)
    .set({ counter: likes[0].counter + 1 })
    .where(eq(Likes.id, postId!));

  return new Response(
    JSON.stringify({ text: "The like has been added" }),
    {
      headers: {
        "content-type": "application/json",
      },
    }
  );
};
