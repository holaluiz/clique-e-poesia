import os
import re
import io
import json
import urllib.request
import urllib.error
from concurrent.futures import ThreadPoolExecutor, as_completed
from PIL import Image, ImageOps

ACCOUNT_ID = os.getenv("CLOUDFLARE_ACCOUNT_ID", "0b85653a3fda604ea469fb2723afa5cb")
API_TOKEN = os.getenv("CLOUDFLARE_API_TOKEN", "")
BUCKET = "umcaracaramelo"
CDN_BASE = "https://media.umcaracaramelo.com.br"
MANIFEST_FILE = "tmp/r2_sync_manifest.json"

PROJECTS_CONFIG = [
    {
        "folder": "ALDEAZENCHALES",
        "id": "aldea-zen",
        "title": "Aldea Zen Chalés",
        "category": "hospedagem",
        "categoryLabel": "Hospedagens & Chalés",
        "description": "Ensaio imersivo de experiência de hospedagem. Registramos a arquitetura acolhedora, a luz da montanha e a sensação real de desacelerar.",
        "location": "Serra da Mantiqueira, SP",
        "year": "2024",
        "alt_prefix": "Chalé e acolhimento na Mantiqueira",
        "max_photos": 33
    },
    {
        "folder": "CASAMENTO THALITA",
        "id": "casamento-thalita",
        "title": "Casamento Thalita",
        "category": "casamentos",
        "categoryLabel": "Casamentos & Casais",
        "description": "Casamento intimista ao ar livre. Foco absoluto na verdade do momento, nas trocas de olhar espontâneas e na poesia de um dia inesquecível.",
        "location": "Celebração ao Ar Livre",
        "year": "2024",
        "alt_prefix": "Emoções e poesia no casamento ao ar livre",
        "max_photos": 9
    },
    {
        "folder": "ANIVERSÁRIO GABRIELA - 15 ANOS",
        "id": "aniversario-gabriela",
        "title": "Aniversário Gabriela — 15 Anos",
        "category": "casamentos",
        "categoryLabel": "Celebrações & 15 Anos",
        "description": "A emoção e a energia vibrante de uma celebração única de 15 anos, capturando cada abraço, dança e sorriso genuíno.",
        "location": "Festa & Celebração",
        "year": "2023",
        "alt_prefix": "Celebração e espontaneidade de 15 anos",
        "max_photos": 32
    },
    {
        "folder": "ENSAIO VITÓRIA E THALLES",
        "id": "vitoria-e-thalles",
        "title": "Ensaio Vitória e Thalles",
        "category": "casamentos",
        "categoryLabel": "Casamentos & Casais",
        "description": "Conexão genuína, cumplicidade e luz natural em um ensaio pré-wedding poético e espontâneo.",
        "location": "Ensaio ao Pôr do Sol",
        "year": "2023",
        "alt_prefix": "Afeto e cumplicidade na luz natural",
        "max_photos": 33
    },
    {
        "folder": "JOSUÉ",
        "id": "josue",
        "title": "Ensaio Josué",
        "category": "casamentos",
        "categoryLabel": "Ensaios & Retratos",
        "description": "Retratos expressivos com linguagem cinematográfica, jogos de sombras e sensibilidade autoral.",
        "location": "Sessão Autoral",
        "year": "2023",
        "alt_prefix": "Expressão e sensibilidade autoral",
        "max_photos": 17
    },
    {
        "folder": "Degust",
        "id": "degust",
        "title": "Degust Gastronomia",
        "category": "gastronomia",
        "categoryLabel": "Gastronomia & Experiências",
        "description": "Fotografia gastronômica focada em texturas, cores vivas e o cuidado artesanal de cada prato.",
        "location": "Restaurante Contemporâneo",
        "year": "2024",
        "alt_prefix": "Pratos artesanais e texturas contemporâneas",
        "max_photos": 7
    },
    {
        "folder": "ENSAIO OCA PIZZERIA",
        "id": "oca-pizzeria",
        "title": "Oca Pizzeria Artesanal",
        "category": "gastronomia",
        "categoryLabel": "Gastronomia & Experiências",
        "description": "A magia da massa fermentada, o forno a lenha e a atmosfera acolhedora de uma pizzaria autêntica.",
        "location": "Pizzaria Artesanal",
        "year": "2024",
        "alt_prefix": "Pizzas artesanais ao forno a lenha",
        "max_photos": 10
    },
    {
        "folder": "NONA BURGUER",
        "id": "nona-burguer",
        "title": "Nona Burguer",
        "category": "gastronomia",
        "categoryLabel": "Gastronomia & Experiências",
        "description": "Fotografia comercial de alta energia: suculência, identidade marcante e sabor que salta aos olhos.",
        "location": "Hamburgueria Artesanal",
        "year": "2024",
        "alt_prefix": "Hamburgueria artesanal de alta energia",
        "max_photos": 14
    },
    {
        "folder": "NOTARI",
        "id": "notari",
        "title": "Notari Drinks & Gastronomia",
        "category": "gastronomia",
        "categoryLabel": "Gastronomia & Experiências",
        "description": "Coquetelaria autoral, ambiente sofisticado e detalhes refinados capturados na luz ambiente ideal.",
        "location": "Bar & Gastronomia",
        "year": "2024",
        "alt_prefix": "Coquetéis autorais e gastronomia refinada",
        "max_photos": 24
    },
    {
        "folder": "PEPÉ SANTOS",
        "id": "pepe-santos",
        "title": "Pepé Santos no Palco",
        "category": "shows",
        "categoryLabel": "Música & Shows",
        "description": "Energia pulsante da música ao vivo: iluminação dramática, expressividade e o ápice de cada solo.",
        "location": "Show ao Vivo",
        "year": "2023",
        "alt_prefix": "Solos vibrantes e iluminação de palco",
        "max_photos": 20
    },
    {
        "folder": "SAM MARIZ SHOW FORRÓ 2022",
        "id": "sam-mariz",
        "title": "Sam Mariz — Show Forró 2022",
        "category": "shows",
        "categoryLabel": "Música & Shows",
        "description": "A alegria contagiante do forró, o movimento da dança e a vibração do público em uma noite inesquecível.",
        "location": "Festival de Forró",
        "year": "2022",
        "alt_prefix": "Sanfona, forró e celebração do público",
        "max_photos": 27
    },
    {
        "folder": "SHOW DO LEE ROBERT",
        "id": "lee-robert",
        "title": "Show do Lee Robert",
        "category": "shows",
        "categoryLabel": "Música & Shows",
        "description": "Presença de palco magnética e emoção pura, documentadas em enquadramentos dinâmicos e calorosos.",
        "location": "Turnê Musical",
        "year": "2023",
        "alt_prefix": "Presença de palco e emoção ao vivo",
        "max_photos": 29
    }
]

