import { useRef, useEffect, useState } from 'react';
import { Box, Paper } from '@mui/material';
import LoadingContainer from '../src/LoadingContainer/LoadingContainer';

export default {
  title: 'Example/Containers/LoadingContainer',
  component: LoadingContainer,
};

export const Loading = () => {
  const ref = useRef<HTMLDivElement>(null);

  const [str, setStr] = useState<string>('click the button first');
  const handleOnClick = () => {
    console.log('ref rect is:', ref?.current?.getBoundingClientRect());
    setStr(JSON.stringify(ref.current?.getBoundingClientRect()));
  };

  return (
    <>
      <button onClick={handleOnClick}>click</button>
      <LoadingContainer
        ref={ref}
        loading
        sx={{
          height: 300,
          width: 600,
          background: '#f2f3f4',
          wordBreak: 'break-all',
        }}
      >
        <Box>hello world: {str}</Box>
      </LoadingContainer>
    </>
  );
};

export const SetContainer = () => {
  const [container, setContainer] = useState<HTMLDivElement>();

  useEffect(() => {
    const bounds = container?.getBoundingClientRect();
    if (bounds) {
      console.log(bounds);
    }
  }, [container]);

  return (
    <LoadingContainer
      ref={setContainer}
      sx={{
        height: 300,
        width: 600,
        background: '#f2f3f4',
        wordBreak: 'break-all',
      }}
    >
      <Box>hello world: {JSON.stringify(container?.getBoundingClientRect())}</Box>
    </LoadingContainer>
  );
};

export const PaperContainer = () => {
  return (
    <Paper elevation={3} sx={{ height: 300, width: 600 }}>
      <LoadingContainer
        sx={{ height: '100%', width: '100%', wordBreak: 'break-all' }}
        component={Paper}
        loading
        elevation={3}
      >
        <Box>hello world</Box>
      </LoadingContainer>
    </Paper>
  );
};
