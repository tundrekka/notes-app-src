import moment from 'moment'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Swal from 'sweetalert2'
import { startDeleteNote, startUpdateNote, startUploading } from '../../actions/notes'

export const NotesAppBar = () => {

    const {active} = useSelector(state => state.notes)

    const dispatch = useDispatch()

    const handleUpdate = () => {
        dispatch( startUpdateNote( active ) )
    }
    const handlePictureClick = () => {
        document.querySelector('#fileSelector').click()
    }

    const handleFileChange = (e) => {
        const file = e.target.files[0]
        if( ( file.name.includes('.png') || file.name.includes('.jpg') || file.name.includes('.jpeg') ) && file.type.startsWith('image') && e.target.files.length < 2 ) {
            dispatch( startUploading(file, e))
            e.target.value = ''
        } else {
            e.target.value = ''
            Swal.fire('Error', 'The file must be an image, jpg, png or jpeg', 'error')
        }
    }

    const handleDelete = () => {
        dispatch( startDeleteNote(active.id) )
    }


    return (
        <div className="notes__appbar" id="appbar">
            <span>{moment(new Date()).format('MMM Do YY')}</span>

            <input
                id="fileSelector" 
                name='file'
                type="file"
                accept="image/jpg, image/png, image/jpeg"
                style={{display: 'none'}}
                onChange={handleFileChange}
            />

            <div>
                <button className="btn btn-danger"
                    onClick={handleDelete}
                >
                    Delete
                </button>

                <button className="btn btn-primary"
                    onClick={handlePictureClick}
                >
                    Picture
                </button>

                <button 
                    className="btn btn-primary"
                    onClick={handleUpdate}
                >
                    Save
                </button>
            </div>
        </div>
    )
}
