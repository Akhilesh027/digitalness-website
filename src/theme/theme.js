export const THEME_STORAGE_KEY = 'digitalness-theme-v1';

export const DEFAULT_THEME = Object.freeze({
  primary: '#130150',
  secondary: '#6D5DFC',
  accent: '#8D4FEA',
  background: '#F7F8FB',
  surface: '#FFFFFF',
  text: '#130150'
});

export const PRESET_THEMES = Object.freeze([
  {
    id: 'digitalness',
    name: 'Digitalness',
    description: 'Original brand palette',
    colors: DEFAULT_THEME
  },
  {
    id: 'ocean',
    name: 'Ocean',
    description: 'Professional blue and teal',
    colors: {
      primary: '#0B3C5D',
      secondary: '#1D70A2',
      accent: '#2A9D8F',
      background: '#F4F8FB',
      surface: '#FFFFFF',
      text: '#102A43'
    }
  },
  {
    id: 'emerald',
    name: 'Emerald',
    description: 'Confident green with warm accent',
    colors: {
      primary: '#155E3B',
      secondary: '#198754',
      accent: '#C58B16',
      background: '#F5FAF7',
      surface: '#FFFFFF',
      text: '#173B2C'
    }
  },
  {
    id: 'sunset',
    name: 'Sunset',
    description: 'Warm premium orange and rust',
    colors: {
      primary: '#7C2D12',
      secondary: '#EA580C',
      accent: '#D97706',
      background: '#FFF7ED',
      surface: '#FFFFFF',
      text: '#431407'
    }
  },
  {
    id: 'mono',
    name: 'Monochrome',
    description: 'Neutral high-contrast system',
    colors: {
      primary: '#111827',
      secondary: '#4B5563',
      accent: '#6B7280',
      background: '#F9FAFB',
      surface: '#FFFFFF',
      text: '#111827'
    }
  }
]);

const THEME_KEYS = [
  'primary',
  'secondary',
  'accent',
  'background',
  'surface',
  'text'
];

function clampByte(value) {
  return Math.max(0, Math.min(255, Math.round(Number(value) || 0)));
}

function componentToHex(value) {
  return clampByte(value).toString(16).padStart(2, '0').toUpperCase();
}

function rgbToHex(red, green, blue) {
  return `#${componentToHex(red)}${componentToHex(green)}${componentToHex(blue)}`;
}

export function normalizeColor(value) {
  if (typeof value !== 'string') {
    return null;
  }

  const input = value.trim();

  if (/^#[0-9a-f]{3}$/i.test(input)) {
    return `#${input
      .slice(1)
      .split('')
      .map(char => `${char}${char}`)
      .join('')}`.toUpperCase();
  }

  if (/^#[0-9a-f]{6}$/i.test(input)) {
    return input.toUpperCase();
  }

  const rgbFunction = input.match(
    /^rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})(?:\s*,\s*(?:0|1|0?\.\d+))?\s*\)$/i
  );

  if (rgbFunction) {
    const values = rgbFunction.slice(1, 4).map(Number);

    if (values.every(item => item >= 0 && item <= 255)) {
      return rgbToHex(...values);
    }

    return null;
  }

  const csv = input.match(
    /^(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})$/
  );

  if (csv) {
    const values = csv.slice(1, 4).map(Number);

    if (values.every(item => item >= 0 && item <= 255)) {
      return rgbToHex(...values);
    }
  }

  return null;
}

export function hexToRgb(value) {
  const hex = normalizeColor(value);

  if (!hex) {
    return null;
  }

  return {
    r: parseInt(hex.slice(1, 3), 16),
    g: parseInt(hex.slice(3, 5), 16),
    b: parseInt(hex.slice(5, 7), 16)
  };
}

