import 'react-dropzone-uploader/dist/styles.css'
import Dropzone from 'react-dropzone-uploader'
import { useState } from 'react'


const MyUploader = ({sendImages}) => {
  // specify upload params and url for your files
  // const getUploadParams = ({ meta }) => { 
  //   console.log('meta',meta)
  //  }

  const [images, setImages] = useState([])

  const handleChangeStatus = async ({ meta }) => {
    if (meta.status === 'done') {
      console.log('meta',meta)
      var formData = new FormData();
      const extension = meta.name.split('.').pop();
      formData.append('Content-Type', extension);
      formData.append('file',meta.previewUrl.slice(5));
      const response = await fetch(`${process.env.API_URL}/product/s3-url`,{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({fileType:extension})
      })
      const data = await response.json()
      setImages(oldArray => [...oldArray, { 'id': meta.id, formData ,uploadUrl:data.data.uploadUrl}]);
    } else if (meta.status === "removed") {
      const arr = images.filter(function (img) {
        return img.id !== meta.id
      })
      setImages(arr)
    }

  }

  sendImages(images)
  

  return (
    <div>
      <Dropzone
        // getUploadParams={getUploadParams}
        onChangeStatus={handleChangeStatus}
        accept="image/*"
      />
    </div>

  )
}

export default MyUploader