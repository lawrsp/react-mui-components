import { useMemo } from 'react';
import { Box, BoxProps } from '@mui/material';
import { SxProps, Theme } from '@mui/material/styles';
import { formatDate, isValidDate } from '../utils/date';

export interface DateTimeSpanProps {
  value?: string | Date | number;
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

    const date = new Date(value);
    if (!isValidDate(date)) {
      return { visibleValue: JSON.stringify(value), error: true };
    }
    const text = formatDate(date, format);
    return { visibleValue: text };
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
