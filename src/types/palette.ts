import { Theme } from './theme'

export type Colors = {
  primary: string,
  secondary: string,
  accent: string,
  info: string,
  success: string,
  warning: string,
  error: string,
}

export type Palette = Record<Theme, Colors>
