import Grid, { Grid2Props } from '@mui/material/Unstable_Grid2';

export const FormItem = (props: Grid2Props) => {
  const { children, sx, ...rest } = props;

  return (
    <Grid xs={12} sx={[{ pt: 1, pb: 0.5 }, ...(Array.isArray(sx) ? sx : [sx])]} {...rest}>
      {children}
    </Grid>
  );
};
