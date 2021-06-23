import moment from 'moment'
import React from 'react'
import { useDispatch } from 'react-redux'
import { activeNote } from '../../actions/notes'

export const JournalEntry = ({id, date, title, body, url}) => {
    const dispatch = useDispatch()
    const noteDate = moment(date)

    const handleEntryClick = () => {
        dispatch( activeNote(id, {date, title, body, url}) )
        document.querySelector('main').classList.toggle('toggle')
    }
    
    let excerptTitle = ''
    if( title.length > 30 ) excerptTitle = title.slice( 0, 30 ) + '...'
    else excerptTitle = title

    let excerptBody = ''
    if( body.length > 50 ) excerptBody = body.slice( 0, 50 ) + '...'
    else excerptBody = body

    return (
        <div 
            className="journal__entry pointer"
            onClick={handleEntryClick}
        >
           
            {
                url &&
                <div 
                    className="journal__entry-picture"
                    style={{
                        backgroundSize: 'cover',
                        backgroundImage: `url(${url})`
                    }}
                ></div>
            }

            <div className="journal__entry-body">
                <p className="journal__entry-title">
                    { excerptTitle }
                </p>
                <p className="journal__entry-content">
                    { excerptBody }
                </p>
            </div>

            <div className="journal__entry-date-box">
                <span>{noteDate.format('MMMM')}</span>
                <h4>{noteDate.format('Do')}</h4>
            </div>
           
        </div>
    )
}
