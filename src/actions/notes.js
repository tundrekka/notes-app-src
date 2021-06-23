import Swal from 'sweetalert2'
import { db } from '../firebase/firebase-config'
import { abortFetching, fileUpload } from '../helpers/fileUpload'
import { loadNotes } from '../helpers/loadNotes'
import { types } from '../types/types'


export const startNewNote = () => {

   return async(dispatch, getState) => {

      Swal.fire({
         title: 'LOADING...',
         allowOutsideClick: false,
         showCancelButton: false,
         showConfirmButton: false
      })

      const maxNotesLimitPerUser = 10

      try {
         // limit notes per user
         const { notes } = getState().notes
         if(notes.length >= maxNotesLimitPerUser) throw new Error(`Maximum notes per user is ${maxNotesLimitPerUser}`)

         const { uid } = getState().auth
         

         const newNote = {
            title: '',
            body: '',
            date: new Date().getTime()
         }
         
         const docRef = await db.collection(`journal-users/${uid}/notes`).add(newNote)
         dispatch( activeNote(docRef.id, newNote))
         dispatch( updateSidebarNotes(docRef.id, newNote))
         Swal.close()
         Swal.fire('Created, start writing!', newNote.title, 'success')
         document.querySelector('main').classList.add('toggle')
         
      } catch (error) {
         
         Swal.close()
         Swal.fire('Failed', error.message , 'error')
         document.querySelector('main').classList.add('toggle')

         return error.message
      }
   }
}

export const startUpdateNote = (note) => {
   return async(dispatch, getState) => {

      Swal.fire({
         title: 'Updating...',
         allowOutsideClick: false,
         showCancelButton: false,
         showConfirmButton: false
      })

      const limitNoteBodyLength = 4000;

      try {
         if(note.body.length > limitNoteBodyLength) throw new Error(`Maximum digits per body-note is ${limitNoteBodyLength}, your note has ${note.body.length} digits`)

         const { uid } = getState().auth

         if(!note.url) delete note.url

         const noteToFiresote = {...note}
         delete noteToFiresote.id

         await db.doc(`journal-users/${uid}/notes/${note.id}`).update( noteToFiresote )
      
         dispatch( refreshNote( note.id, noteToFiresote) )
         Swal.close()
         Swal.fire('Saved', note.title, 'success')
      } catch (error) {
         Swal.close()
         Swal.fire('Error', error.message, 'error')
      }
      
   }
}

export const startUploading = (file, e) => {
   return async(dispatch, getState) => {

      let abort = false
      
      Swal.fire({
         title: 'Uploading...',
         allowOutsideClick: false,
         showCancelButton: false,
         showConfirmButton: true,
         confirmButtonText: 'Cancel'
      }).then( result => {
         if( result.isConfirmed ) {
            abortFetching(e)
            abort = true
         }
      })

      try {
         const { active:activeNote } = getState().notes
         
         const fileUrl = await fileUpload(file)
         activeNote.url = fileUrl

         if( !abort ) {
            dispatch( startUpdateNote(activeNote))
         }

      } catch (error) {
         Swal.fire('Something went wrong', error.message, 'error')
      }
      
   }
}

export const startDeleteNote = (id) => {
   return async(dispatch, getState) => {

      Swal.fire({
         title: 'Are you sure?',
         // eslint-disable-next-line quotes
         text: "You won't be able to revert this!",
         icon: 'warning',
         showCancelButton: true,
         confirmButtonColor: '#3085d6',
         cancelButtonColor: '#d33',
         confirmButtonText: 'Yes, delete it!'
      }).then( async(result) => {
         if (result.isConfirmed) {
            Swal.fire({
               title: 'Deleting...',
               allowOutsideClick: false,
               showCancelButton: false,
               showConfirmButton: false
            })
            
            try {
               const { uid } = getState().auth
               await db.doc(`journal-users/${uid}/notes/${id}`).delete()
               dispatch( deleteNote(id))

               Swal.close()
               Swal.fire(
                  'Deleted!',
                  'Your file has been deleted.',
                  'success'
               )
            } catch (error) {
               Swal.fire('Something went wrong', error.message, 'error')
            }
            
         }
      })
   }
}

export const startLoadingNotes = (uid) => {
   return async(dispatch) => {
      try {
         const notes = await loadNotes(uid)
         dispatch(setNotes(notes))
      } catch (error) {
         Swal.fire('Something went wrong', error.message, 'error')
      }
      
   }
}

// No async actions

export const activeNote = (id, note) => ({
   type: types.notesActive,
   payload: {
      id,
      ...note
   }
})

export const setNotes = ( notes ) => ({
   type: types.notesLoad,
   payload: notes
})

export const refreshNote = (id, note) => ({
   type: types.notesUpdated,
   payload: {
      id,
      note: {
         id,
         ...note
      }
   }
})

export const deleteNote = (id) => ({
   type: types.notesDelete,
   payload: id
})

export const updateSidebarNotes = (id,note) => ({
   type: types.notesUpdateSidebar,
   payload: {
      id,
      ...note
   }
})

export const notesCleanLogout = () => ({
   type: types.notesLogoutCleaning
})
