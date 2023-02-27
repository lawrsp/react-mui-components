import { type SyntheticEvent, useMemo } from 'react';
import { styled } from '@mui/system';
import { useTheme } from '@mui/material';
import { SxProps, Theme } from '@mui/material/styles';
import NumberColumn from './NumberColumn';

const Root = styled('div')(({ theme }) => ({
  position: 'relative',
  fontSize: '1.6rem',
  color: theme.palette.text.primary,
}));

const Head = styled('div')({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  height: '3.2rem',
  lineHeight: '3.2rem',
  fontSize: '1.4rem',
  fontWeight: 500,
  textAlign: 'left',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'stretch',
});

const Container = styled('div')({
  position: 'absolute',
  fontSize: '1.4rem',
  top: '3.2rem',
  left: 0,
  right: 0,
  bottom: 0,
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'stretch',
});

const Column = styled('div')({
  overflow: 'hidden',
  width: '32.333%',
  cursor: 'pointer',
});

const valueFormatter = (v: number) => `00${v}`.slice(-2);

export interface TimeScrollProps {
  value?: Date | string | number | null;
  onChange?: (val: Date, ev: SyntheticEvent) => any;
  sx?: SxProps<Theme>;
}

const TimeScroll = (props: TimeScrollProps) => {
  const { value, onChange, sx } = props;

  const theme = useTheme();

  const dateValue = useMemo(() => {
    if (!value) {
      return undefined;
    }

    try {
      const dateValue = new Date(value);
      if (isNaN(dateValue.getTime())) {
        return undefined;
      }

      return dateValue;
    } catch {
      return undefined;
    }
  }, [value]);

  const handleSelectItem = (
    { newVal, idx }: { newVal: number; idx: 0 | 1 | 2 },
    ev: SyntheticEvent
  ) => {
    const nd = dateValue || new Date(0);
    if (idx === 0) {
      nd.setHours(newVal);
    } else if (idx === 1) {
      nd.setMinutes(newVal);
    } else if (idx === 2) {
      nd.setSeconds(newVal);
    }

    if (onChange) {
      return onChange(nd, ev);
    }
  };

  const [hours, minutes, seconds] = useMemo(() => {
    if (!dateValue) {
      return [undefined, undefined, undefined];
    }
    return [dateValue.getHours(), dateValue.getMinutes(), dateValue.getSeconds()];
  }, [dateValue]);

  const handleSelectItemFn = (idx: 0 | 1 | 2) => (newVal: number, ev: SyntheticEvent) => {
    return handleSelectItem({ newVal, idx }, ev);
  };

  return (
    <Root sx={[{ width: 168 }, ...(Array.isArray(sx) ? sx : [sx])]}>
      <Head>
        <Column sx={{ display: 'inline-flex', justifyContent: 'center' }}>时</Column>
        <Column sx={{ display: 'inline-flex', justifyContent: 'center' }}>分</Column>
        <Column sx={{ display: 'inline-flex', justifyContent: 'center' }}>秒</Column>
      </Head>
      <Container>
        <Column sx={{ borderCollapse: 'collapse' }}>
          <NumberColumn
            max={23}
            value={hours}
            valueFormatter={valueFormatter}
            onChange={handleSelectItemFn(0)}
          />
        </Column>
        <Column
          sx={{
            borderCollapse: 'collapse',
            borderInlineStart: `0.8px solid  ${theme.palette.divider}`,
          }}
        >
          <NumberColumn
            max={59}
            value={minutes}
            valueFormatter={valueFormatter}
            onChange={handleSelectItemFn(1)}
          />
        </Column>
        <Column
          sx={{
            borderCollapse: 'collapse',
            borderInlineStart: `0.8px solid ${theme.palette.divider}`,
          }}
        >
          <NumberColumn
            max={59}
            value={seconds}
            valueFormatter={valueFormatter}
            onChange={handleSelectItemFn(2)}
          />
        </Column>
      </Container>
    </Root>
  );
};

export default TimeScroll;
