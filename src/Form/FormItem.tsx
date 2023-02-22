import Grid, { Grid2Props } from '@mui/material/Unstable_Grid2';

export const FormItem = (props: Grid2Props) => {
  const { children, ...rest } = props;

  return (
    <Grid xs={12} {...rest}>
      {children}
    </Grid>
  );
};
