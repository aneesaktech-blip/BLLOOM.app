import clientPromise from "@/lib/mongodb";

export async function GET() {
  const client = await clientPromise;
  const db = client.db("bloom");

  await db.collection("test").insertOne({ name: "Bloom is working 🌸" });

  return Response.json({ message: "Connected successfully!" });
}
