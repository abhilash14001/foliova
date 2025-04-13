import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { lightTheme, darkTheme } from './styles/theme';
import { GlobalStyles } from './styles/GlobalStyles';
import { setTheme } from './store/themeSlice'; // Import setTheme if needed for initial load

// Layout Components
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';

// Pages
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ProjectsPage from './pages/ProjectsPage';
import ContactPage from './pages/ContactPage';

// Optional: Add a loading screen component
// import LoadingScreen from './components/common/LoadingScreen';

function App() {
    const { mode } = useSelector((state) => state.theme);
    const dispatch = useDispatch();
    const currentTheme = mode === 'light' ? lightTheme : darkTheme;

    // Optional: Check system preference on initial load if not in localStorage
    // useEffect(() => {
    //   const persistedTheme = localStorage.getItem('theme');
    //   if (!persistedTheme) {
    //     const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    //     dispatch(setTheme(prefersDark ? 'dark' : 'light'));
    //   }
    // }, [dispatch]);


    // Add a class to the body for potential global CSS overrides or JS hooks
    useEffect(() => {
        document.body.className = mode; // Adds 'light' or 'dark' class to body
    }, [mode]);


    return (
        <ThemeProvider theme={currentTheme}>
            <GlobalStyles />
            <Router>
                {/* Optional: <LoadingScreen /> */}
                <Header />
                <main> {/* Add a main tag for content */}
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/about" element={<AboutPage />} />
                        <Route path="/projects" element={<ProjectsPage />} />
                        <Route path="/contact" element={<ContactPage />} />
                        {/* Add more routes as needed */}
                    </Routes>
                </main>
                <Footer />
            </Router>
        </ThemeProvider>
    );
}

export default App;