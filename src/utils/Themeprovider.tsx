import React from 'react';
import { MD3LightTheme as DefaultTheme, PaperProvider } from 'react-native-paper';


const theme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        primary: 'tomato',
        secondary: 'yellow',
    },
};

function Themeprovider({
    children,
}: {
    children: React.ReactNode;
}) {
    const theme = {
        ...DefaultTheme,
        myOwnProperty: true,
        colors: {
            ...DefaultTheme.colors,
        },
    };
    return <PaperProvider theme={theme}>{children}</PaperProvider>
}

export default Themeprovider
