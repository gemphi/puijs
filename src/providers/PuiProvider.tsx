'use client';

import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { Theme, ThemeStyle, ThemePreferences, PuiContextValue } from './types';
import { BRAND_THEMES } from './themes';
import { ServiceProvider } from '../services/ServiceProvider';
import { IServiceContainer } from '../services/types';

export * from './types';
export * from './themes';

const PuiContext = createContext<PuiContextValue>({
  theme: 'system',
  setTheme: () => {},
  themeStyle: 'apple',
  setThemeStyle: () => {},
  brandId: 'foundry',
  setBrandId: () => {},
  preferences: { theme: 'system', themeStyle: 'apple', brandId: 'foundry' },
  setPreferences: () => {},
  brands: BRAND_THEMES,
  isDark: false,
});

export const usePuiTheme = () => useContext(PuiContext);
export const usePhiTheme = usePuiTheme;
export const usePTheme = usePuiTheme;
export const useVvidTheme = usePuiTheme;

const getIsDark = (t: Theme) => {
  if (typeof window === 'undefined') return false;
  return t === 'dark' || (t === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
};

const applyDOMTheme = (theme: Theme, brandId: string, style: ThemeStyle) => {
  if (typeof document === 'undefined') return;
  const root = document.documentElement;
  const isDark = getIsDark(theme);
  root.classList.toggle('dark', isDark);
  root.setAttribute('data-theme', isDark ? 'dark' : 'light');
  root.setAttribute('data-theme-style', style);

  const brand = BRAND_THEMES.find((b) => b.id === brandId) || BRAND_THEMES[0];
  const { colors } = brand;
  const gradient = isDark ? brand.gradientDark : brand.gradient;
  root.setAttribute('data-brand', brand.id);
  root.style.setProperty('--phi-color-primary', colors.primary);
  root.style.setProperty('--phi-color-primary-hover', colors.primaryHover);
  root.style.setProperty('--phi-color-primary-light', isDark ? colors.primaryLightDark : colors.primaryLight);
  root.style.setProperty('--phi-color-primary-dark', isDark ? colors.primary : colors.primaryHover);
  root.style.setProperty('--phi-color-secondary', colors.secondary);
  root.style.setProperty('--phi-color-secondary-hover', colors.secondaryHover);
  root.style.setProperty('--phi-color-success', colors.success);
  root.style.setProperty('--phi-color-success-light', isDark ? colors.successLightDark : colors.successLight);
  root.style.setProperty('--phi-color-warning', colors.warning);
  root.style.setProperty('--phi-color-warning-light', isDark ? colors.warningLightDark : colors.warningLight);
  root.style.setProperty('--phi-color-error', colors.error);
  root.style.setProperty('--phi-color-error-hover', colors.errorHover);
  root.style.setProperty('--phi-color-error-light', isDark ? colors.errorLightDark : colors.errorLight);
  root.style.setProperty('--phi-color-info', colors.info);
  root.style.setProperty('--phi-color-info-hover', colors.infoHover);
  root.style.setProperty('--phi-color-info-light', isDark ? colors.infoLightDark : colors.infoLight);
  root.style.setProperty('--phi-brand-gradient', gradient);
  root.style.setProperty('--phi-gradient-brand', gradient);
};

export interface PuiProviderProps {
  children: React.ReactNode;
  defaultTheme?: Theme;
  defaultThemeStyle?: ThemeStyle;
  defaultBrand?: string;
  container?: IServiceContainer;
}

export const PuiProvider: React.FC<PuiProviderProps> = ({
  children,
  defaultTheme = 'system',
  defaultThemeStyle = 'apple',
  defaultBrand = 'foundry',
  container,
}) => {
  const [theme, setThemeState] = useState<Theme>(() => (typeof window !== 'undefined' ? (localStorage.getItem('phi-theme') as Theme) || defaultTheme : defaultTheme));
  const [themeStyle, setThemeStyleState] = useState<ThemeStyle>(() => (typeof window !== 'undefined' ? (localStorage.getItem('phi-style') as ThemeStyle) || defaultThemeStyle : defaultThemeStyle));
  const [brandId, setBrandIdState] = useState<string>(() => (typeof window !== 'undefined' ? localStorage.getItem('phi-brand') || defaultBrand : defaultBrand));
  const [systemDark, setSystemDark] = useState(() => (typeof window !== 'undefined' ? window.matchMedia('(prefers-color-scheme: dark)').matches : false));
  const isDark = theme === 'dark' || (theme === 'system' && systemDark);

  useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    const onChange = (event: MediaQueryListEvent) => setSystemDark(event.matches);
    setSystemDark(media.matches);
    media.addEventListener('change', onChange);
    return () => media.removeEventListener('change', onChange);
  }, []);

  useEffect(() => {
    applyDOMTheme(theme, brandId, themeStyle);
  }, [theme, brandId, themeStyle, systemDark]);

  const setTheme = (t: Theme) => { setThemeState(t); localStorage.setItem('phi-theme', t); };
  const setThemeStyle = (s: ThemeStyle) => { setThemeStyleState(s); localStorage.setItem('phi-style', s); };
  const setBrandId = (b: string) => { setBrandIdState(b); localStorage.setItem('phi-brand', b); };
  const setPreferences = (preferences: Partial<ThemePreferences>) => {
    if (preferences.theme) setTheme(preferences.theme);
    if (preferences.themeStyle) setThemeStyle(preferences.themeStyle);
    if (preferences.brandId) setBrandId(preferences.brandId);
  };
  const preferences = useMemo(() => ({ theme, themeStyle, brandId }), [theme, themeStyle, brandId]);

  return (
    <PuiContext.Provider value={{ theme, setTheme, themeStyle, setThemeStyle, brandId, setBrandId, preferences, setPreferences, brands: BRAND_THEMES, isDark }}>
      <ServiceProvider container={container}>{children}</ServiceProvider>
    </PuiContext.Provider>
  );
};

export const PhiProvider = PuiProvider;
export const PProvider = PuiProvider;
export default PuiProvider;
