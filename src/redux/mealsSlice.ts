import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Alert } from 'react-native';
import { z } from 'zod';

export interface menuOptiontype {
    meal_id: number,
    id: number,
    placeholder: string,
    value: string,
    valid: false
}

export interface mealtype {
    id: number,
    name: string,
    required: boolean,
    time: string,
    editable: boolean,
    open: boolean,
    opendate: boolean,
    menu_options: menuOptiontype[],
    valid: boolean
}

export interface state {
    submitError: boolean,
    meals: mealtype[]
}

const initialState: state = {
    submitError: false,
    meals: [
        {
            id: 1,
            name: 'Breakfast',
            required: true,
            time: '',
            editable: true,
            open: false,
            opendate: false,
            menu_options: [
                { id: 1, meal_id: 1, placeholder: 'Upma + Apple juice', value: '', valid: false },
                { id: 2, meal_id: 1, placeholder: 'Idli + Sambar', value: '', valid: false },
            ],
            valid: false,

        },
        {
            id: 2,
            name: 'Mid-morning',
            required: false,
            time: '',
            editable: false,
            open: false,
            opendate: false,
            menu_options: [{ id: 1, meal_id: 2, placeholder: 'Oatmeal + Banana', value: '', valid: false }],

            valid: false,
        },
        {
            id: 3,
            name: 'Lunch',
            required: true,
            time: '',
            editable: false,
            open: false,
            opendate: false,
            menu_options: [
                { id: 1, meal_id: 3, placeholder: 'Roti + Sabji', value: '', valid: false },
                { id: 2, meal_id: 3, placeholder: 'Rice + Fish', value: '', valid: false },
            ],
            valid: false,
        },
        {
            id: 4,
            name: 'Late evening',
            required: false,
            time: '',
            editable: false,
            open: false,
            opendate: false,
            menu_options: [
                { id: 1, meal_id: 4, placeholder: 'Strawberries + Chocolate', value: "", valid: false },
            ],
            valid: false,
        },
        {
            id: 5,
            name: 'Dinner',
            required: true,
            time: '',
            editable: false,
            open: false,
            opendate: false,
            menu_options: [
                { id: 1, meal_id: 5, placeholder: 'Roti + Paneer korma', value: "", valid: false },
                { id: 2, meal_id: 5, placeholder: 'Vegetable curry + Chapati', value: "", valid: false },
            ],
            valid: false,
        },
    ]
};

const mealOptionSchema = z.object({
    id: z.number(),
    meal_id: z.number(),
    placeholder: z.string(),
    value: z.string().min(7, { message: 'Menu option cannot be empty' }),
})


const mealSchema = z.object({
    id: z.number(),
    name: z.string(),
    required: z.boolean(),
    time: z.string().min(1, { message: 'Time is required' }),
    open: z.boolean(),
    opendate: z.boolean(),
    menu_options: z.array(mealOptionSchema),
    valid: z.boolean(),
});

const mealsSchema = z.array(mealSchema);

const mealsSlice = createSlice({
    name: 'meals',
    initialState,
    reducers: {
        setOpen: (state, action: PayloadAction<number>) => {
            state.meals.forEach((meal: mealtype) => {
                if (action.payload == meal.id) {
                    meal.open = !meal.open;
                    return;
                }
                meal.open = false;
            })
        },
        setHandleOpenDate: (state, action: PayloadAction<{ flag: boolean, id: number }>) => {
            const { flag, id } = action.payload;
            // const meal = state.meals.find((meal) => meal.id === id);
            // if (meal) {
            //     meal.opendate = flag;
            // }
            state.meals.forEach((meal) => {
                if (meal.id == id) {
                    meal.opendate = true;
                } else {
                    meal.opendate = false;
                }
            });
        },
        updateMealTime: (state, action: PayloadAction<{ time: string, id: number }>) => {
            const { id, time } = action.payload;
            const meal = state.meals.find((meal: any) => meal.id === id);
            if (meal) {
                meal.time = time;
                const validationResult = mealSchema.safeParse(meal);
                if (!validationResult.success) {
                    console.log(validationResult.error.errors);
                    meal.valid = false;
                    if (meal.id == 1) {
                        state.meals[1].editable = false;
                        state.meals[2].editable = false;
                        state.meals[3].editable = false;
                        state.meals[4].editable = false;
                    } else if (meal.id == 3) {
                        state.meals[3].editable = false;
                        state.meals[4].editable = false;
                    }
                    return;
                } else {
                    meal.valid = true;
                    if (meal.id % 2 == 1 && meal.id <= 3) {
                        state.meals[meal.id].editable = true;
                        state.meals[meal.id + 1].editable = true;
                    }

                    const validation = mealsSchema.safeParse(state.meals);
                    if (validation.success) {
                        state.submitError = false;
                    } else {
                        state.submitError = true;
                    }
                }
            }
        },
        updateMenuOption: (state, action: PayloadAction<{ value: string; mealId: number; mealOption: number }>) => {
            const { mealId, mealOption, value } = action.payload;
            const meal = state.meals.find(meal => meal.id === mealId);

            if (meal) {
                const option = meal.menu_options.find(option => option.id === mealOption);
                if (option) {
                    option.value = value;

                    const validationResult = mealSchema.safeParse(meal);

                    if (!validationResult.success) {
                        console.log(validationResult.error.errors);
                        meal.valid = false;
                        if (meal.id == 1) {
                            state.meals[1].editable = false;
                            state.meals[2].editable = false;
                            state.meals[3].editable = false;
                            state.meals[4].editable = false;
                        } else if (meal.id == 3) {
                            state.meals[3].editable = false;
                            state.meals[4].editable = false;
                        }
                    } else {
                        meal.valid = true;
                        if (meal.id % 2 == 1 && meal.id <= 3) {
                            state.meals[meal.id].editable = true;
                            state.meals[meal.id + 1].editable = true;
                        }
                        const validation = mealsSchema.safeParse(state.meals);
                        if (validation.success) {
                            state.submitError = false;
                        } else {
                            state.submitError = true;
                        }
                    }
                }
            }
        },
        AddmoreMenuOption: (state, action: PayloadAction<number>) => {
            const meal = state.meals.find(meal => meal.id === action.payload);

            if (meal) {
                const newMenuOptionId = meal.menu_options.length ? Math.max(...meal.menu_options.map(option => option.id)) + 1 : 1; // Get a new ID
                const newMenuOption: menuOptiontype = {
                    id: newMenuOptionId,
                    meal_id: action.payload,
                    placeholder: 'eg. Upma + Apple juice',
                    value: '',
                    valid: false
                };

                meal.menu_options.push(newMenuOption);
                const validationResult = mealSchema.safeParse(meal);

                if (!validationResult.success) {
                    console.log(validationResult.error.errors);
                    meal.valid = false;
                    if (meal.id == 1) {
                        state.meals[1].editable = false;
                        state.meals[2].editable = false;
                        state.meals[3].editable = false;
                        state.meals[4].editable = false;
                    } else if (meal.id == 3) {
                        state.meals[3].editable = false;
                        state.meals[4].editable = false;
                    }
                } else {
                    meal.valid = true;
                    if (meal.id % 2 == 1 && meal.id <= 3) {
                        state.meals[meal.id].editable = true;
                        state.meals[meal.id + 1].editable = true;
                    }
                }
            }

        },
    },
});



export const { setOpen, setHandleOpenDate, updateMealTime, updateMenuOption, AddmoreMenuOption } = mealsSlice.actions;

export default mealsSlice.reducer;
