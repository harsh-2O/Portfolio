import styled from '@emotion/styled';
import { useTheme } from '../../context/ThemeContext';

const Toggle = styled.button`
  width: 40px;
  height: 40px;
  display: inline-flex;

  @media (max-width: 1024px) {
    width: 44px;
    height: 44px;
  }
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-pill);
  background: transparent;
  color: var(--text-muted);
  transition: color var(--transition-fast), background-color var(--transition-fast);

  @media (hover: hover) {
    &:hover {
      color: var(--text-primary);
      background: var(--surface-sunken);
    }
  }

  svg {
    width: 16px;
    height: 16px;
    stroke: currentColor;
    stroke-width: 1.5;
    fill: none;
    stroke-linecap: round;
    stroke-linejoin: round;
  }
`;

export default function ThemeToggle() {
  const { isDarkMode, toggleDarkMode } = useTheme();

  return (
    <Toggle
      type="button"
      onClick={toggleDarkMode}
      aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
      aria-pressed={isDarkMode}
      data-cursor={isDarkMode ? 'Light' : 'Dark'}
    >
      {isDarkMode ? (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M21 12.79A9 9 0 1111.21 3a7 7 0 009.79 9.79z" />
        </svg>
      )}
    </Toggle>
  );
}
