import React, { forwardRef } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Editor } from '@tinymce/tinymce-react';

const useStyles = makeStyles( theme => ({

}),{name: 'TinyMCE_Editor'})

const TinyMCE_Editor = forwardRef((props, ref) => {
  const { onEditorChange } = props
  const classes = useStyles()
  const { initialValue = "Compose your message here...", value = "" } = props

  const handleEditorChange = (content, editor) => {
    if(onEditorChange) {
      onEditorChange(content)
    }
    // console.log('Content was updated:', content);
    // console.log('tinyEditor ref:', ref);
  }

  return (
    <Editor
      apiKey="c3ck5ygkz8m2li85vr6rdpzz3rr9mwcdpiy7alpsc1suuqae"
      ref={ref}
      initialValue={initialValue}
      value={value}
      init={{
        height: 500,
        menubar: false,
        plugins: `autolink lists link image charmap paste help wordcount quickbars`,
        toolbar:
          `undo redo | formatselect | forecolor | bold italic underline | 
          alignment | charmap | image | bullist numlist | paste pastetext |removeformat | help`,
        quickbars_insert_toolbar: false,
        quickbars_selection_toolbar: 'bold italic underline | link',
        setup: function (editor) {

          /* example, adding a group toolbar button */
          editor.ui.registry.addGroupToolbarButton('alignment', {
            icon: 'align-left',
            tooltip: 'Alignment',
            items: 'alignleft aligncenter alignright | alignjustify | outdent indent'
          });
      
        },
      }}
      onEditorChange={handleEditorChange}
    />
  )
})

export default TinyMCE_Editor
