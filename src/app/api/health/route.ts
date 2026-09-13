export const dynamic = "force-dynamic";

export async function GET() {
  return Response.json({
    ok: true,
    app: "TheraFlow demo",
    dataMode: "browser-local dummy data",
    timestamp: new Date().toISOString(),
  });
}
