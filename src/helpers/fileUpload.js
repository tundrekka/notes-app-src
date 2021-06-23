
// abort signal
let controller

export const fileUpload = async (file) => {

   controller = new AbortController()
   const signal = controller.signal
   
   const cloudUrl = 'https://api.cloudinary.com/v1_1/dtwc8wdqx/upload'

   const formData = new FormData()
   formData.append('upload_preset', 'react-app')
   formData.append('file', file)

   try {
      const resp = await fetch(cloudUrl, {
         method: 'POST',
         body: formData,
         signal
      })
      if(resp.ok) {
         const cloudResp = await resp.json()
         return cloudResp.secure_url
      } else {
         return null
      }
   } catch (error) {
      return null
   }

} 

export const abortFetching = (e) => {
   controller.abort()
   e.target.value = ''
}