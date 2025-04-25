import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider as EmotionThemeProvider, Global } from '@emotion/react';
import { theme } from './styles/theme';
import { GlobalStyles } from './styles/GlobalStyles';
import { ThemeProvider } from './context/ThemeContext';
import Home from './pages/Home';

function App() {
  return (
    <ThemeProvider>
      <EmotionThemeProvider theme={theme}>
        <Global styles={GlobalStyles} />
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </Router>
      </EmotionThemeProvider>
    </ThemeProvider>
  );
}

export default App;
