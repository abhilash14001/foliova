import { createSlice } from '@reduxjs/toolkit';

// Function to get initial theme from localStorage or system preference
const getInitialTheme = () => {
    const persistedTheme = localStorage.getItem('theme');
    if (persistedTheme) {
        return persistedTheme;
    }
    // Optional: Check system preference
    // const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    // return prefersDark ? 'dark' : 'light';
    return 'light'; // Default to light
};

const initialState = {
    mode: getInitialTheme(),
};

const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        toggleTheme: (state) => {
            state.mode = state.mode === 'light' ? 'dark' : 'light';
            localStorage.setItem('theme', state.mode); // Persist theme choice
        },
        setTheme: (state, action) => {
            state.mode = action.payload;
            localStorage.setItem('theme', state.mode);
        }
    },
});

export const { toggleTheme, setTheme } = themeSlice.actions;
export default themeSlice.reducer;