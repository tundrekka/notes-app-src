import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { types } from '../../types/types';
import { login, logout, startLogout, startLoginEmailPassword } from '../../actions/auth';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {};

let store = mockStore(initState);

describe('Tests on auth actions', () => {
    
   beforeEach(()=> {
      store = mockStore(initState);
   })

   test('login y logout deben de crear la acción respectiva', () => {
      
      const uid = 'ABC123';
      const displayName = 'Fernando';

      const loginAction = login( uid, displayName );
      const logoutAction = logout();

      expect( loginAction ).toEqual({
         type: types.login,
         payload: {
               uid,
               displayName
         }
      });

      expect( logoutAction ).toEqual({
         type: types.logout
      });

   })

   test('debe de realizar el startLogout', async() => {
      
      await store.dispatch( startLogout() );

      const actions = store.getActions();
      
      expect( actions[0] ).toEqual({
            type: types.logout
      });

      expect( actions[1] ).toEqual({
            type: types.notesLogoutCleaning
      });

   });

   test('should start startLoginEmailPassword', async() => {
      
      await store.dispatch( startLoginEmailPassword('test-user@testing.com','1234qwer') );

      const actions = store.getActions();
      
      expect( actions[1] ).toEqual({
         type: types.login,
         payload: {
               uid: 'blfMzQ81t4WJqGRJns6LTqShu2T2',
               displayName: null
         }
      })

   })

})
