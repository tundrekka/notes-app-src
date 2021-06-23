import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NotesAppBar } from './NotesAppBar'
import {useForm} from '../../hooks/useForm'
import { activeNote } from '../../actions/notes'

export const NoteScreen = () => {
    const dispatch = useDispatch()

    const {active: note} = useSelector(state => state.notes)


    const activeId = useRef(note.id)
    
    const [ formValues, handleInputChange, reset ] = useForm(note)
    const {body, title } = formValues


    useEffect(() => {
        if( note.id !== activeId.current ) {
            reset( note )
            activeId.current = note.id
        }
    }, [note, reset])
    
    useEffect(() => {
        dispatch( activeNote( formValues.id, { ...formValues }) )
    }, [formValues, dispatch])

    return (
        <div className="notes__main-content">
            
            <NotesAppBar />

            <div className="notes__content">

                <input 
                    type="text"
                    placeholder="Some cool title"
                    className="notes__title-input"
                    autoComplete="off"
                    value={title}
                    name="title"
                    onChange={handleInputChange}
                    
                />

                <textarea
                    placeholder="What happened today"
                    className="notes__textarea"
                    value={body}
                    name="body"
                    onChange={handleInputChange}
                ></textarea>

                {
                    note.url 
                    &&
                    
                    <div className="notes__image">
                        <a rel="noreferrer" href={note.url} target="_blank">
                        <img 
                            src={note.url}
                            alt="imagen"
                        />
                        </a>
                    </div>
                    
                }

            </div>

        </div>
    )
}