def sanitize_name(name: str) -> str:
    base = os.path.splitext(name)[0]
    base = re.sub(r'[^a-zA-Z0-9_\-]+', '-', base).strip('-').lower()
    return base or "photo"

def upload_to_r2(key: str, data: bytes) -> bool:
    url = f"https://api.cloudflare.com/client/v4/accounts/{ACCOUNT_ID}/r2/buckets/{BUCKET}/objects/{key}"
    req = urllib.request.Request(
        url,
        data=data,
        headers={
            "Authorization": f"Bearer {API_TOKEN}",
            "Content-Type": "image/webp",
        },
        method="PUT"
    )
    try:
        with urllib.request.urlopen(req, timeout=30) as res:
            return res.status == 200
    except Exception as e:
        print(f"Error uploading {key}: {e}")
        return False

def check_exists_on_r2(key: str) -> bool:
    url = f"{CDN_BASE}/{key}"
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"}, method="HEAD")
    try:
        with urllib.request.urlopen(req, timeout=8) as res:
            return res.status == 200
    except urllib.error.HTTPError as e:
        return e.code == 200
    except Exception:
        return False

def process_and_upload_image(file_path: str, project_id: str, photo_index: int, total_in_proj: int):
    filename = os.path.basename(file_path)
    clean_name = sanitize_name(filename)
    if not clean_name:
        clean_name = f"img_{photo_index:03d}"

    key_full = f"clique-e-poesia/portfolio/{project_id}/{clean_name}.webp"
    key_thumb = f"clique-e-poesia/portfolio/{project_id}/thumbs/{clean_name}.webp"

    try:
        with Image.open(file_path) as im:
            im = ImageOps.exif_transpose(im)
            if im.mode != "RGB":
                im = im.convert("RGB")

            orig_w, orig_h = im.size

            # Full image (max 1600)
            im_full = im.copy()
            im_full.thumbnail((1600, 1600), Image.Resampling.LANCZOS)
            full_w, full_h = im_full.size
            buf_full = io.BytesIO()
            im_full.save(buf_full, format="WEBP", quality=83, method=4)
            data_full = buf_full.getvalue()

            # Thumb image (max 600)
            im_thumb = im.copy()
            im_thumb.thumbnail((600, 600), Image.Resampling.LANCZOS)
            buf_thumb = io.BytesIO()
            im_thumb.save(buf_thumb, format="WEBP", quality=76, method=4)
            data_thumb = buf_thumb.getvalue()

        # Orientation
        if full_w > full_h:
            orientation = "landscape"
        elif full_h > full_w:
            orientation = "portrait"
        else:
            orientation = "square"

        # Upload full
        ok_full = upload_to_r2(key_full, data_full)
        # Upload thumb
        ok_thumb = upload_to_r2(key_thumb, data_thumb)

        if not (ok_full and ok_thumb):
            print(f"Failed uploading {filename} ({project_id})")
            return None

        return {
            "file": filename,
            "project_id": project_id,
            "index": photo_index,
            "src": f"{CDN_BASE}/{key_full}",
            "thumbnail": f"{CDN_BASE}/{key_thumb}",
            "orientation": orientation,
            "width": full_w,
            "height": full_h,
            "size_kb": round(len(data_full) / 1024, 1)
        }

    except Exception as e:
        print(f"Error processing {file_path}: {e}")
        return None

