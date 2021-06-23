import React from 'react'
import { useSelector } from 'react-redux';
import { JournalEntry } from './JournalEntry';

export const JournalEntries = () => {

    const {notes} = useSelector(state => state.notes)

    if( notes.length === 0 ) {
        return <div style={{textAlign: 'center'}} className="journal__entries">Notes...</div>
    }
    return (
        <div className="journal__entries">
            
            {
                notes.map( note => (
                    <JournalEntry 
                        key={ note.id }
                        { ...note }
                    />
                ))
            }

        </div>
    )
}
