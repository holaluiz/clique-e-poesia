// Fica fora de lib/blog para que quem só formata datas não puxe o cliente do Supabase.
export function formatPostDate(date: string | null) {
  if (!date) return "";
  return new Date(date).toLocaleDateString("pt-BR", { day: "numeric", month: "long", year: "numeric" });
}
