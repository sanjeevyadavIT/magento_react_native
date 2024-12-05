import { create } from 'twrnc';
import { useThemeContext } from "./ThemeProvider"

const twLight = create(require('./config/tailwind.config.light'));
const twDark = create(require('./config/tailwind.config.dark'));

export type TailwindConfig = typeof twLight;

export const useTheme = (): TailwindConfig => {
    const { theme } = useThemeContext();

    const tw = theme === 'light' ? twLight : twDark;

    return tw;
}