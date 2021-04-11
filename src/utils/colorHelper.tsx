export const hexToRgb = (hex: string): { r: number; g: number; b: number } | null => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
};

const componentToHex = (c): string => {
  const hex = c.toString(16);
  return hex.length == 1 ? '0' + hex : hex;
};

export const rgbToHex = (r: number, g: number, b: number, a?: number): string => {
  if (!a) a = 1;
  return '#' + componentToHex(r) + componentToHex(g) + componentToHex(b) + componentToHex(b);
};

export const rgbObjectToHex = (rgb: { r: number; g: number; b: number }, a?: number): string => {
  return rgbToHex(rgb.r, rgb.g, rgb.b, a);
};
