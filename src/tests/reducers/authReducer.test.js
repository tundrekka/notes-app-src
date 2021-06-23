import { authReducer } from "../../reducers/authReducer"
import { types } from "../../types/types"

describe('tests in authReducer.js', () => {
   
   test('should return the initialState', () => {

      const initialState = {
         uid: '123abc',
         name: 'ismael'
      }
   
      const action = {
         type: 'fdkf'
      }

      const state = authReducer( initialState , action)
      expect( state ).toEqual(initialState) 
   })

   test('should login', () => {
      const action = {
         type: types.login,
         payload: {
            uid: 'ism484',
            displayName: 'Andres'
         }
      }
      const state = authReducer( { }, action)
      expect( state ).toEqual({
         uid: 'ism484',
         name: 'Andres'
      }) 
   })

   test('should logout', () => {

      const initialState = {
         uid: '123abc',
         name: 'ismael'
      }
      const action = {
         type: types.logout,
      }
      const state = authReducer( initialState, action)
      expect( state ).toEqual({ }) 
      
   })
   
})
