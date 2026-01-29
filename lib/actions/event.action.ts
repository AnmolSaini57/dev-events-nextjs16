"use server";
import Event from "@/database/event.model";
import connectDB from "../mongodb";

export const getEvents = async () => {
  try {
    await connectDB();
    const events = await Event.find().sort({ createdAt: -1 }).lean();
    return events;
  } catch {
    return [];
  }
};

export const getEventBySlug = async (slug: string) => {
  try {
    await connectDB();
    const sanitizedSlug = slug.trim().toLowerCase();
    const event = await Event.findOne({ slug: sanitizedSlug }).lean();
    return event;
  } catch {
    return null;
  }
};

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