export function mixColors(first, second, secondWeight = 0.5) {
  const a = hexToRgb(first);
  const b = hexToRgb(second);

  if (!a || !b) {
    return normalizeColor(first) || normalizeColor(second) || '#000000';
  }

  const weight = Math.max(0, Math.min(1, Number(secondWeight) || 0));

  return rgbToHex(
    a.r + (b.r - a.r) * weight,
    a.g + (b.g - a.g) * weight,
    a.b + (b.b - a.b) * weight
  );
}

function rgbCss(value) {
  const rgb = hexToRgb(value) || { r: 0, g: 0, b: 0 };
  return `${rgb.r}, ${rgb.g}, ${rgb.b}`;
}

function relativeLuminance(value) {
  const rgb = hexToRgb(value);

  if (!rgb) {
    return 0;
  }

  const channels = [rgb.r, rgb.g, rgb.b].map(channel => {
    const normalized = channel / 255;
    return normalized <= 0.03928
      ? normalized / 12.92
      : ((normalized + 0.055) / 1.055) ** 2.4;
  });

  return (
    0.2126 * channels[0] +
    0.7152 * channels[1] +
    0.0722 * channels[2]
  );
}

export function getContrastRatio(first, second) {
  const a = relativeLuminance(first);
  const b = relativeLuminance(second);
  const light = Math.max(a, b);
  const dark = Math.min(a, b);
  return Number(((light + 0.05) / (dark + 0.05)).toFixed(2));
}

export function getReadableText(background) {
  const blackRatio = getContrastRatio('#111111', background);
  const whiteRatio = getContrastRatio('#FFFFFF', background);
  return whiteRatio >= blackRatio ? '#FFFFFF' : '#111111';
}

export function normalizeTheme(theme = {}) {
  const result = {};

  THEME_KEYS.forEach(key => {
    result[key] =
      normalizeColor(theme?.[key]) ||
      DEFAULT_THEME[key];
  });

  return result;
}

function hslToHex(hue, saturation, lightness) {
  const h = ((Number(hue) % 360) + 360) % 360;
  const s = Math.max(0, Math.min(100, Number(saturation))) / 100;
  const l = Math.max(0, Math.min(100, Number(lightness))) / 100;
  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = l - c / 2;

  let r = 0;
  let g = 0;
  let b = 0;

  if (h < 60) [r, g, b] = [c, x, 0];
  else if (h < 120) [r, g, b] = [x, c, 0];
  else if (h < 180) [r, g, b] = [0, c, x];
  else if (h < 240) [r, g, b] = [0, x, c];
  else if (h < 300) [r, g, b] = [x, 0, c];
  else [r, g, b] = [c, 0, x];

  return rgbToHex((r + m) * 255, (g + m) * 255, (b + m) * 255);
}

export function generateThemeFromHue(hue = 250) {
  const normalizedHue = ((Number(hue) % 360) + 360) % 360;

  return normalizeTheme({
    primary: hslToHex(normalizedHue, 72, 34),
    secondary: hslToHex(normalizedHue + 35, 74, 52),
    accent: hslToHex(normalizedHue + 165, 62, 40),
    background: hslToHex(normalizedHue, 24, 97),
    surface: '#FFFFFF',
    text: hslToHex(normalizedHue, 54, 16)
  });
}

