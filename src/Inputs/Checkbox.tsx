import { ReactNode, SyntheticEvent, useState, useEffect } from 'react';
import {
  FormControlLabel,
  Checkbox as MuiCheckbox,
  CheckboxProps as MuiCheckboxProps,
} from '@mui/material';

/* const useStyles = makeStyles((theme) => ({
 *   root: {
 *     width: 36,
 *     height: 36,
 *   },
 * }));
 *
 * const useLabelStyles = makeStyles((theme) => ({
 *   root: {
 *     color: 'rgb(0,0,0,0.65)',
 *     width: (props) => (props.width ? props.width : undefined),
 *     fontSize: 14,
 *     marginLeft: '-9px',
 *   },
 * })); */

export type CheckboxProps = {
  value?: boolean;
  defaultValue?: boolean;
  label?: string;
  onChange?: (ev: SyntheticEvent, checked: boolean) => void | Promise<void>;
  helperText?: ReactNode;
  error?: boolean;
  fullWidth?: boolean;
} & Omit<MuiCheckboxProps, 'checked' | 'defaultChecked' | 'defaultValue'>;

export const Checkbox = (props: CheckboxProps) => {
  const {
    label,
    value: valueProp,
    defaultValue,
    // error,
    readOnly,
    onChange,
    helperText,
    error,
    fullWidth,
    ...rest
  } = props;

  const [value, setValue] = useState(valueProp || defaultValue || false);

  useEffect(() => {
    if (valueProp !== undefined) {
      setValue(valueProp);
    }
  }, [valueProp]);

  const handleOnChange = async (event: SyntheticEvent, checked: boolean) => {
    if (readOnly) {
      return;
    }

    setValue(checked);
    return await onChange?.(event, checked);
  };

  const control = (
    <MuiCheckbox
      checked={value}
      onChange={handleOnChange}
      readOnly={readOnly}
      disableRipple={readOnly}
      {...rest}
    />
  );

  if (!label) {
    return control;
  }

  return <FormControlLabel sx={{ color: 'text.secondary' }} control={control} label={label} />;
};

export default Checkbox;
