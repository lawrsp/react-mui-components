import { SyntheticEvent, ReactNode } from 'react';

interface ProTableSelectableProps<DataType> {
  type: 'checkbox' | 'radio';
  rowSelection: boolean;
  selectedRowIndexes: Array<number>;
  renderRowCell?: (record: DataType, index: number) => ReactNode;
  onSelect: (
    ev: SyntheticEvent,
    record: DataType,
    selected: boolean,
    selectedRowIndexes: Array<number>
  ) => void | Promise<void>;

  onSelectAll: (
    ev: SyntheticEvent,
    selected: boolean,
    selectedRowIndexes: Array<number>
  ) => void | Promise<void>;
}

const useSelectionRow = () => {
  return {};
};

export default useSelectionRow;
