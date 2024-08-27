import type { APIRoute } from "astro";
import { Clients, db, eq } from "astro:db";
import CustomResponse from "../../../utils/resp.util";

export const prerender = false;

export const GET: APIRoute = async ({ params, request }) => {
  const clients = await db.select().from(Clients);
  return CustomResponse(clients);
};

export const POST: APIRoute = async ({ params, request }) => {
  const body = await request.json();
  const { id, name, age, isActive } = body;

  const clients = await db
    .insert(Clients)
    .values([{ id, name, age, isActive }]);

  if (clients.rowsAffected === 0)
    return CustomResponse({ text: "Client not created" }, 400);

  return CustomResponse({ text: "The client was created" });
};

export const PUT: APIRoute = async ({ params, request }) => {
  const clients = await db.select().from(Clients);
  return CustomResponse(clients);
};
