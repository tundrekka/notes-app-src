import cloudinary from 'cloudinary'
import { fileUpload } from '../../helpers/fileUpload';
jest.setTimeout(12000)

cloudinary.config({ 
   cloud_name: 'dtwc8wdqx', 
   api_key: '185721132534486', 
   api_secret: '0xRyNnA-hrbr5ZqduCWJgY8szY0' 
 });

describe('tests in fileUpload.js', () => {
   test('should load the image archive and return the URL', ( done ) => {
      
      fetch('https://img.freepik.com/free-vector/purple-abstract-background_1393-310.jpg?size=626&ext=jpg&ga=GA1.2.867177243.1621987200')
         .then( res => res.blob())
         .then( async(blob) => {

            const file = new File([blob], 'picture.jpg')
            const url = await fileUpload(file)
            expect( typeof url ).toBe('string')

            // Delete image by ID
            const segments = url.split('/');
            const imageId = segments[ segments.length - 1 ].replace('.jpg','');

            cloudinary.v2.api.delete_resources( imageId, {}, () => {
               done()
            })

         })

   })

   test('should return null', async() => {
      const file = new File([], 'picture.jpg')
      const url = await fileUpload( file)
      expect( url ).toBe( null )
   })
   
})
