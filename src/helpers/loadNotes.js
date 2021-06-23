import Swal from 'sweetalert2';
import { db } from '../firebase/firebase-config'


export const loadNotes = async ( uid ) => {

   try {
      const notesSnap = await db.collection(`journal-users/${uid}/notes`).orderBy('date', 'desc').get()
      const notes = [];
   
      notesSnap.forEach( snapChild => {
         notes.push({
            id: snapChild.id,
            ...snapChild.data()
         })
      })
      return notes
      
   } catch (error) {
      Swal.fire('Something went wrong', error.message, 'error')
      
   }

}