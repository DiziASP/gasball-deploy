'use client';

import { on } from 'events';
import PropTypes from 'prop-types';
import React from 'react';
import { useReducer } from 'react';

interface Props {
  status: 'booked' | 'hover' | 'active' | 'default';
  className: any;
  onClickFunction: () => void;
  removeFunction: () => void;
}

export const Schedule = ({
  status,
  className,
  onClickFunction,
  removeFunction
}: Props): JSX.Element => {
  const [state, dispatch] = useReducer(reducer, {
    status: status || 'default'
  });

  return (
    <div
      className={`w-[200px] h-[40px] rounded-xl shadow ${
        state.status === 'booked'
          ? 'bg-red-400'
          : state.status === 'hover'
          ? 'bg-slate-200'
          : state.status === 'active'
          ? 'bg-cyan-400'
          : 'bg-slate-100'
      } ${className}`}
      onMouseLeave={() => {
        dispatch('mouse_leave');
      }}
      onMouseEnter={() => {
        dispatch('mouse_enter');
      }}
      onClick={() => {
        dispatch('click');
        if (state.status === 'default' || state.status === 'hover') {
          onClickFunction();
        }
        if (state.status === 'active') {
          removeFunction();
        }
      }}
    ></div>
  );
};

function reducer(state: any, action: any) {
  if (state.status === 'default') {
    switch (action) {
      case 'mouse_enter':
        return {
          status: 'hover'
        };

      case 'click':
        return {
          status: 'active'
        };
    }
  }

  if (state.status === 'hover') {
    switch (action) {
      case 'click':
        return {
          status: 'active'
        };

      case 'mouse_leave':
        return {
          status: 'default'
        };
    }
  }

  if (state.status === 'active') {
    switch (action) {
      case 'click':
        return {
          status: 'default'
        };
    }
  }

  return state;
}

Schedule.propTypes = {
  status: PropTypes.oneOf(['booked', 'hover', 'active', 'default'])
};
