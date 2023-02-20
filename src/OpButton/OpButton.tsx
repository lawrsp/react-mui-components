import { Button, type ButtonProps } from '@mui/material';

export type OpButtonProps = Omit<ButtonProps, 'variant'> & {
  visible?: boolean | (() => boolean);
};

export function OpButton(props: OpButtonProps) {
  const { visible, sx, size = 'small', ...rest } = props;

  let vis = true;
  if (visible) {
    if (typeof visible === 'function') {
      vis = visible();
    } else {
      vis = visible;
    }
  }

  return (
    <Button
      sx={[
        {
          py: 0,
          px: 0.5,
          minWidth: '2.4rem',
          display: vis ? 'block' : 'none',
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      variant="text"
      size={size}
      {...rest}
    />
  );
}

export default OpButton;
