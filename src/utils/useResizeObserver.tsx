import React from 'react';
import { ResizeObserver } from '@juggle/resize-observer';
import useResizeObserver from 'use-resize-observer';

if (!window.ResizeObserver) {
  window.ResizeObserver = ResizeObserver;
}

export default useResizeObserver;

export interface BreakpointsConfig<D> {
  b: number;
  v: D;
}

export interface BreakpointResult<T, D> {
  ref: React.Ref<T>;
  v: D;
  containerWidth: number;
  containerHeight: number;
}

export function useBreakpoints<T extends HTMLElement, D>(
  breakpoints: BreakpointsConfig<D>[]
): BreakpointResult<T, D> {
  const { ref, width = 0, height = 0 } = useResizeObserver();

  let calcedWidth = breakpoints[0].v;
  if (!width) {
    return {
      ref,
      v: calcedWidth,
      containerWidth: width,
      containerHeight: height,
    };
  }

  for (let i = 0; i < breakpoints.length; i += 1) {
    if (width >= breakpoints[i].b) {
      calcedWidth = breakpoints[i].v;
    } else {
      break;
    }
  }

  return { ref, v: calcedWidth, containerWidth: width, containerHeight: height };
}
