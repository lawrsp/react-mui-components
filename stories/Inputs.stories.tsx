import * as React from 'react';
import { MenuItem } from '@mui/material';
import { TextField, Checkbox } from '../src/Inputs';

export default {
  title: 'Example/Inputs',
};

export const VariantInputs = () => {
  return (
    <div>
      inputs====
      <br />
      <TextField label="input" sx={{ width: 300 }} />
      <br />
      <TextField label="select" select sx={{ width: 300 }} defaultValue="">
        <MenuItem value={''}>&nbsp;</MenuItem>
        <MenuItem value="cn">cn</MenuItem>
        <MenuItem value="us">us</MenuItem>
        <MenuItem value="fr">fr</MenuItem>
        <MenuItem value="uk">uk</MenuItem>
      </TextField>
      <br />
      <TextField
        label="select with native options"
        select
        SelectProps={{ native: true }}
        defaultValue=""
        sx={{ width: 300 }}
      >
        <option value={''}></option>
        <option value={20}>20+</option>
        <option value={30}>30+</option>
        <option value={40}>40+</option>
        <option value={50}>50+</option>
      </TextField>
      <br />
      <Checkbox defaultValue={true} />
      <br />
      <Checkbox size="small" defaultValue={false} />
      <br />
      <Checkbox label="check it" defaultValue={true} />
      <br />
      <Checkbox label="check it" size="small" defaultValue={false} />
    </div>
  );
};
