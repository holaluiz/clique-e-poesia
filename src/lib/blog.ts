import { supabase } from "./supabase";

export type PostStatus = "draft" | "published";

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  location: string | null;
  excerpt: string | null;
  cover_url: string | null;
  content: string;
  status: PostStatus;
  published_at: string | null;
  category_ids: string[];
  tags: string[];
  seo_title: string | null;
  seo_description: string | null;
  created_at: string;
  updated_at: string;
}

export type BlogPostDraft = Pick<
  BlogPost,
  | "slug"
  | "title"
  | "location"
  | "excerpt"
  | "cover_url"
  | "content"
  | "status"
  | "published_at"
  | "category_ids"
  | "tags"
  | "seo_title"
  | "seo_description"
>;

export interface BlogCategory {
  id: string;
  name: string;
  slug: string;
}

/** Limites recomendados para o Google não cortar o título e a descrição. */
export const SEO_TITLE_LIMIT = 60;
export const SEO_DESCRIPTION_LIMIT = 160;

const LIST_COLUMNS =
  "id, slug, title, location, excerpt, cover_url, status, published_at, category_ids, tags, created_at, updated_at";
const IMAGE_BUCKET = "blog";
const MAX_IMAGE_SIDE = 2000;

function client() {
  if (!supabase) throw new Error("O blog ainda não está conectado ao Supabase.");
  return supabase;
}

export async function listPublishedPosts(limit?: number) {
  let query = client()
    .from("posts")
    .select(LIST_COLUMNS)
    .eq("status", "published")
    .order("published_at", { ascending: false });
  if (limit) query = query.limit(limit);
  const { data, error } = await query;
  if (error) throw error;
  return data as Omit<BlogPost, "content">[];
}

/** Para o administrador: rascunhos e publicados (as regras do banco só liberam isso para quem é admin). */
export async function listAllPosts() {
  const { data, error } = await client().from("posts").select(LIST_COLUMNS).order("updated_at", { ascending: false });
  if (error) throw error;
  return data as Omit<BlogPost, "content">[];
}

export async function getPostBySlug(slug: string) {
  const { data, error } = await client().from("posts").select("*").eq("slug", slug).maybeSingle();
  if (error) throw error;
  return data as BlogPost | null;
}

export async function getPostById(id: string) {
  const { data, error } = await client().from("posts").select("*").eq("id", id).single();
  if (error) throw error;
  return data as BlogPost;
}

export async function savePost(id: string | null, post: BlogPostDraft) {
  const query = id
    ? client().from("posts").update(post).eq("id", id)
    : client().from("posts").insert(post);
  const { data, error } = await query.select("*").single();
  if (error) throw error;
  return data as BlogPost;
}

export async function deletePost(id: string) {
  const { error } = await client().from("posts").delete().eq("id", id);
  if (error) throw error;
}

export async function listCategories() {
  const { data, error } = await client().from("blog_categories").select("id, name, slug").order("name");
  if (error) throw error;
  return data as BlogCategory[];
}

export async function saveCategory(id: string | null, name: string) {
  const category = { name: name.trim(), slug: slugify(name) };
  const query = id
    ? client().from("blog_categories").update(category).eq("id", id)
    : client().from("blog_categories").insert(category);
  const { data, error } = await query.select("id, name, slug").single();
  if (error) throw error;
  return data as BlogCategory;
}

export async function deleteCategory(id: string) {
  const { error } = await client().from("blog_categories").delete().eq("id", id);
  if (error) throw error;
}

export async function isBlogAdmin() {
  const { data, error } = await client().rpc("is_blog_admin");
  if (error) throw error;
  return data === true;
}

/** Reduz fotos grandes da câmera para no máximo 2000px em WebP antes de enviar. */
async function resizeImage(file: File): Promise<Blob> {
  if (file.type === "image/gif" || file.type === "image/svg+xml") return file;
  const bitmap = await createImageBitmap(file);
  const scale = Math.min(1, MAX_IMAGE_SIDE / Math.max(bitmap.width, bitmap.height));
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(bitmap.width * scale);
  canvas.height = Math.round(bitmap.height * scale);
  canvas.getContext("2d")!.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
  bitmap.close();
  return new Promise((resolve, reject) =>
    canvas.toBlob((blob) => (blob ? resolve(blob) : reject(new Error("Não foi possível processar a imagem."))), "image/webp", 0.85),
  );
}

async function uploadBlob(blob: Blob, fileName: string, extension: string) {
  const baseName = slugify(fileName.replace(/\.[^.]+$/, "")) || "imagem";
  const path = `${new Date().getFullYear()}/${crypto.randomUUID().slice(0, 8)}-${baseName}.${extension}`;
  const storage = client().storage.from(IMAGE_BUCKET);
  const { error } = await storage.upload(path, blob, { contentType: blob.type, cacheControl: "31536000" });
  if (error) throw error;
  return storage.getPublicUrl(path).data.publicUrl;
}

export async function uploadImage(file: File) {
  const blob = await resizeImage(file);
  const extension = blob.type === "image/webp" ? "webp" : file.name.split(".").pop()?.toLowerCase() || "jpg";
  return uploadBlob(blob, file.name, extension);
}

/** Tamanho padrão das capas do blog. */
export const COVER_SIZE = { width: 1000, height: 663 } as const;

/** Recorta a área escolhida da foto e salva a capa exatamente em 1000×663. */
export async function uploadCover(file: File, area: { x: number; y: number; width: number; height: number }) {
  const bitmap = await createImageBitmap(file);
  const canvas = document.createElement("canvas");
  canvas.width = COVER_SIZE.width;
  canvas.height = COVER_SIZE.height;
  const context = canvas.getContext("2d")!;
  context.imageSmoothingQuality = "high";
  context.drawImage(bitmap, area.x, area.y, area.width, area.height, 0, 0, COVER_SIZE.width, COVER_SIZE.height);
  bitmap.close();
  const blob = await new Promise<Blob>((resolve, reject) =>
    canvas.toBlob((result) => (result ? resolve(result) : reject(new Error("Não foi possível processar a capa."))), "image/webp", 0.9),
  );
  return uploadBlob(blob, `capa-${file.name}`, "webp");
}

export function slugify(text: string) {
  return text
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

export function formatPostDate(date: string | null) {
  if (!date) return "";
  return new Date(date).toLocaleDateString("pt-BR", { day: "numeric", month: "long", year: "numeric" });
}
