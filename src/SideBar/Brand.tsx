import { MouseEventHandler } from 'react';
import { Box, Link } from '@mui/material';

interface BrandProps {
  logo: string;
  text: string;
  onClick?: MouseEventHandler;
}

const Brand = ({ logo, text, onClick }: BrandProps) => {
  return (
    <Box
      sx={{
        display: 'flex',
        height: '100%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
      }}
    >
      <Link
        underline="none"
        onClick={onClick}
        sx={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Box
          sx={{
            height: '3.2rem',
          }}
          component="img"
          src={logo}
          alt="logo"
        />
        <Box sx={{ width: '16px' }} />
        <Box
          sx={{
            margin: 0,
            color: '#fff',
            fontWeight: 600,
            fontSize: '2rem',
          }}
          component="span"
        >
          {text}
        </Box>
      </Link>
    </Box>
  );
};

export default Brand;
