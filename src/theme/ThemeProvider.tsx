import {createContext, ReactNode, useContext, useState} from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: (newTheme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const useThemeContext = (): ThemeContextType => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('useThemeContext must be used within a ThemeProvider');
  }

  return context;
};

interface ThemeProviderProps {
	children: ReactNode;
	initialTheme: Theme;
}

const ThemeProvider: React.FC<ThemeProviderProps> = ({ children, initialTheme = 'light' }) => {
	const [theme, setTheme] = useState<Theme>(initialTheme);

	const toggleTheme = (newTheme: Theme) => setTheme(newTheme);

	return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
};

export { useThemeContext, ThemeProvider };