import { format, subDays } from "date-fns";
import supabase from "./supabase";

export async function updateOldBookingsToPast() {
  const now = new Date().toISOString().slice(0, 10);

  const { error } = await supabase
    .from("bookings")
    .update({ status: "past" })
    .lt("date", now)
    .in("status", ["upcoming", "ongoing"]);

  if (error) throw new Error(error.message);
}

export async function getBookings({ tFilter, tSort, tPage }) {
  let query = supabase
    .from("bookings")
    .select(
      "id, date, rating, status, mitra:mId(firstName, avatar), vruddhas:vId(firstName)",
      { count: "exact" }
    );

  if (tFilter === "pending review") query = query.is("review", null);
  else if (tFilter !== "all") query = query.eq("status", tFilter);

  if (tSort === "oldest first") {
    query = query.order("date", { ascending: false });
  } else if (tSort === "latest first") {
    query = query.order("date", { ascending: true });
  } else if (tSort === "low rating first") {
    query = query.order("rating", { ascending: true });
  } else if (tSort === "high rating first") {
    query = query.order("rating", { ascending: false });
  }

  if (tPage) query = query.range(tPage * 10 - 10, tPage * 10 - 1);

  const { data: bookings, error, count } = await query;
  if (error) throw new Error(error.message);

  return { bookings, count };
}

export async function getBooking({
  id,
  tFilter = "all",
  tSort = "oldest first",
}) {
  let query = supabase
    .from("bookings")
    .select("*, mitra:mId(*), vruddha:vId(firstName)")
    .eq("id", id);

  if (tFilter === "pending review") query = query.is("review", null);
  else if (tFilter !== "all") query = query.eq("status", tFilter);

  if (tSort === "oldest first") {
    query = query.order("date", { ascending: false });
  } else if (tSort === "latest first") {
    query = query.order("date", { ascending: true });
  } else if (tSort === "low rating first") {
    query = query.order("rating", { ascending: true });
  } else if (tSort === "high rating first") {
    query = query.order("rating", { ascending: false });
  }

  const { data, error } = await query;

  if (error) throw new Error(error.message);
  return data;
}

export async function getBookingsByVruddha({
  vId,
  tFilter = "all",
  tSort = "a-z",
}) {
  const now = new Date().toISOString().slice(0, 10);

  await supabase
    .from("bookings")
    .update({ status: "past" })
    .lt("date", now)
    .eq("vId", vId)
    .in("status", ["upcoming", "ongoing"]);

  let query = supabase
    .from("bookings")
    .select(
      "id, date, rating, status, mitra:mId(firstName, avatar), vruddhas:vId(firstName)",
      { count: "exact" }
    )
    .eq("vId", vId);

  if (tFilter === "pending review") query = query.is("review", null);
  else if (tFilter !== "all") query = query.eq("status", tFilter);

  if (tSort === "oldest first") {
    query = query.order("date", { ascending: false });
  } else if (tSort === "latest first") {
    query = query.order("date", { ascending: true });
  } else if (tSort === "low rating first") {
    query = query.order("rating", { ascending: false });
  } else if (tSort === "high rating first") {
    query = query.order("rating", { ascending: true });
  }

  const { data: bookings, error, count } = await query;
  if (error) throw new Error(error.message);

  return { bookings, count };
}

export async function sendReview({ id, review, rating }) {
  const { data, error } = await supabase
    .from("bookings")
    .update({ review, rating })
    .eq("id", id)
    .select()
    .single();

  if (error) throw new Error(error.message);

  const mId = data.mId;

  const { data: nReviews, error: nReviewsError } = await supabase
    .from("bookings")
    .select("rating")
    .eq("mId", mId)
    .eq("status", "past");

  if (nReviewsError) throw new Error(nReviewsError.message);

  const validRatings = nReviews.filter((r) => typeof r.rating === "number");
  const total = validRatings.reduce((acc, r) => acc + r.rating, 0);
  const avgRating = validRatings.length > 0 ? total / validRatings.length : 0;

  const { error: updateError } = await supabase
    .from("mitra")
    .update({ ratings: avgRating })
    .eq("id", mId);

  if (updateError) throw new Error(updateError.message);

  return null;
}

export async function changeStatus({ newStatus, id }) {
  const { data: updatedBooking, error } = await supabase
    .from("bookings")
    .update({ status: newStatus })
    .eq("id", id)
    .select();

  if (error) throw new Error(error.message);

  const { data: vData, error: vError } = await supabase
    .from("bookings")
    .select("*, mitra:mId(*), vruddha:vId(firstName, visits)")
    .eq("id", id);

  if (vError) throw new Error(vError.message);

  const vId = updatedBooking?.[0]?.vId;
  const visits = vData?.[0]?.vruddha?.visits;

  if (vId) {
    const newVruddhaStatus = newStatus === "ongoing" ? "occupied" : "idle";
    await changeVruddhaStatus({ vId, newVruddhaStatus, visits });
  }

  return updatedBooking;
}

async function changeVruddhaStatus({ vId, newVruddhaStatus, visits }) {
  if (newVruddhaStatus === "idle") visits += 1;

  const { data, error } = await supabase
    .from("vruddhas")
    .update({ currentStatus: newVruddhaStatus, visits })
    .eq("id", vId);

  if (error) throw new Error(error.message);
  return data;
}

export async function getTodaysBookings(date) {
  const today = format(date, "yyyy-MM-dd");

  const { data, error } = await supabase
    .from("bookings")
    .select("*, vruddhas:vId(firstName), mitra:mId(firstName)")
    .eq("date", today)
    .in("status", ["upcoming", "ongoing"]);

  if (error) throw new Error(error.message);
  return data;
}

export async function getPastDaysBookings(day) {
  const today = new Date();

  const fromDate = format(subDays(today, Number(day)), "yyyy-MM-dd");

  const { data, error } = await supabase
    .from("bookings")
    .select("*")
    .gte("date", fromDate);

  if (error) {
    console.error("Error fetching bookings:", error);
    throw new Error(error.message);
  }

  return data;
}
