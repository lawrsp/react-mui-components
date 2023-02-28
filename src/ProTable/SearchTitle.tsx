import { useMemo } from 'react';
import { Box, IconButton } from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import { SearchTitleProps } from './types';

type SearchLabelProps = { label: string; value: string };

const SearchLabel = ({ label, value }: SearchLabelProps) => {
  return (
    <Box
      component="div"
      sx={{
        pl: 1,
        pr: 1,
        lineHeight: 2,
        fontSize: '1.2rem',
        fontWeight: 'normal',
        borderRadius: '10px',
        bgcolor: 'primary.main',
        color: 'primary.contrastText',
        display: 'inline-flex',
      }}
    >
      <Box component="span" sx={{ mr: 1, flexShrink: 0 }}>
        {label}:
      </Box>
      <Box component="span">{value}</Box>
    </Box>
  );
};

export const SearchTitle = (props: SearchTitleProps) => {
  const { open, onChangeOpen, fields, values } = props;

  const searches = useMemo<SearchLabelProps[]>(() => {
    if (open) {
      return [];
    }

    return fields.reduce<{ label: string; value: string }[]>((all, it) => {
      const k = it.field;
      const v = values[k];
      if (v !== '' && v !== null && v !== undefined) {
        const vl = it.getValueLabel ? it.getValueLabel(v) : `${v}`;
        return [...all, { label: it.label, value: vl }];
      }

      return all;
    }, []);
  }, [fields, values, open]);

  const hasSearches = searches.length > 0;

  const color = open || hasSearches ? 'primary' : undefined;

  return (
    <Box
      sx={{
        display: 'flex',
        pl: 0.5,
        pr: 2,
        alignItems: 'center',
        justifyContent: 'flex-between',
      }}
    >
      <IconButton
        sx={{ mr: 0.5 }}
        size="small"
        color={color}
        onClick={(ev) => onChangeOpen?.(!open, ev)}
      >
        <SearchIcon />
      </IconButton>
      <Box
        sx={{
          flexGrow: 1,
          alignItems: 'flex-start',
          gap: 1,
          display: 'flex',
        }}
      >
        {searches.map(({ label, value }, idx) => (
          <SearchLabel label={label} value={value} key={idx} />
        ))}
      </Box>
    </Box>
  );
};

export default SearchTitle;
