import { createSlice } from '@reduxjs/toolkit'

export const tableSlice = createSlice({
    name: 'table', initialState: { value: { elements: [], order: 0, isComplete: false, nelements: 0 } },
    reducers: {
        setTable: (state, action) => {
            let { i, j, result, order } = action.payload
            state.value.elements[i] = state.value.elements[i] ? state.value.elements[i] : []
            state.value.elements[i][j] = result.charCodeAt()-97

            if (result !== "") state.value.nelements++
            else state.value.nelements--
            state.value.order = order

            state.value.isComplete = state.value.order ** 2 === state.value.nelements
        }
    }
})

export const { setTable } = tableSlice.actions
export default tableSlice.reducer