import { NextRequest, NextResponse } from "next/server";
import Event, { IEvent } from "@/database/event.model";
import connectDB from "@/lib/mongodb";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
): Promise<NextResponse> {
  try {
    await connectDB();

    const { slug } = await params;

    if (!slug || typeof slug !== "string" || slug.trim() === "") {
      return NextResponse.json(
        { message: "Invalid or missing slug parameter" },
        { status: 400 },
      );
    }

    const sanitizedSlug = slug.trim().toLowerCase();

    const event: IEvent = await Event.findOne({ slug: sanitizedSlug }).lean();

    if (!event) {
      return NextResponse.json({ message: "Event not found" }, { status: 404 });
    }

    return NextResponse.json(
      {
        message: "Event fetched successfully",
        event,
      },
      { status: 200 },
    );
  } catch (e) {
    console.log(e);
    return NextResponse.json(
      {
        message: "Failed to fetch event",
        error: e instanceof Error ? e.message : "Unknown Error",
      },
      { status: 500 },
    );
  }
}
