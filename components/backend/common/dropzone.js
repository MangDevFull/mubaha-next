import 'react-dropzone-uploader/dist/styles.css'
import Dropzone from 'react-dropzone-uploader'
import { useState } from 'react'


const MyUploader = ({sendImages}) => {

  const [images, setImages] = useState([])


  const handleChangeStatus = async ({ meta,file }) => {
    if (meta.status === 'done') {
      const extension = meta.name.split('.').pop();
      const response = await fetch(`${process.env.API_URL}/product/s3-url`,{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({fileType:extension})
      })
      const data = await response.json()
      setImages(oldArray => [...oldArray, { id: meta.id, file:file ,uploadUrl:data.data.uploadUrl,downloadUrl:data.data.downloadUrl}]);
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
        onChangeStatus={handleChangeStatus}
        accept="image/*"
        maxSizeBytes={2097152}
        maxFiles={10}
      />
    </div>

  )
}

export default MyUploader