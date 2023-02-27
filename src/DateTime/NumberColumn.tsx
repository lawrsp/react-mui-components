import React, { SyntheticEvent, useMemo, useEffect, useRef } from 'react';
import { useSpring, animated } from '@react-spring/web';
import { List, ListItemButton } from '@mui/material';
import { SxProps, Theme } from '@mui/material/styles';
import { styled } from '@mui/system';

const Column = styled(List)({
  '&::after': {
    display: 'block',
    height: '196px',
    content: '""',
  },
});

const ColumnItem = styled(ListItemButton)(({ theme }) => {
  return {
    width: '47px',
    margin: '0 4px',
    padding: 0,
    lineHeight: '28px',
    justifyContent: 'center',
    '&.Mui-selected': {
      background: theme.palette.primary.main,
      color: theme.palette.primary.contrastText,
      '&:hover': {
        background: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
      },
    },
  };
});

const Root = styled(animated.div)(({ theme }) => ({
  padding: 0,
  margin: 0,
  height: '100%',
  color: theme.palette.text.primary,
  overflowY: 'hidden',
  overflowX: 'hidden',
  '&:hover': {
    overflowY: 'auto',
  },
}));

export interface NumberColumnProps {
  min?: number;
  step?: number;
  max: number;
  value?: number;
  onChange?: (val: number, ev: SyntheticEvent) => any;
  valueFormatter?: (val: number) => string;
  sx?: SxProps<Theme>;
}

const defaultValueFormatter = (val: number) => `${val}`;

const NumberColumn = (props: NumberColumnProps) => {
  const rootRef = React.useRef<HTMLDivElement | null>(null);
  const [node, setNode] = React.useState<HTMLDivElement | null>(null);
  const isFirstInit = useRef(true);

  const {
    max,
    step = 1,
    min = 0,
    sx,
    onChange,
    value,
    valueFormatter = defaultValueFormatter,
  } = props;

  const values = useMemo(() => {
    const result = [];
    for (let i = min; i <= max; i = i + step) {
      result.push(i);
    }
    return result;
  }, [max, min, step]);

  const [springs, api] = useSpring(() => {
    return {
      from: { scrollTop: 0 },
      to: { scrollTop: 0 },
      immediate: true,
    };
  }, []);

  useEffect(() => {
    if (!node) {
      return;
    }
    const newTop = node.offsetTop;

    if (isFirstInit.current) {
      api.start({
        from: { scrollTop: newTop },
        to: { scrollTop: newTop },
        immediate: true,
      });

      isFirstInit.current = false;
      return;
    }

    const currentTop = rootRef.current?.scrollTop;
    console.log('scroll from:', currentTop, 'to:', newTop);
    api.start({
      from: { scrollTop: currentTop },
      to: { scrollTop: newTop },
      immediate: false,
    });
  }, [node]);

  /* console.log('sprints.scrollTop', springs.scrollTop); */

  const handleClick = (ev: SyntheticEvent<HTMLDivElement>, val: number) => {
    if (onChange) {
      onChange(val, ev);
    }
  };

  /* to: { scroll: offsetTop },
   *       from: { scroll: scrollTop },
   *       reset: true,

   */
  return (
    <Root ref={rootRef} scrollTop={springs.scrollTop} sx={[...(Array.isArray(sx) ? sx : [sx])]}>
      <Column>
        {values.map((v, idx) => (
          <ColumnItem
            key={`${idx}-${v}`}
            selected={v === value}
            ref={v === value ? setNode : undefined}
            disableRipple
            onClick={(ev) => handleClick(ev, v)}
          >
            {valueFormatter(v)}
          </ColumnItem>
        ))}
      </Column>
    </Root>
  );
};

export default NumberColumn;
