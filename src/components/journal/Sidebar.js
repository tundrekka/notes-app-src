import React from 'react'
import { useDispatch, useSelector } from 'react-redux';

// import { JournalEntries } from './JournalEntries'
import { startLogout } from '../../actions/auth';
import { startNewNote } from '../../actions/notes';
import { SidebarGroup } from './SidebarGroup';
export const Sidebar = () => {

    const dispatch = useDispatch()
    const {name} = useSelector(state => state.auth)

    const handleLogout = () => {
        dispatch( startLogout() )
    }

    const handleAddNote = () => {
        dispatch( startNewNote() )
    }

    return (
        <aside className="journal__sidebar">
            
            <div className="journal__sidebar-navbar">
                <h3 className="">
                    <i className="far fa-moon"></i>
                    <span> {name} </span>
                </h3>

                <button 
                className="btn"
                onClick={handleLogout}
                id="logout-button"
                >
                    Logout
                </button>
            </div>
            
            <SidebarGroup handleAddNote={handleAddNote} />

        </aside>
    )
}
