export default function CustomResponse(value: any, status?: number) {
  return new Response(JSON.stringify(value), {
    status: status ?? 200,
    headers: {
      "content-type": "application/json",
    },
  });
}
