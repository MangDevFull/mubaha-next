
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

export default function Editor() {
  return (
    <>
      <CKEditor
        className="p10"
        editor={ClassicEditor}
      />
    </>
  )
}