export function createThemeVariables(themeInput) {
  const theme = normalizeTheme(themeInput);
  const primaryHover = mixColors(theme.primary, '#000000', 0.14);
  const primaryActive = mixColors(theme.primary, '#000000', 0.24);
  const secondaryHover = mixColors(theme.secondary, '#000000', 0.12);
  const accentHover = mixColors(theme.accent, '#000000', 0.12);
  const muted = mixColors(theme.text, theme.background, 0.52);
  const border = mixColors(theme.text, theme.background, 0.84);
  const soft = mixColors(theme.primary, theme.background, 0.93);
  const surfaceAlt = mixColors(theme.surface, theme.background, 0.46);
  const darkSurface = mixColors(theme.primary, '#070A12', 0.58);
  const disabledBg = mixColors(theme.primary, theme.background, 0.78);
  const disabledText = mixColors(theme.text, theme.background, 0.58);
  const onPrimary = getReadableText(theme.primary);
  const onSecondary = getReadableText(theme.secondary);
  const onAccent = getReadableText(theme.accent);
  const onDark = getReadableText(darkSurface);
  const onDarkMuted = mixColors(onDark, darkSurface, 0.36);

  return {
    '--theme-primary': theme.primary,
    '--theme-primary-rgb': rgbCss(theme.primary),
    '--theme-primary-hover': primaryHover,
    '--theme-primary-active': primaryActive,
    '--theme-secondary': theme.secondary,
    '--theme-secondary-hover': secondaryHover,
    '--theme-accent': theme.accent,
    '--theme-accent-hover': accentHover,
    '--theme-background': theme.background,
    '--theme-surface': theme.surface,
    '--theme-surface-alt': surfaceAlt,
    '--theme-text': theme.text,
    '--theme-muted': muted,
    '--theme-border': border,
    '--theme-soft': soft,
    '--theme-dark-surface': darkSurface,
    '--theme-on-primary': onPrimary,
    '--theme-on-secondary': onSecondary,
    '--theme-on-accent': onAccent,
    '--theme-on-dark': onDark,
    '--theme-on-dark-muted': onDarkMuted,
    '--theme-disabled-bg': disabledBg,
    '--theme-disabled-text': disabledText,
    '--theme-focus': theme.secondary,
    '--theme-shadow': `rgba(${rgbCss(theme.primary)}, .14)`,
    '--theme-shadow-strong': `rgba(${rgbCss(theme.primary)}, .24)`,

    /* Compatibility with the existing Digitalness CSS tokens. */
    '--bg': theme.background,
    '--surface': theme.surface,
    '--soft': soft,
    '--ink': theme.text,
    '--muted': muted,
    '--line': border,
    '--brand': theme.primary,
    '--brand2': theme.secondary,
    '--dark': darkSurface,
    '--dark2': primaryActive
  };
}

export function applyTheme(themeInput, options = {}) {
  const theme = normalizeTheme(themeInput);
  const { persist = false } = options;

  if (typeof document !== 'undefined') {
    const root = document.documentElement;
    const variables = createThemeVariables(theme);

    Object.entries(variables).forEach(([name, value]) => {
      root.style.setProperty(name, value);
    });

    root.dataset.digitalnessTheme = 'active';
  }

  if (persist && typeof window !== 'undefined') {
    try {
      window.localStorage.setItem(
        THEME_STORAGE_KEY,
        JSON.stringify(theme)
      );
    } catch {
      /* Local storage can be unavailable in privacy-restricted contexts. */
    }
  }

  if (typeof window !== 'undefined') {
    window.dispatchEvent(
      new CustomEvent('digitalness-theme-change', {
        detail: { theme, persisted: persist }
      })
    );
  }

  return theme;
}

export function getSavedTheme() {
  if (typeof window === 'undefined') {
    return { ...DEFAULT_THEME };
  }

  try {
    const raw = window.localStorage.getItem(THEME_STORAGE_KEY);

    if (!raw) {
      return { ...DEFAULT_THEME };
    }

    return normalizeTheme(JSON.parse(raw));
  } catch {
    return { ...DEFAULT_THEME };
  }
}

let storageSyncBound = false;

export function initializeTheme() {
  const saved = getSavedTheme();
  applyTheme(saved, { persist: false });

  if (
    typeof window !== 'undefined' &&
    !storageSyncBound
  ) {
    storageSyncBound = true;

    window.addEventListener('storage', event => {
      if (event.key !== THEME_STORAGE_KEY) {
        return;
      }

      if (!event.newValue) {
        applyTheme(DEFAULT_THEME, { persist: false });
        return;
      }

      try {
        applyTheme(JSON.parse(event.newValue), { persist: false });
      } catch {
        applyTheme(DEFAULT_THEME, { persist: false });
      }
    });
  }

  return saved;
}
