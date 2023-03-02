import React, { forwardRef } from 'react'
import { Editor } from '@tinymce/tinymce-react';

const TinyMCE_Editor = forwardRef((props, ref) => {
  const { onEditorChange } = props
  const { initialValue = "Compose your message here...", value = "" } = props

  const handleEditorChange = (content, editor) => {
    if(onEditorChange) {
      onEditorChange(content)
    }
  }

  return (
    <Editor
      apiKey="c3ck5ygkz8m2li85vr6rdpzz3rr9mwcdpiy7alpsc1suuqae"
      ref={ref}
      initialValue={initialValue}
      value={value}
      init={{
        browser_spellcheck: true,
        contextmenu: false,
        height: 500,
        menubar: false,
        plugins: `autolink lists link image charmap paste help wordcount quickbars`,
        toolbar:
          `undo redo | formatselect | forecolor | bold italic underline | 
          alignment | charmap | image | bullist numlist | paste pastetext |removeformat | help`,
        quickbars_insert_toolbar: false,
        quickbars_selection_toolbar: 'bold italic underline | link',
        setup: (editor) => {

          /* example, adding a group toolbar button */
          editor.ui.registry.addGroupToolbarButton('alignment', {
            icon: 'align-left',
            tooltip: 'Alignment',
            items: 'alignleft aligncenter alignright | alignjustify | outdent indent'
          })
          editor.on('ObjectResizeStart', (e) => {
            if (e.target.nodeName === 'IMG') {
              const selectedImage = editor.selection.getNode()
              editor.dom.setStyle(selectedImage,'width', e.width)
              editor.dom.setStyle(selectedImage,'height', e.height)
              selectedImage.removeAttribute('width')
              selectedImage.removeAttribute('height')
            }
          })
        }
      }}
      onEditorChange={handleEditorChange}
    />
  )
})

export default TinyMCE_Editor
