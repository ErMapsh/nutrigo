import { configureStore } from '@reduxjs/toolkit'
import commonSlice from './commonSlice'

export const makeStore = () => {
    return configureStore({
        reducer: {
            common: commonSlice
        },
    })
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']