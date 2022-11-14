import * as React from 'react';
import { Box, CircularProgress } from '@mui/material';
import QRCode from 'qrcode.react';
import { SxProps, Theme } from '@mui/material/styles';

export interface QRCodeBoxProps {
  value: string;
  loading?: boolean;
  sx?: SxProps<Theme>;

  level?: 'L' | 'M' | 'Q' | 'H';
  size?: number;
  bgColor?: string;
  fgColor?: string;
}

export const QRCodeBox = (props: QRCodeBoxProps) => {
  const { value = '', sx, size, loading, ...rest } = props;

  return (
    <Box
      sx={[
        {
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          bgcolor: 'background.default',
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      {loading ? (
        <Box
          sx={{
            padding: 1,
          }}
        >
          <CircularProgress size={32} />
        </Box>
      ) : (
        <QRCode value={value} size={size} {...rest} />
      )}
    </Box>
  );
};

export default QRCodeBox;
