import { configureStore } from '@reduxjs/toolkit'
import tableSlice from './features/table'

export default configureStore({
    reducer: {
        table: tableSlice
    }
})