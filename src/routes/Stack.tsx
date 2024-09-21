import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { memo } from 'react'
import FoodDetails from '../screens/FoodDetails';
import WorkoutMeal from '../screens/WorkoutMeal';

const stack = createNativeStackNavigator();

function Stack() {
    return (
        <stack.Navigator initialRouteName='FoodDetails'>
            <stack.Screen
                name="FoodDetails"
                component={FoodDetails}
                options={{
                    headerShown: false,
                    animationTypeForReplace: "push",
                    animation: "slide_from_right",
                }}
            />
            <stack.Screen
                name="WorkoutMeal"
                component={WorkoutMeal}
                options={{
                    headerShown: false,
                    animationTypeForReplace: "push",
                    animation: "slide_from_right",
                }}
            />
        </stack.Navigator>

    )
}

export default Stack;
