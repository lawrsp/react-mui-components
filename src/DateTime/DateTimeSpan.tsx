import { useMemo } from 'react';
import { Box, BoxProps } from '@mui/material';
import { SxProps, Theme } from '@mui/material/styles';
import dateUtils from '../utils/date';

export interface DateTimeSpanProps {
  value: string | Date;
  format?: string;
  sx?: SxProps<Theme>;
  component?: BoxProps['component'];
}

export const DateTimeSpan = (props: DateTimeSpanProps) => {
  const { value, component = 'div', format = 'yyyy-MM-dd HH:mm:ss', sx } = props;

  const visibleValue = useMemo(() => {
    if (!value) {
      return '';
    }
    try {
      const date = dateUtils.date(value);
      const text = dateUtils.formatByString(date, format);
      return text;
    } catch (err) {
      return JSON.stringify(value);
    }
  }, [value, format]);

  return (
    <Box component={component} sx={[...(Array.isArray(sx) ? sx : [sx])]}>
      {visibleValue}
    </Box>
  );
};

export default DateTimeSpan;
