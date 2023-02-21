import { useState, useRef } from 'react';
import type { SyntheticEvent } from 'react';
import { ArrowDropDown as ArrowDropDownIcon } from '@mui/icons-material';
import type { TextFieldProps, PopperProps } from '@mui/material';
import { IconButton } from '@mui/material';

export type PopperCloseReason = 'elementClose' | 'popperClose' | 'blur' | 'toggle';
export type PopperOpenReason = 'focus' | 'toggle' | 'click';

type UsePopperPropsOptions = {
  initialOpen?: boolean;
  noOpenOnFocus?: boolean;
  showPopupIcon?: boolean;
  onOpen?: (ev: SyntheticEvent, reason?: PopperOpenReason) => void | Promise<void>;
  onClose?: (ev: SyntheticEvent, reason?: PopperCloseReason) => void | Promise<void>;
};

export const usePopperProps = (props: Partial<TextFieldProps>, options: UsePopperPropsOptions) => {
  const { id, onFocus, onBlur, onClick, onKeyDown, InputProps, ...rest } = props;
  const {
    initialOpen = false,
    showPopupIcon = false,
    noOpenOnFocus = false,
    onOpen,
    onClose,
  } = options;

  const [openState, setOpenState] = useState(initialOpen || false);

  //
  const anchorRef = useRef<any>(null);
  /* const [inputRef, setInputRef] = useState<Ref<any>>(null); */

  // anchorEl ? anchorEl.clientWidth : null,
  // const [menuMinWidthState, setMenuMinWidthState] = React.useState();

  console.log('openState =====', openState);
  const update = (
    ev: SyntheticEvent,
    open: boolean,
    reason?: PopperCloseReason | PopperOpenReason
  ) => {
    // setHoverState(false);
    // setMenuMinWidthState(minWidth ? null : anchorEl.clientWidth);

    if (open === openState) {
      return;
    }

    setOpenState(open);
    if (open && onOpen) {
      onOpen(ev, reason as PopperOpenReason);
    }
    if (!open && onClose) {
      onClose(ev, reason as PopperCloseReason);
    }
  };

  const handleOpen = (ev: SyntheticEvent, reason?: PopperOpenReason) => {
    // console.log('===== set open');
    update(ev, true, reason);
  };

  const handleClose = (ev: SyntheticEvent, reason: PopperCloseReason) => {
    // console.log('= handle close', reason);
    update(ev, false, reason);
  };

  const handleFocus: TextFieldProps['onFocus'] = (ev) => {
    // console.log('===== handleFocused: ');
    if (!noOpenOnFocus) {
      handleOpen(ev, 'focus');
    }

    if (onFocus) {
      onFocus(ev);
    }
  };

  const handleBlur: TextFieldProps['onBlur'] = (ev) => {
    // console.log('==== blur');
    // firstFocus.current = true;
    handleClose(ev, 'blur');
    if (onBlur) {
      onBlur(ev);
    }
  };

  // open popup when push some key down
  const handleKeyDown: TextFieldProps['onKeyDown'] = (ev) => {
    // console.log("------------, handleKeyDown");
    const validKeys = [
      ' ',
      'ArrowUp',
      'ArrowDown',
      // The native select doesn't respond to enter on MacOS, but it's recommended by
      // https://www.w3.org/TR/wai-aria-practices/examples/listbox/listbox-collapsible.html
      'Enter',
    ];

    if (validKeys.indexOf(ev.key) !== -1) {
      ev.preventDefault();
      if (ev.key === 'ArrowDown') {
        update(ev, true);
      } else if (ev.key === 'ArrowUp') {
        update(ev, false);
      } else {
        update(ev, !openState);
      }
    }

    if (onKeyDown) {
      onKeyDown(ev);
    }
  };

  const handleClickPopupIndicator = (ev: SyntheticEvent) => {
    ev.preventDefault();
    console.log('popup indicator', openState);
    if (openState) {
      handleClose(ev, 'toggle');
    } else {
      handleOpen(ev, 'toggle');
    }
  };

  // Prevent input blur when interacting with the popper
  const handleMouseDown = (ev: SyntheticEvent) => {
    if (ev.currentTarget.getAttribute('id') !== id) {
      ev.preventDefault();
    }
  };

  const handleClick: TextFieldProps['onClick'] = (ev) => {
    console.log('click root', openState);
    if (!noOpenOnFocus) {
      handleOpen(ev, 'click');
    }
    if (onClick) {
      onClick(ev);
    }
  };

  // Focus the input, may open popper
  /* const handleInputMouseDown = (ev) => {
   *   if (inputValue === '' || !open) {
   *     handleClickPopupIndicator(ev);
   *   }
   * }; */

  const endAdornment = (
    <div>
      {InputProps?.endAdornment}
      {!!showPopupIcon && (
        <IconButton
          tabIndex={-1}
          onClick={handleClickPopupIndicator}
          onMouseDown={handleMouseDown}
          disabled={rest.disabled}
          aria-label={openState ? 'popup-closed' : 'popup-opened'}
          sx={{ padding: '1px' }}
        >
          <ArrowDropDownIcon
            fontSize="small"
            sx={{
              transform: `rotate(${openState ? 180 : 0}deg)`,
              transition: 'transform 0.1s ease',
            }}
          />
        </IconButton>
      )}
    </div>
  );

  return {
    textFieldProps: {
      id,
      onBlur: handleBlur,
      onFocus: handleFocus,
      onKeyDown: handleKeyDown,
      onClick: handleClick,
      // if open then this is handled imperativeley so don't let react override
      // only have an opinion about this when closed
      'aria-activedescendant': openState ? '' : null,
      'aria-controls': openState ? `${id}-popup` : null,
      // Disable browser's suggestion that might overlap with the popup.
      // Handle autocomplete but not autofill.
      autoComplete: 'off',
      inputRef: anchorRef,
      autoCapitalize: 'none',
      spellCheck: 'false',
      InputProps: { ...InputProps, endAdornment },
      ...rest,
    } as Partial<TextFieldProps>,

    popperProps: {
      open: openState,
      anchorEl: anchorRef?.current,
      placement: 'bottom-start',
      onClose: (ev: SyntheticEvent) => handleClose(ev, 'popperClose'),
      onMouseDown: handleMouseDown,
    } as PopperProps,

    close: (ev: SyntheticEvent) => handleClose(ev, 'elementClose'),
    anchorWidth: (anchorRef?.current as HTMLElement | null)?.clientWidth,
  };
};
