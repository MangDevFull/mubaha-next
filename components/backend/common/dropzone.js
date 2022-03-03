import React from 'react'
import Dropzone from 'react-dropzone-uploader'
import 'react-dropzone-uploader/dist/styles.css'


const MyUploader = () => {
  // specify upload params and url for your files
  // const getUploadParams = ({ meta }) => { 
  //   console.log('meta',meta)
  //  }
  
  // called every time a file's `status` changes
  const handleChangeStatus = ({ meta, file }, status) => { console.log(file) }
  
  // receives array of files that are done uploading when submit button is clicked
  const handleSubmit = (files, allFiles) => {
    console.log(files.map(f => f.meta))
    allFiles.forEach(f => f.remove())
  }

  return (
    <div>
      <Dropzone
      // getUploadParams={getUploadParams}
      // onChangeStatus={handleChangeStatus}
      onSubmit={handleSubmit}
      accept="image/*,audio/*,video/*"
    />
    </div>
    
  )
}

export default MyUploader