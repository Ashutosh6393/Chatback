import { type NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { agentId, name, size, type, url } = body;

  if (!agentId || !name || !size || !type || !url) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }

  try {
    await db.docs.create({
      data: { agentId, name, size, type, url },
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error saving file:", error);
    return NextResponse.json({ error: "Failed to save file" }, { status: 500 });
  }
}
