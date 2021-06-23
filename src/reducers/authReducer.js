import { types } from '../types/types';

 /*
   {
      uid: fjf49f94
      name: userNameName
   }
*/

export const authReducer = ( state = {}, action ) => {
   
   switch (action.type) {
      case types.login:
         return {
            uid: action.payload.uid,
            name: action.payload.displayName
         }
      case types.logout:
         return { }
   
      default:
         return state
   }

}
