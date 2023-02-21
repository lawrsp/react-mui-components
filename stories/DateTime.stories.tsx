import * as React from 'react';
import { DateTimeSpan, Calendar, DatePicker } from '../src/DateTime';

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
  const [time, setTime] = React.useState(new Date());
  return (
    <div>
      <div>
        <span>time is: &nbsp;</span>
        <DateTimeSpan component="span" value={time} />
      </div>
      <div style={{ height: 10 }} />
      <Calendar value={time} onChange={(_: Event, t: Date) => setTime(t)} />
    </div>
  );
};

export const DatePickers = () => {
  const [time, setTime] = React.useState<Date | ''>(new Date());
  return (
    <div>
      <div>
        <DatePicker
          value={time}
          onChange={(ev, date) => setTime(date)}
          variant="standard"
          label="日期选择"
          closeOnSelected
          showPopupIcon
          sx={{ my: 4 }}
        />
        <DatePicker
          value={time}
          onChange={(ev, date) => setTime(date)}
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
          onChange={(ev, date) => setTime(date)}
          variant="standard"
          label="日期选择"
          helperText="不自动关闭"
          sx={{ my: 4 }}
        />
      </div>
      <div>
        <DatePicker
          value={time}
          onChange={(ev, date) => setTime(date)}
          label="日期选择"
          closeOnSelected
          showPopupIcon
          sx={{ my: 4 }}
        />
        <DatePicker
          value={time}
          onChange={(ev, date) => setTime(date)}
          label="日期选择"
          helperText="不自动关闭"
          sx={{ my: 4 }}
        />
      </div>
    </div>
  );
};
