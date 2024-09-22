import { configureStore } from '@reduxjs/toolkit'
import mealsSlice from './mealsSlice'

export const makeStore = () => {
    return configureStore({
        reducer: {
            meals: mealsSlice
        },
    })
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']