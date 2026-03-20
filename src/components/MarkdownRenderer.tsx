import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import TextAlign from '@tiptap/extension-text-align'

export function MarkdownRenderer({ content }: { content: string }) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
    ],
    editable: false,
    onCreate({ editor }) {
      editor.commands.setContent(content)
    },
  })

  return (
    <div className="prose">
      <EditorContent editor={editor} />
    </div>
  )
}
