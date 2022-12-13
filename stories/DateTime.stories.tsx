import * as React from 'react';
import { DateTimeSpan } from '../src/DateTime';

export default {
  title: 'Example/DateTime',
};

export const DateTimeSpans = () => {
  const sx = {
    lineHeight: '40px',
    height: '40px',
    color: 'primary.light',
    border: 'solid 1px black',
    width: '240px',
  };

  return (
    <div>
      <div>now: </div>
      <DateTimeSpan value={new Date()} sx={sx} />
      <div>2022-06-29T00:00:00.000Z</div>
      <DateTimeSpan value="2022-06-29T00:00:00.000Z" sx={sx} />
      <div>null:</div>
      <DateTimeSpan value={null} sx={sx} />
      <div>undefined:</div>
      <DateTimeSpan value={undefined} sx={sx} />
    </div>
  );
};
