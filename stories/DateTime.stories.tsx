import * as React from 'react';
import { DateTimeSpan, Calendar, DatePicker, DateTimePicker } from '../src/DateTime';
import TimeScroll from '../src/DateTime/TimeScroll';

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

export const Calendars = () => {
  const [time, setTime] = React.useState<Date | number | string | null | undefined>(
    new Date('2022-06-29T00:00:00.000Z')
  );
  return (
    <div>
      <div>
        <button onClick={() => setTime(new Date())}>now </button>
        <button onClick={() => setTime(null)}>null</button>
        <button onClick={() => setTime(undefined)}>undefined</button>
        <button onClick={() => setTime('invalid string')}>invalid string</button>
        <button onClick={() => setTime('')}>空字符串</button>
        <button onClick={() => setTime(1677337141506)}>1677337141506 </button>
        <br />
        <span>time is: &nbsp;</span>
        <DateTimeSpan component="span" value={time} />
      </div>
      <div style={{ height: 10 }} />
      <Calendar value={time} onChange={(t) => setTime(t)} />
    </div>
  );
};

export const DatePickers = () => {
  const [time, setTime] = React.useState<Date | string | ''>('some invalid value');
  return (
    <div>
      <div>
        <DatePicker
          value={time}
          onChange={(date) => setTime(date)}
          variant="standard"
          label="日期选择"
          closeOnSelected
          showPopupIcon
          sx={{ my: 4 }}
        />
        <DatePicker
          value={time}
          onChange={(date) => setTime(date)}
          variant="standard"
          label="日期选择"
          closeOnSelected
          showPopupIcon
          noOpenOnFocus
          sx={{ my: 4 }}
          helperText="noOpenOnFocus"
        />
        <DatePicker
          value={time}
          onChange={(date) => setTime(date)}
          variant="standard"
          label="日期选择"
          helperText="不自动关闭"
          sx={{ my: 4 }}
        />
      </div>
      <div>
        <DatePicker
          value={time}
          onChange={(date) => setTime(date)}
          label="日期选择"
          closeOnSelected
          showPopupIcon
          sx={{ my: 4 }}
        />
        <DatePicker
          value={time}
          onChange={(date) => setTime(date)}
          label="日期选择"
          helperText="不自动关闭"
          sx={{ my: 4 }}
        />
      </div>
    </div>
  );
};

export const DateTimePickers = () => {
  const [value, setValue] = React.useState<Date | string>('some invalid value');

  return (
    <div style={{ display: 'flex', flexDirection: 'row', gap: 20 }}>
      <TimeScroll sx={{ height: 400 }} value={value} onChange={(vl) => setValue(vl)} />
      <DateTimePicker value={value} onChange={(vl) => setValue(vl)} />
    </div>
  );
};
