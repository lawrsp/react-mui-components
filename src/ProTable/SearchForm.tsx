import { useEffect, SyntheticEvent, useMemo } from 'react';
import { Box, Button, Paper } from '@mui/material';
import { ExpandLess as ExpandLessIcon } from '@mui/icons-material';
import { FieldValues } from 'react-hook-form';
import { isEmpty } from 'lodash-es';
import Form, { useForm, FormItem, FormInput } from '../Form';
import { SearchFieldType, SearchFormProps } from './types';

// fields: name label type props
export const SearchForm = (props: SearchFormProps) => {
  const { visible = true, searches, searchFields, actions } = props;
  const { onSearch, onChangeVisible } = actions;

  const formValues = useMemo<FieldValues>(
    () =>
      searchFields.reduce((all: FieldValues, it: SearchFieldType) => {
        return {
          ...all,
          [it.field]: searches[it.field] || '',
        };
      }, {}),
    [searchFields, searches]
  );

  const form = useForm({ defaultValues: formValues });

  useEffect(() => {
    form.reset(formValues);
  }, [formValues]);

  const handleSearch = async (ev: SyntheticEvent) => {
    ev.preventDefault();
    try {
      await form.handleSubmit(async (values) => {
        console.log('in handlesubmit search is:', values);
        return await onSearch(values);
      })(ev);
    } finally {
    }
  };

  const handleClear = async (ev: SyntheticEvent) => {
    ev.preventDefault();
    try {
      console.log('clear formValues: ', formValues);
      form.reset(formValues);
      if (isEmpty(searches)) {
        return;
      }
      await onSearch({});
    } finally {
    }
  };

  const handleClose = onChangeVisible
    ? (ev: SyntheticEvent) => {
        onChangeVisible(false, ev);
      }
    : undefined;

  // TODO: Grid
  const itemGrid = {
    xs: 12,
    sm: 6,
    md: 4,
    lg: 3,
  };

  return (
    <Paper
      sx={{
        pl: 2,
        pr: 2,
        pb: 1.5,
        pt: 0,
        display: visible ? 'flex' : 'none',
        flexDirection: 'row',
        alignItems: 'flex-end',
        borderRadius: 0,
      }}
    >
      <Form
        form={form}
        sx={{
          width: '100%',
        }}
      >
        {searchFields.map(({ field, label, type, key }, index) => (
          <FormItem {...itemGrid} key={key || field || index}>
            <FormInput
              size="small"
              fullWidth
              variant="standard"
              label={label}
              name={field}
              type={type}
            />
          </FormItem>
        ))}
        <FormItem {...itemGrid}>
          <Box
            sx={{
              flexGrow: 1,
              pt: 2,
              flexDriection: 'row',
              alignItems: 'baseline',
              justifyContent: 'flex-start',
            }}
          >
            <Button
              size="small"
              onClick={handleSearch}
              color="primary"
              type="submit"
              variant="contained"
            >
              查询
            </Button>
            <Button size="small" onClick={handleClear} variant="outlined" sx={{ ml: 2 }}>
              清空
            </Button>
            {!!handleClose ? (
              <Box
                component="span"
                sx={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  verticalAlign: 'middle',
                  userSelect: 'none',
                  ml: 2,
                  color: 'primary.main',
                  cursor: 'pointer',
                  '&:hover': {
                    color: 'primary.dark',
                  },
                }}
                onClick={handleClose}
              >
                <ExpandLessIcon fontSize="small" /> 收起
              </Box>
            ) : null}
          </Box>
        </FormItem>
      </Form>
    </Paper>
  );
};

export default SearchForm;
