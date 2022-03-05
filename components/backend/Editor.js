
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

export default function Editor({onChangeEditor}) {
  const handleChange = ( event, editor ) => {
    const data = editor.getData();
    // console.log(data);
    onChangeEditor(data)
  };

  return (
    <>
      <CKEditor
        className="p10"
        editor={ClassicEditor}
        onChange={ handleChange }
      />
    </>
  )
}