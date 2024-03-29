import { Ref } from 'react';
import { ResizeObserver } from '@juggle/resize-observer';
import libUseResizeObserver from 'use-resize-observer';

const useResizeObserver: typeof libUseResizeObserver = (opt) => {
  if (!window.ResizeObserver) {
    window.ResizeObserver = ResizeObserver;
  }
  return libUseResizeObserver(opt);
};

export default useResizeObserver;

export interface BreakpointsConfig<D> {
  b: number;
  v: D;
}

export interface BreakpointResult<T, D> {
  ref: Ref<T>;
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
