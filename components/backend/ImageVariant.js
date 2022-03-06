import 'react-dropzone-uploader/dist/styles.css'
import Dropzone from 'react-dropzone-uploader'

export default function ImageVariant({variant,idx,hanldeImageVariant}){
  const handleChangeStatus = async ({ meta,file }) => {
    let imageVariant = {}
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
      imageVariant = {uploadImage:data.data.uploadUrl,downloadUrl:data.data.downloadUrl,file:file}
    } else if (meta.status === "removed") {
      imageVariant={uploadImage:"",downloadUrl:""}
    }
    hanldeImageVariant(idx,imageVariant)
  }
  return(
    <div>
      <label>Ảnh cho phân loại <strong>{variant.label}</strong> </label>
      <Dropzone
        onChangeStatus={handleChangeStatus}
        accept="image/*"
        maxSizeBytes={2097152}
        maxFiles={1}
      />
    </div>
  )
}