import { ThemeProvider as EmotionThemeProvider, Global } from '@emotion/react';
import { theme } from './styles/theme';
import { GlobalStyles } from './styles/GlobalStyles';
import './styles/fonts.css';
import { ThemeProvider } from './context/ThemeContext';
import Home from './pages/Home';

function App() {
  return (
    <ThemeProvider>
      <EmotionThemeProvider theme={theme}>
        <Global styles={GlobalStyles} />
        <Home />
      </EmotionThemeProvider>
    </ThemeProvider>
  );
}

export default App;
