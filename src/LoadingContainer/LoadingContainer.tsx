import { forwardRef, ElementType, Ref, ReactNode, ForwardedRef } from 'react';
import { Box, CircularProgress } from '@mui/material';
import { OverridableComponent, OverrideProps } from '@mui/types';
import { SxProps, SystemProps } from '@mui/system';
import { Theme } from '@mui/material/styles';

export interface LoadingContainerTypeMap<P = {}, D extends ElementType = 'div'> {
  props: P &
    SystemProps<Theme> & {
      children?: ReactNode;
      /**
       * The component used for the root node.
       * Either a string to use a HTML element or a component.
       */
      component?: ElementType;
      ref?: Ref<unknown>;
      loading?: boolean;
      /**
       * The system prop that allows defining system overrides as well as additional CSS styles.
       */
      sx?: SxProps<Theme>;
    };
  defaultComponent: D;
}

export type LoadingContainerProps<
  D extends React.ElementType = LoadingContainerTypeMap['defaultComponent'],
  P = {}
> = OverrideProps<LoadingContainerTypeMap<P, D>, D>;

/* export interface LoadingContainerProps {
 *   sx?: SxProps<Theme>;
 *   component?: ElementType;
 *   loading?: boolean;
 * } */

function LoadingContainer(props: LoadingContainerProps, ref: ForwardedRef<any>) {
  const { sx, children, component, loading, ...rest } = props;
  return (
    <Box
      sx={[
        {
          display: 'flex',
          position: 'relative',
        },
        ...(Array.isArray(sx) ? sx : [sx]),
        loading ? { opacity: '0.7', filter: 'blur(1px)' } : {},
      ]}
      component={component}
      ref={ref}
      {...rest}
    >
      {children}
      <Box
        sx={{
          zIndex: 1500,
          display: loading ? 'flex' : 'none',
          justifyContent: 'center',
          alignItems: 'center',
          transition: 'all 0.3s cubic-bezier(0.78, 0.14, 0.15, 0.86)',
          position: 'absolute',
          left: 0,
          top: 0,
          right: 0,
          bottom: 0,
          width: '100%',
          height: '100%',
        }}
      >
        <CircularProgress color="primary" size={24} />
      </Box>
    </Box>
  );
}

export default forwardRef(LoadingContainer) as OverridableComponent<LoadingContainerTypeMap>;
