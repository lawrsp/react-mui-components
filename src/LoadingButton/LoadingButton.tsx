import { forwardRef, Ref, ReactNode } from 'react';
import { Button, ButtonProps, CircularProgress } from '@mui/material';

export interface LoadingButtonProps extends ButtonProps {
  /**
   * If `true`, the loading indicator is shown.
   * @default false
   */
  loading?: boolean;
  /**
   * Element placed before the children if the button is in loading state.
   * The node should contain an element with `role="progressbar"` with an accessible name.
   * By default we render a `CircularProgress` that is labelled by the button itself.
   * @default <CircularProgress color="inherit" size={16} />
   */
  loadingIndicator?: React.ReactNode;
  indicatorColor?: ButtonProps['color'];
  /**
   * The loading indicator can be positioned on the start, end, or the center of the button.
   * @default 'center'
   */
  loadingPosition?: 'start' | 'end' | 'center';
}

export const LoadingButton = forwardRef(
  (props: LoadingButtonProps, ref: Ref<HTMLButtonElement>) => {
    const {
      loading,
      size = 'medium',
      color = 'primary',
      indicatorColor,
      loadingIndicator,
      loadingPosition,
      onClick,
      children,
      disabled,
      ...rest
    } = props;

    const overrideIconProps = {} as {
      startIcon?: ReactNode;
      endIcon?: ReactNode;
    };

    if (loading) {
      let overrideIcon: ReactNode;
      if (loadingIndicator) {
        overrideIcon = loadingIndicator;
      } else {
        let circleSize = 14;
        if (size == 'small') {
          circleSize = 13;
        } else if (size === 'medium') {
          circleSize = 14;
        } else if (size === 'large') {
          circleSize = 15;
        }
        let circleColor = color;
        /* if (indicatorColor) {
         *   circleColor = indicatorColor;
         * } else if (
         *   ['primary', 'secondary', 'success', 'error', 'info', 'warning'].indexOf(color) >= 0
         * ) {
         *   if (rest.variant === 'contained') {
         *     circleColor = `${color}.contrastText` as CircularProgressProps['color'];
         *   } else {
         *     circleColor = color;
         *   }
         * } */
        overrideIcon = <CircularProgress color={circleColor} size={circleSize} />;
      }

      if (loadingPosition === 'end') {
        overrideIconProps.endIcon = overrideIcon;
      } else {
        overrideIconProps.startIcon = overrideIcon;
      }
    }

    const handleClick: React.MouseEventHandler<HTMLButtonElement> = (event) => {
      if (loading) {
        event.preventDefault();
        return;
      }

      return onClick?.(event);
    };

    return (
      <Button
        ref={ref}
        color={color}
        size={size}
        {...rest}
        disabled={disabled || loading}
        {...overrideIconProps}
        onClick={handleClick}
        disableElevation={loading}
        disableFocusRipple={loading}
        disableTouchRipple={loading}
        disableRipple={loading}
      >
        {children}
      </Button>
    );
  }
);

export default LoadingButton;
