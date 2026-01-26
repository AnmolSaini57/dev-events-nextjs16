"use server";
import Event from "@/database/event.model";
import connectDB from "../mongodb";

export const getSimilarEventsBySlug = async (slug: string) => {
  try {
    await connectDB();

    const event = await Event.findOne({ slug });
    console.log("Event Found for Similarity Check:", event);
    const similarEvents = await Event.find({
      _id: { $ne: event._id },
      tags: { $in: event.tags },
    }).lean();

    console.log("Similar Events Fetched:", similarEvents);

    return similarEvents;
  } catch {
    return [];
  }
};
