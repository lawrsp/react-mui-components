import { ReactNode } from 'react';
import { Box, Divider } from '@mui/material';

export interface ProTableRichTitleProps {
  title: ReactNode;
  children?: ReactNode;
}

const ProTableRichTitle = (props: ProTableRichTitleProps) => {
  const { title, children } = props;

  return (
    <Box
      sx={{
        lineHeight: 1.43,
        display: 'flex',
        pt: 2,
        pl: 2,
        pr: 2,
        pb: 1,
        alignItems: 'center',
      }}
    >
      <Box
        sx={{
          fontSize: '1.6rem',
          fontWeight: 'bold',
          flexGrow: 1,
        }}
      >
        {title}
      </Box>
      {children}
    </Box>
  );
};

export default ProTableRichTitle;

/* {!!children && (
 *   <Divider
 *     orientation="vertical"
 *     sx={{
 *       ml: 2,
 *     }}
 *   />
 * )}
 * {children} */
