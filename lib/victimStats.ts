import { supabase } from "@/lib/supabase";

export async function registerView(victimId: string) {
  const { data } = await supabase
    .from("victim_stats")
    .select("view_count")
    .eq("victim_id", victimId)
    .single();

  if (!data) {
    await supabase.from("victim_stats").insert({
      victim_id: victimId,
      view_count: 1,
      like_count: 0,
    });
    return 1;
  }

  const newCount = data.view_count + 1;

  await supabase
    .from("victim_stats")
    .update({ view_count: newCount })
    .eq("victim_id", victimId);

  return newCount;
}

export async function registerLike(victimId: string) {
  const { data } = await supabase
    .from("victim_stats")
    .select("like_count")
    .eq("victim_id", victimId)
    .single();

  if (!data) {
    await supabase.from("victim_stats").insert({
      victim_id: victimId,
      view_count: 0,
      like_count: 1,
    });
    return 1;
  }

  const newCount = data.like_count + 1;

  await supabase
    .from("victim_stats")
    .update({ like_count: newCount })
    .eq("victim_id", victimId);

  return newCount;
}

export async function getMemoCount(victimId: string) {
  const { count } = await supabase
    .from("victim_memos")
    .select("*", { count: "exact", head: true })
    .eq("victim_id", victimId)
    .eq("status", "approved");

  return count ?? 0;
}

function passesBasicSpamFilter(text: string) {
  const clean = text.trim();

  if (!clean) return false;
  if (clean.length < 2 || clean.length > 50) return false;

  const lower = clean.toLowerCase();

  const bannedPatterns = [
    "http://",
    "https://",
    "www.",
    ".com",
    ".net",
    ".org",
    "@",
  ];

  if (bannedPatterns.some((item) => lower.includes(item))) return false;

  if (/(.)\1{5,}/.test(clean)) return false;

  const specialCount =
    (clean.match(/[^a-zA-Z0-9\u0600-\u06FF\s]/g) || []).length;

  if (specialCount > 10) return false;

  return true;
}

export async function getApprovedMemos(victimId: string) {
  const { data, error } = await supabase
    .from("victim_memos")
    .select("id, memo_text, created_at")
    .eq("victim_id", victimId)
    .eq("status", "approved")
    .order("created_at", { ascending: false });

  if (error) return [];
  return data ?? [];
}

export async function submitMemo(victimId: string, memoText: string) {
  const clean = memoText.trim();

  if (!passesBasicSpamFilter(clean)) {
    return { ok: false, reason: "spam" };
  }

  const { error } = await supabase.from("victim_memos").insert({
    victim_id: victimId,
    memo_text: clean,
    status: "pending",
  });

  if (error) {
    return { ok: false, reason: "db" };
  }

  return { ok: true };
}

export async function getStats(victimId: string) {
  const { data } = await supabase
    .from("victim_stats")
    .select("view_count, like_count")
    .eq("victim_id", victimId)
    .single();

  const memo_count = await getMemoCount(victimId);

  return {
    view_count: data?.view_count ?? 0,
    like_count: data?.like_count ?? 0,
    memo_count,
  };
}