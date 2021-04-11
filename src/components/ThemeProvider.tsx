import React from 'react';
import { ITheme } from '../types';

interface Props {
  children?: React.ReactNode | null;
}

const defaultProps: Props = {
  children: null,
};

export const ThemeContext = React.createContext<ITheme | undefined>(undefined);

const ThemeProvider: React.FC<Props> = ({ children }: Props) => {
  const style = getComputedStyle(document.body);
  const colors: ITheme = {
    primary: style.getPropertyValue('--primary'),
    secondary: style.getPropertyValue('--secondary'),
    success: style.getPropertyValue('--success'),
    info: style.getPropertyValue('--info'),
    warning: style.getPropertyValue('--warning'),
    danger: style.getPropertyValue('--danger'),
    light: style.getPropertyValue('--light'),
    dark: style.getPropertyValue('--dark'),
  };
  return <ThemeContext.Provider value={colors}>{children}</ThemeContext.Provider>;
};

ThemeProvider.defaultProps = defaultProps;

export default ThemeProvider;
