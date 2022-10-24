type SizeProps = 'auto' | number | boolean;

export interface GridProps {
  xs?: SizeProps; // extra-small: 0px
  sm?: SizeProps; // small: 600px
  md?: SizeProps; // medium: 900px
  lg?: SizeProps; // large: 1200px
  xl?: SizeProps; // extra-large: 1536px
}
