import React, { useEffect, useRef, useState } from "react";
import { EditorContent, useEditor, useEditorState, type Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import TextAlign from "@tiptap/extension-text-align";
import { Color, TextStyle } from "@tiptap/extension-text-style";
import { Placeholder } from "@tiptap/extensions";
import { postColorStyle } from "../blog/PostContent";
import { ColorPicker } from "./ColorPicker";
import { LinkDialog, type LinkValue } from "./LinkDialog";
import {
  AlignCenter,
  AlignJustify,
  AlignLeft,
  AlignRight,
  Bold,
  Captions,
  Heading2,
  Heading3,
  ImagePlus,
  Italic,
  Link2,
  List,
  ListOrdered,
  Minus,
  Pilcrow,
  Quote,
  Redo2,
  RemoveFormatting,
  Strikethrough,
  Underline,
  Undo2,
  Unlink,
} from "lucide-react";

interface RichTextEditorProps {
  value: string;
  onChange: (html: string) => void;
  onUploadImage: (file: File) => Promise<string>;
  onError: (message: string) => void;
  /** Cores gerais do texto escolhidas nas configurações (vazias: padrão). */
  textColor?: string | null;
  linkColor?: string | null;
}

const ToolButton: React.FC<{
  label: string;
  icon: React.ElementType;
  onClick: () => void;
  active?: boolean;
  disabled?: boolean;
}> = ({ label, icon: Icon, onClick, active, disabled }) => (
  <button
    type="button"
    title={label}
    aria-label={label}
    aria-pressed={active}
    disabled={disabled}
    // Evita tirar o foco do texto ao clicar, mantendo a seleção.
    onMouseDown={(event) => event.preventDefault()}
    onClick={onClick}
    className={`w-8 h-8 flex items-center justify-center rounded-[6px] transition-colors disabled:opacity-30 disabled:cursor-not-allowed ${
      active ? "bg-[#384936] text-white" : "text-[#171713]/70 hover:bg-[#171713]/6 hover:text-[#171713]"
    }`}
  >
    <Icon size={16} strokeWidth={2} />
  </button>
);

const Divider = () => <span className="mx-1 h-5 w-px bg-[#171713]/12" aria-hidden="true" />;

function imageFiles(list: FileList | null | undefined) {
  return Array.from(list ?? []).filter((file) => file.type.startsWith("image/"));
}

export const RichTextEditor: React.FC<RichTextEditorProps> = ({ value, onChange, onUploadImage, onError, textColor, linkColor }) => {
  const [uploading, setUploading] = useState(false);
  const [linkDialog, setLinkDialog] = useState<{
    href: string;
    newTab: boolean | null;
    needsText: boolean;
    editing: boolean;
  } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const editorRef = useRef<Editor | null>(null);

  const openLinkDialog = () => {
    const editor = editorRef.current;
    if (!editor) return;
    const editing = editor.isActive("link");
    const attrs = editor.getAttributes("link");
    setLinkDialog({
      href: (attrs.href as string | undefined) ?? "",
      newTab: editing ? attrs.target === "_blank" : null,
      needsText: !editing && editor.state.selection.empty,
      editing,
    });
  };
  // Ctrl+K abre a janela de link; o atalho é registrado uma vez, então lê sempre a versão atual.
  const openLinkDialogRef = useRef(openLinkDialog);
  openLinkDialogRef.current = openLinkDialog;

  const insertImages = async (files: File[], position?: number) => {
    const editor = editorRef.current;
    if (!editor || files.length === 0) return;
    setUploading(true);
    try {
      for (const file of files) {
        const src = await onUploadImage(file);
        const chain = editor.chain().focus();
        if (position !== undefined) chain.insertContentAt(position, { type: "image", attrs: { src } });
        else chain.setImage({ src });
        chain.run();
      }
    } catch {
      onError("Não foi possível enviar a foto. Tente de novo.");
    } finally {
      setUploading(false);
    }
  };

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [2, 3] },
        link: {
          openOnClick: false,
          autolink: true,
          defaultProtocol: "https",
          HTMLAttributes: { rel: "noopener noreferrer" },
        },
      }),
      Image.configure({ HTMLAttributes: { loading: "lazy" } }),
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      TextStyle,
      Color,
      Placeholder.configure({ placeholder: "Comece a contar como foi a experiência…" }),
    ],
    content: value,
    editorProps: {
      attributes: {
        class: "blog-prose min-h-[520px] px-5 sm:px-8 py-7 focus:outline-none",
        "aria-label": "Texto",
      },
      handleKeyDown: (_view, event) => {
        if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
          event.preventDefault();
          openLinkDialogRef.current();
          return true;
        }
        return false;
      },
      // Fotos coladas ou arrastadas para o texto também são enviadas.
      handlePaste: (_view, event) => {
        const files = imageFiles(event.clipboardData?.files);
        if (files.length === 0) return false;
        insertImages(files);
        return true;
      },
      handleDrop: (view, event) => {
        const files = imageFiles(event.dataTransfer?.files);
        if (files.length === 0) return false;
        const position = view.posAtCoords({ left: event.clientX, top: event.clientY })?.pos;
        insertImages(files, position);
        return true;
      },
    },
    onUpdate: ({ editor: current }) => onChange(current.isEmpty ? "" : current.getHTML()),
  });
  editorRef.current = editor;

  // Conteúdo carregado do banco depois da criação do editor: entra sem virar passo do "desfazer".
  useEffect(() => {
    if (!editor) return;
    const current = editor.isEmpty ? "" : editor.getHTML();
    if (value !== current) {
      editor.chain().setMeta("addToHistory", false).setContent(value, { emitUpdate: false }).run();
    }
  }, [editor, value]);

  const state = useEditorState({
    editor,
    selector: ({ editor: e }) => ({
      canUndo: e.can().undo(),
      canRedo: e.can().redo(),
      paragraph: e.isActive("paragraph"),
      h2: e.isActive("heading", { level: 2 }),
      h3: e.isActive("heading", { level: 3 }),
      bold: e.isActive("bold"),
      italic: e.isActive("italic"),
      underline: e.isActive("underline"),
      strike: e.isActive("strike"),
      color: e.getAttributes("textStyle").color as string | undefined,
      bulletList: e.isActive("bulletList"),
      orderedList: e.isActive("orderedList"),
      blockquote: e.isActive("blockquote"),
      link: e.isActive("link"),
      image: e.isActive("image"),
      alignLeft: e.isActive({ textAlign: "left" }),
      alignCenter: e.isActive({ textAlign: "center" }),
      alignRight: e.isActive({ textAlign: "right" }),
      alignJustify: e.isActive({ textAlign: "justify" }),
    }),
  });

  if (!editor || !state) return null;

  const chain = () => editor.chain().focus();

  const applyLink = ({ href, newTab, text }: LinkValue) => {
    const target = newTab ? "_blank" : null;
    if (text) {
      chain()
        .insertContent({ type: "text", text, marks: [{ type: "link", attrs: { href, target } }] })
        .unsetMark("link")
        .run();
    } else {
      chain().extendMarkRange("link").setLink({ href, target }).run();
    }
    setLinkDialog(null);
  };

  const removeLink = () => {
    chain().extendMarkRange("link").unsetLink().run();
    setLinkDialog(null);
  };

  const setCaption = () => {
    const current = (editor.getAttributes("image").title as string | undefined) ?? "";
    const caption = window.prompt("Legenda da foto (deixe vazio para não ter legenda):", current);
    if (caption === null) return;
    chain().updateAttributes("image", { title: caption.trim() || null, alt: caption.trim() }).run();
  };

  return (
    <div className="rounded-[8px] bg-white border border-[#171713]/8">
      <div
        role="toolbar"
        aria-label="Formatação do texto"
        className="sticky top-12 z-10 flex flex-wrap items-center gap-0.5 rounded-t-[8px] border-b border-[#171713]/8 bg-white/95 backdrop-blur px-2 py-1.5"
      >
        <ToolButton label="Desfazer (Ctrl+Z)" icon={Undo2} onClick={() => chain().undo().run()} disabled={!state.canUndo} />
        <ToolButton label="Refazer (Ctrl+Y)" icon={Redo2} onClick={() => chain().redo().run()} disabled={!state.canRedo} />
        <Divider />
        <ToolButton label="Texto normal" icon={Pilcrow} onClick={() => chain().setParagraph().run()} active={state.paragraph} />
        <ToolButton label="Subtítulo" icon={Heading2} onClick={() => chain().toggleHeading({ level: 2 }).run()} active={state.h2} />
        <ToolButton label="Subtítulo menor" icon={Heading3} onClick={() => chain().toggleHeading({ level: 3 }).run()} active={state.h3} />
        <Divider />
        <ToolButton label="Negrito (Ctrl+B)" icon={Bold} onClick={() => chain().toggleBold().run()} active={state.bold} />
        <ToolButton label="Itálico (Ctrl+I)" icon={Italic} onClick={() => chain().toggleItalic().run()} active={state.italic} />
        <ToolButton label="Sublinhado (Ctrl+U)" icon={Underline} onClick={() => chain().toggleUnderline().run()} active={state.underline} />
        <ToolButton label="Riscado" icon={Strikethrough} onClick={() => chain().toggleStrike().run()} active={state.strike} />
        <ColorPicker
          value={state.color}
          onChange={(color) => chain().setColor(color).run()}
          onReset={() => chain().unsetColor().run()}
        />
        <Divider />
        <ToolButton label="Lista com marcadores" icon={List} onClick={() => chain().toggleBulletList().run()} active={state.bulletList} />
        <ToolButton label="Lista numerada" icon={ListOrdered} onClick={() => chain().toggleOrderedList().run()} active={state.orderedList} />
        <ToolButton label="Citação em destaque" icon={Quote} onClick={() => chain().toggleBlockquote().run()} active={state.blockquote} />
        <ToolButton label="Linha divisória" icon={Minus} onClick={() => chain().setHorizontalRule().run()} />
        <Divider />
        <ToolButton label="Alinhar à esquerda" icon={AlignLeft} onClick={() => chain().setTextAlign("left").run()} active={state.alignLeft} />
        <ToolButton label="Centralizar" icon={AlignCenter} onClick={() => chain().setTextAlign("center").run()} active={state.alignCenter} />
        <ToolButton label="Alinhar à direita" icon={AlignRight} onClick={() => chain().setTextAlign("right").run()} active={state.alignRight} />
        <ToolButton label="Justificar" icon={AlignJustify} onClick={() => chain().setTextAlign("justify").run()} active={state.alignJustify} />
        <Divider />
        <ToolButton label="Inserir ou editar link (Ctrl+K)" icon={Link2} onClick={openLinkDialog} active={state.link} />
        <ToolButton label="Remover link" icon={Unlink} onClick={() => chain().extendMarkRange("link").unsetLink().run()} disabled={!state.link} />
        <ToolButton label={uploading ? "Enviando foto…" : "Inserir foto"} icon={ImagePlus} onClick={() => fileInputRef.current?.click()} disabled={uploading} />
        <ToolButton label="Legenda da foto selecionada" icon={Captions} onClick={setCaption} disabled={!state.image} />
        <Divider />
        <ToolButton label="Limpar formatação" icon={RemoveFormatting} onClick={() => chain().unsetAllMarks().clearNodes().run()} />
        {uploading && <span className="ml-2 text-[12.5px] text-[#384936]">Enviando foto…</span>}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          hidden
          onChange={(event) => {
            insertImages(imageFiles(event.target.files));
            event.target.value = "";
          }}
        />
      </div>
      <div style={postColorStyle(textColor, linkColor)}>
        <EditorContent editor={editor} />
      </div>
      {linkDialog && (
        <LinkDialog
          initialHref={linkDialog.href}
          initialNewTab={linkDialog.newTab}
          needsText={linkDialog.needsText}
          editing={linkDialog.editing}
          onApply={applyLink}
          onRemove={removeLink}
          onCancel={() => {
            setLinkDialog(null);
            editor.commands.focus();
          }}
        />
      )}
    </div>
  );
};
