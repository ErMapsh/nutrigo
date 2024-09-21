import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from './store'

interface CounterState {
    value: number
}

const initialState: CounterState = {
    value: 0,
}

export const commonSlice = createSlice({
    name: 'common',
    initialState,
    reducers: {
    },
})

export const { } = commonSlice.actions;
export default commonSlice.reducer;