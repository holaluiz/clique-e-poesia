import { createClient, type SupabaseClient } from "@supabase/supabase-js";

// Projeto "clique-e-poesia" no Supabase. A chave publicável é pública por natureza (vai para o navegador
// de todo visitante): quem protege os dados são as regras (RLS) do banco. Variáveis de ambiente, se
// definidas, têm prioridade — útil para apontar para outro projeto em testes.
const url = (import.meta.env.VITE_SUPABASE_URL as string | undefined) || "https://epgrrmieydprnpzqwonp.supabase.co";
const key =
  (import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string | undefined) || "sb_publishable_hUrqAh1UOI3QI8AnaMcOKg_6Ods-Wdc";

export const supabase: SupabaseClient | null = url && key ? createClient(url, key) : null;
