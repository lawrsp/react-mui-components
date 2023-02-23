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

  const { visibleValue, error } = useMemo(() => {
    if (!value) {
      return { visibleValue: '' };
    }
    try {
      const date = dateUtils.date(value);
      const text = dateUtils.formatByString(date, format);
      return { visibleValue: text };
    } catch (err) {
      return { visibleValue: JSON.stringify(value), error: true };
    }
  }, [value, format]);

  return (
    <Box
      component={component}
      sx={[
        error
          ? {
              color: 'error.main',
            }
          : {},
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      {visibleValue}
    </Box>
  );
};

export default DateTimeSpan;
