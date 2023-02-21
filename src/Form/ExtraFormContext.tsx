import { ReactNode, createContext, useContext, useMemo } from 'react';

export interface ExtraFormContextType {
  readOnly?: boolean;
}

const extraFormContext = createContext<ExtraFormContextType>({});

export const useExtraFormContext = () => useContext(extraFormContext);

export const ExtraFormProvider = (props: { children?: ReactNode; readOnly?: boolean }) => {
  const { readOnly, children } = props;

  const value = useMemo(() => {
    return { readOnly };
  }, [readOnly]);

  return <extraFormContext.Provider value={value}>{children}</extraFormContext.Provider>;
};
