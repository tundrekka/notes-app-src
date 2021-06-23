import { finishLoading, removeError, setError, startLoading } from "../../actions/ui"
import { types } from "../../types/types"

describe('Tests in UI actions', () => {
   test('All syncronous actions should work', () => {
      
      const setErrorAction = setError('Error!')
      const removeErrorAction = removeError()
      const startLoadingAction = startLoading()
      const finishLoadingAction = finishLoading()

      expect( setErrorAction ).toEqual({
         type: types.uiSetError,
         payload: 'Error!'
      })
      expect( removeErrorAction ).toEqual({
         type: types.uiRemoveError
      })
      expect( startLoadingAction ).toEqual({
         type: types.uiStartLoading
      })
      expect( finishLoadingAction ).toEqual({
         type: types.uiFinishLoading
      })

   })
   
})
