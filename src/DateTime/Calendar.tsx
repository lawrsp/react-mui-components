import { SyntheticEvent, Fragment } from 'react';
import GlobalStyles from '@mui/material/GlobalStyles';
import ReactCalendar from 'react-calendar';

export interface CalendarProps {
  value: number | string | Date;
  onChange?: (ev: SyntheticEvent, t: Date) => void;
}

const calendarStyles = (
  <GlobalStyles
    styles={(theme) => ({
      '.react-calendar': {
        width: '30rem',
        maxWidth: '100%',
        lineHeight: '2rem',
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.text.primary,
      },
      '.react-calendar--doubleView': {
        width: '70rem',
      },
      '.react-calendar--doubleView .react-calendar__viewContainer': {
        display: 'flex',
        margin: '-0.5em',
      },
      '.react-calendar--doubleView .react-calendar__viewContainer > *': {
        width: '50%',
        margin: '0.5em',
      },
      '.react-calendar, .react-calendar *, .react-calendar *::before, .react-calendar *::after': {
        boxSizing: 'border-box',
      },
      '.react-calendar button': {
        margin: 0,
        border: 0,
        outline: 'none',
      },
      '.react-calendar button:enabled:hover': {
        cursor: 'pointer',
      },
      '.react-calendar__navigation': {
        height: '4.4rem',
      },
      '.react-calendar__navigation__arrow': {
        fontSize: '2rem',
        lineHeight: '2rem',
      },

      '.react-calendar__navigation button': {
        minWidth: '4.4rem',
        fontSize: '1.6rem',
        background: 'none',
      },
      '.react-calendar__navigation button:enabled:hover': {
        backgroundColor: '#e6e6e6',
      },
      '.react-calendar__navigation button[disabled]': {
        backgroundColor: '#f0f0f0',
      },
      '.react-calendar__month-view__weekdays': {
        textAlign: 'center',
        textTransform: 'uppercase',
        fontWeight: 'bold',
      },
      '.react-calendar__month-view__weekdays__weekday': {
        fontSize: '1.2rem',
        padding: '0.5em',
        color: theme.palette.text.primary,
      },
      '.react-calendar__month-view__weekdays__weekday > abbr': {
        textDecoration: 'none',
      },
      '.react-calendar__month-view__weekNumbers': {
        fontWeight: 'bold',
      },
      '.react-calendar__month-view__weekNumbers .react-calendar__tile': {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '1.4rem',
        padding: 'calc(0.75em / 0.75) calc(0.5em / 0.75)',
      },
      '.react-calendar__month-view__days__day--weekend': {},
      '.react-calendar__month-view__days__day--neighboringMonth': {
        color: '#757575',
      },
      '.react-calendar__year-view .react-calendar__tile, .react-calendar__decade-view .react-calendar__tile, .react-calendar__century-view .react-calendar__tile':
        {
          padding: '2em 0.5em',
        },
      '.react-calendar__tile': {
        maxWidth: '100%',
        textAlign: 'center',
        padding: '0.75em 0.5em',
        background: 'none',
        fontSize: '1.4rem',
        borderCollapse: 'collapse',

        '&:disabled': {
          backgroundColor: theme.palette.action.disabled,
        },
        '&:enabled:hover': {
          backgroundColor: theme.palette.action.hover,
        },
        '&:enabled:focus': {
          backgroundColor: theme.palette.action.focus,
        },
      },
      '.react-calendar__tile--now': {
        position: 'relative',
      },
      '.react-calendar__tile--now::after': {
        content: '""',
        position: 'absolute',
        top: 4,
        bottom: 4,
        left: 4,
        right: 4,
        border: `solid 1px ${theme.palette.primary.main}`,
        borderRadius: 2,
      },
      '.react-calendar__tile--active': {
        background: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,

        '&:enabled:hover, &:enabled:focus': {
          background: theme.palette.primary.light,
          color: theme.palette.primary.contrastText,
        },
      },
      '.react-calendar__tile--hasActive': {
        background: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
        '&:enabled:hover, &:enabled:focus': {
          background: theme.palette.primary.main,
          color: theme.palette.primary.contrastText,
        },
      },
      '.react-calendar--selectRange': {
        '&.react-calendar__tile--hover': {
          backgroundColor: theme.palette.action.hover,
        },
      },
    })}
  />
);

export const Calendar = ({ value, onChange }: CalendarProps) => {
  const handleOnChange = (val: Date, ev: SyntheticEvent) => {
    if (onChange) {
      onChange(ev, val);
    }
  };
  return (
    <Fragment>
      {calendarStyles}
      <ReactCalendar
        value={value}
        showNavigation={true}
        showNeighboringMonth={false}
        formatDay={(_: string, date: Date) => date.getDate()}
        onChange={handleOnChange}
      />
    </Fragment>
  );
};

export default Calendar;