def main():
    os.makedirs("tmp", exist_ok=True)
    manifest = {}
    if os.path.exists(MANIFEST_FILE):
        try:
            with open(MANIFEST_FILE, "r", encoding="utf-8") as f:
                manifest = json.load(f)
        except Exception:
            manifest = {}

    tasks = []
    base_dir = "portfolio"

    actual_dirs = [d for d in os.listdir(base_dir) if os.path.isdir(os.path.join(base_dir, d))]
    def resolve_dir(target_name):
        for d in actual_dirs:
            if d.lower() == target_name.lower():
                return os.path.join(base_dir, d)
        target_norm = re.sub(r'[^a-zA-Z0-9]', '', target_name).lower()
        for d in actual_dirs:
            d_norm = re.sub(r'[^a-zA-Z0-9]', '', d).lower()
            if target_norm and (target_norm in d_norm or d_norm in target_norm):
                return os.path.join(base_dir, d)
        return None

    # Load existing projects from manifest to avoid re-uploading
    existing_by_id = {}
    if os.path.exists(MANIFEST_FILE):
        try:
            with open(MANIFEST_FILE, "r", encoding="utf-8") as f:
                old_list = json.load(f)
                for p in old_list:
                    if p.get("images") and len(p["images"]) > 0:
                        existing_by_id[p["id"]] = p
        except Exception as e:
            print("Error loading manifest:", e)

    print("Analyzing portfolio directories...")
    for proj in PROJECTS_CONFIG:
        proj_id = proj["id"]
        dir_path = resolve_dir(proj["folder"])

        if proj_id in existing_by_id:
            print(f"  [{proj_id}] Already in manifest ({len(existing_by_id[proj_id]['images'])} photos) - skipping re-upload")
            continue

        if not dir_path or not os.path.exists(dir_path):
            print(f"Warning: Directory not found for: {proj['folder']}")
            continue

        raw_files = [f for f in sorted(os.listdir(dir_path)) if f.lower().endswith(('.jpg', '.jpeg', '.png', '.webp'))]
        max_p = proj.get("max_photos", len(raw_files))

        if len(raw_files) > max_p:
            step = len(raw_files) / max_p
            selected_files = [raw_files[int(i * step)] for i in range(max_p)]
        else:
            selected_files = raw_files

        print(f"  [{proj_id}] {os.path.basename(dir_path)}: {len(selected_files)} / {len(raw_files)} photos selected for upload")

        for idx, fname in enumerate(selected_files):
            fpath = os.path.join(dir_path, fname)
            tasks.append((fpath, proj_id, idx, len(selected_files)))

    print(f"\nTotal tasks to process and upload: {len(tasks)}")

    processed_results = []
    completed = 0

    with ThreadPoolExecutor(max_workers=10) as executor:
        futures = {executor.submit(process_and_upload_image, *t): t for t in tasks}
        for future in as_completed(futures):
            res = future.result()
            completed += 1
            if res:
                processed_results.append(res)
                if completed % 10 == 0 or completed == len(tasks):
                    print(f"Progress: {completed}/{len(tasks)} processed and uploaded ({res['project_id']}: {res['width']}x{res['height']}, {res['size_kb']} KB)")

    # Group by project
    by_project = {}
    for r in processed_results:
        by_project.setdefault(r["project_id"], []).append(r)

    # Sort each by original index
    for pid in by_project:
        by_project[pid].sort(key=lambda x: x["index"])

    final_projects = []
    for proj in PROJECTS_CONFIG:
        pid = proj["id"]
        if pid in existing_by_id:
            final_projects.append(existing_by_id[pid])
            continue

        images = by_project.get(pid, [])
        if not images:
            continue

        formatted_images = []
        for idx, img in enumerate(images):
            formatted_images.append({
                "src": img["src"],
                "thumbnail": img["thumbnail"],
                "alt": f"{proj['alt_prefix']} — Detalhe {idx + 1}",
                "orientation": img["orientation"],
                "width": img["width"],
                "height": img["height"]
            })

        cover_image = formatted_images[0]["src"]
        # Find first landscape or high-impact image for cover if possible
        for img in formatted_images:
            if img["orientation"] == "landscape":
                cover_image = img["src"]
                break

        final_projects.append({
            "id": proj["id"],
            "title": proj["title"],
            "category": proj["category"],
            "categoryLabel": proj["categoryLabel"],
            "description": proj["description"],
            "coverImage": cover_image,
            "location": proj["location"],
            "year": proj["year"],
            "images": formatted_images
        })

    # Save manifest
    with open(MANIFEST_FILE, "w", encoding="utf-8") as f:
        json.dump(final_projects, f, ensure_ascii=False, indent=2)

    total_images = sum(len(p["images"]) for p in final_projects)
    print(f"\nSuccessfully uploaded and prepared {len(final_projects)} projects with {total_images} total images!")
    print(f"Manifest written to {MANIFEST_FILE}")

    # Generate src/data/portfolio.ts
    ts_content = f"""// Authentic Clique e Poesia photography, served from Cloudflare R2 CDN.
// Global low-latency CDN delivery: max 1600px full WebP and 600px preview WebP.

export type PortfolioOrientation = "landscape" | "portrait" | "square";
export type PortfolioCategory = "hospedagem" | "casamentos" | "gastronomia" | "shows";

export interface PortfolioImage {{
  src: string;
  thumbnail: string;
  alt: string;
  orientation: PortfolioOrientation;
  width: number;
  height: number;
}}

export interface PortfolioProject {{
  id: string;
  title: string;
  category: PortfolioCategory;
  categoryLabel: string;
  description: string;
  coverImage: string;
  location: string;
  year: string;
  images: PortfolioImage[];
}}

export interface PortfolioPhoto extends PortfolioImage {{
  projectId: string;
  /** Zero-based photo index within the owning project. */
  index: number;
}}

export const portfolioProjects: PortfolioProject[] = {json.dumps(final_projects, ensure_ascii=False, indent=2)};

/** Alternate projects while preserving the original order of every photo series. */
export function interleavePortfolio(projects: readonly PortfolioProject[]): PortfolioPhoto[] {{
  const photos: PortfolioPhoto[] = [];
  const longest = Math.max(0, ...projects.map((project) => project.images.length));
  for (let index = 0; index < longest; index++) {{
    projects.forEach((project) => {{
      const image = project.images[index];
      if (image) photos.push({{ ...image, projectId: project.id, index }});
    }});
  }}
  return photos;
}}

export const portfolioPhotos = interleavePortfolio(portfolioProjects);
export const portfolioPhotoCount = portfolioPhotos.length;
"""

    with open("src/data/portfolio.ts", "w", encoding="utf-8") as f:
        f.write(ts_content)

    print("Successfully updated src/data/portfolio.ts with Cloudflare R2 URLs!")

if __name__ == "__main__":
    main()
