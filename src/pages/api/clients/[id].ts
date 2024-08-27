import type { APIRoute } from "astro";
import { db, Clients, eq } from "astro:db";
import CustomResponse from "../../../utils/resp.util";

export const prerender = false;

export const GET: APIRoute = async ({ params, request }) => {
  const client = await db
    .select()
    .from(Clients)
    .where(eq(Clients.id, +params.id!));

  if (client.length === 0)
    CustomResponse({ text: "Client not found" }, 404);

  return CustomResponse(client);
};

export const DELETE: APIRoute = async ({ params, request }) => {
  const clients = await db
    .delete(Clients)
    .where(eq(Clients.id, +params.id!));

  if (clients.rowsAffected === 0)
    CustomResponse({ text: "Client not deleted" }, 404);

  return CustomResponse({ text: "The client was deleted" });
};
