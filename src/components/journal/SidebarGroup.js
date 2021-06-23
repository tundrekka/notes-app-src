import React from 'react'
import { JournalEntries } from './JournalEntries'

export const SidebarGroup = React.memo(({handleAddNote}) => {

   const handleShow = () => {
      document.querySelector('main').classList.toggle('toggle')
   }
   let mediaQuery = window.innerWidth < 650;
   window.onresize = () => {
      mediaQuery = window.innerWidth < 650;
   }
   mediaQuery = window.innerWidth < 650

   return (
      <>
      <div className="journal__new-entry"
         onClick={handleAddNote}>
  
            <i className="far fa-calendar-plus fa-4x"></i>
            <p className="mt-5">
               New Note
            </p>
      </div>
      {
         mediaQuery &&
         <button className="btn btn-primary-light" style={{marginTop: '1.2em', padding: '.5em 1em', marginBottom: '.8em'}} onClick={handleShow}>Notes</button> 
      }

      <JournalEntries />    
         
      </>
   )
})
