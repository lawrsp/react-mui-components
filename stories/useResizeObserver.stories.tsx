import React from 'react';
import useResizeObserver, { useBreakpoints } from '../src/utils/useResizeObserver';

export default {
  title: 'Example/useResizeObserver',
};

export const ContainerMatrics = () => {
  const { ref, width, height } = useResizeObserver<HTMLDivElement>();

  return (
    <div>
      <div>width is : {width}</div>
      <div>height is : {height}</div>
      <div
        ref={ref}
        style={{ resize: 'both', background: '#f1f2f3', width: 200, height: 300, overflow: 'auto' }}
      />
    </div>
  );
};

export const ContainerFlexGrid = () => {
  const { v, ref, containerWidth } = useBreakpoints<HTMLDivElement, string>([
    { b: 100, v: '100%' },
    { b: 600, v: 'calc(50% - 1.5px)' },
    { b: 900, v: 'calc(33.333333% - 2px)' },
    { b: 1200, v: 'calc(20% - 2.4px)' },
  ]);

  const style = {
    flexBasis: v,
    backgroundColor: 'gray',
    height: 30,
  };

  return (
    <div
      ref={ref}
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '3px',
        overflow: 'auto',
        background: 'red',
        resize: 'horizontal',
      }}
    >
      <div style={{ flexBasis: '100%' }}>
        container width: {containerWidth}px, item width: {v}, gap: 3px
      </div>
      <div style={style}>box</div>
      <div style={style}>box</div>
      <div style={style}>box</div>
      <div style={style}>box</div>
      <div style={style}>box</div>
      <div style={style}>box</div>
      <div style={style}>box</div>
      <div style={style}>box</div>
      <div style={style}>box</div>
      <div style={style}>box</div>
    </div>
  );
};

export const ContainerBlockGrid = () => {
  const { v, ref, containerWidth } = useBreakpoints<HTMLDivElement, number>([
    { b: 100, v: 1 },
    { b: 600, v: 2 },
    { b: 900, v: 3 },
    { b: 1200, v: 5 },
  ]);

  const gap = 3;

  const itemWidth = (containerWidth - (v - 1) * gap) / v;

  const style = {
    width: itemWidth,
    backgroundColor: 'gray',
    height: 30,
  };

  return (
    <div
      ref={ref}
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap,
        overflow: 'auto',
        background: 'red',
        resize: 'horizontal',
      }}
    >
      <div style={{ flexBasis: '100%' }}>
        container width: {containerWidth}px, item width: {v}px, gap: {gap}px
      </div>
      <div style={style}>box</div>
      <div style={style}>box</div>
      <div style={style}>box</div>
      <div style={style}>box</div>
      <div style={style}>box</div>
      <div style={style}>box</div>
      <div style={style}>box</div>
      <div style={style}>box</div>
      <div style={style}>box</div>
      <div style={style}>box</div>
    </div>
  );
};
