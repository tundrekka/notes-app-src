import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { startNewNote } from '../../actions/notes';
import { types } from '../../types/types';
import { db } from '../../firebase/firebase-config';

 
const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {
    auth: {
        uid: 'CNARpJbMjCQ5ixCMEBwL'
    },
    notes: {
        active: {
            id: 'CNARpJbMjCQ5ixCMEBwL',
            title: 'Hola',
            body: 'Mundo'
        },
        notes: [{}, {}]
    }
};

let store = mockStore(initState);

describe('Tests in notes actions', () => {

    beforeEach( () => {

        store = mockStore(initState);

    });

    test('should create a new note startNewNote', async() => {
        document.body.innerHTML = '<main id="test" ></main>'
        try {
            await store.dispatch( startNewNote() );

            const actions = store.getActions();

            expect( actions[0] ).toEqual({
                type: types.notesActive,
                payload: {
                    id: expect.any(String),
                    title: '',
                    body: '',
                    date: expect.any(Number)
                }
            });

            expect( actions[1] ).toEqual({
                type: types.notesUpdateSidebar,
                payload: {
                    id: expect.any(String),
                    title: '',
                    body: '',
                    date: expect.any(Number)
                }
            });
        
            const docId = actions[0].payload.id;
            db.doc(`/journal-users/CNARpJbMjCQ5ixCMEBwL/notes/${ docId }`).delete()
                .then(res => res).catch(console.log);
            
        } catch (error) {
           console.log(error.message) 
        }

    })
    test('should not create a new note if user already has 10 notes', async() => {

        const initState = {
            auth: {
                uid: 'CNARpJbMjCQ5ixCMEBwL'
            },
            notes: {
                active: {
                    id: 'CNARpJbMjCQ5ixCMEBwL',
                    title: 'Hola',
                    body: 'Mundo'
                },
                notes: [{}, {},3,4,5,6,7,8,9,10,11]
            }
        };
        store = mockStore(initState);

        try {
            const resp = await store.dispatch( startNewNote() );

            expect( resp ).toBe('Maximum notes per user is 10')
           
        } catch (error) {
            console.log(error)
            
        }
        
    })
    
})
