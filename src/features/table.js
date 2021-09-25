import { createSlice } from '@reduxjs/toolkit'

export const tableSlice = createSlice({
    name: 'table', initialState: { value: { elements: [], order: 0, isComplete: false, nelements: 0 } },
    reducers: {
        setTable: (state, action) => {
            let { i, j, result, order } = action.payload
            state.value.elements[i] = state.value.elements[i] ? state.value.elements[i] : []
            state.value.elements[i][j] = result

            state.value.order = order

            let count = 0
            state.value.nelements = state.value.elements.forEach(row => { row.forEach(_ => count++) });
            state.value.isComplete = state.value.order ** 2 === count

        },
        resetTable: (state) => {
            state.value.elements = []
        }
    }
})

export const { setTable, resetTable } = tableSlice.actions
export default tableSlice.reducer