import { useEffect, SyntheticEvent, useMemo } from 'react';
import { Box, Button, Paper } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { ExpandLess as ExpandLessIcon } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { FieldValues } from 'react-hook-form';
import Form, { useForm, FormInput } from '../Form';
import { ProTableSearchActions, ProTableSearchState, SearchFieldType } from './types';

const getValues = (values: FieldValues, initialFields: FieldValues) => {
  const result = Object.keys(values).reduce((result, k) => {
    const inital = initialFields[k];
    if (values[k] !== undefined && values[k] !== inital) {
      return {
        ...result,
        [k]: values[k],
      };
    }

    return result;
  }, {});
  return result;
};

type SearchFormProps = ProTableSearchState & {
  actions?: ProTableSearchActions;
};

// fields: name label type props
export const SearchForm = (props: SearchFormProps) => {
  const { submitting, invisible, searches, searchFields, actions } = props;

  const defaultValues = useMemo<FieldValues>(
    () =>
      searchFields.reduce((all: FieldValues, it: SearchFieldType) => {
        return {
          ...all,
          [it.field]: '',
        };
      }, {}),
    [searchFields]
  );

  const form = useForm({ defaultValues });

  useEffect(() => {
    form.reset(searches);
  }, [searches]);

  const handleSearch = async (ev: SyntheticEvent) => {
    ev.preventDefault();
    try {
      await form.handleSubmit(async (values) => {
        const search = getValues(values, defaultValues);
        console.log('in handlesubmit search is:', search);
        actions?.setSearches?.(search);
      })(ev);
    } finally {
    }
  };

  const handleReset = (_: SyntheticEvent) => {
    actions?.setSearches?.(defaultValues);
    form.reset(defaultValues);
  };

  const handleClose = !!actions?.setInvisible
    ? (ev: SyntheticEvent) => {
        if (submitting) {
          return;
        }
        actions?.setInvisible?.(true);
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
        pt: 0.5,
        display: invisible ? 'none' : 'flex',
        flexDirection: 'row',
        alignItems: 'flex-end',
      }}
    >
      <Form
        form={form}
        sx={{
          width: '100%',
        }}
      >
        <Grid container columnSpacing={2}>
          {searchFields.map(({ field, label, type, key }, index) => (
            <Grid {...itemGrid}>
              <FormInput
                key={key || field || index}
                size="small"
                fullWidth
                variant="standard"
                label={label}
                name={field}
                type={type}
              />
            </Grid>
          ))}
          <Grid {...itemGrid}>
            <Box
              sx={{
                flexGrow: 1,
                pt: 2,
                flexDriection: 'row',
                alignItems: 'baseline',
                justifyContent: 'flex-start',
              }}
            >
              <LoadingButton
                size="small"
                onClick={handleSearch}
                loading={submitting}
                color="primary"
                type="submit"
                variant="contained"
              >
                查询
              </LoadingButton>
              <Button
                size="small"
                disabled={submitting}
                onClick={handleReset}
                variant="outlined"
                sx={{ ml: 2 }}
              >
                重置
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
                    color: submitting ? 'action.disabled' : 'primary.main',
                    cursor: submitting ? 'default' : 'pointer',
                    '&:hover': submitting
                      ? {}
                      : {
                          color: 'primary.dark',
                        },
                  }}
                  onClick={handleClose}
                >
                  <ExpandLessIcon fontSize="small" /> 收起
                </Box>
              ) : null}
            </Box>
          </Grid>
        </Grid>
      </Form>
    </Paper>
  );
};

export default SearchForm;
