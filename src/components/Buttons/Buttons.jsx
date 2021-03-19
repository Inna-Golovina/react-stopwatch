import React from 'react';
import PropTypes from 'prop-types';

export const Buttons = (props) => {
  const { currentStatus, onStart, onStop, onReset, onWait } = props;

  return (
    <>
      <div className="wrapper">

        { !currentStatus ? (
          <button
            type="button"
            className="time-button"
            onClick={onStart}
          >
            Start
          </button>
        ) : (
          <button
            type="button"
            className="time-button"
            onClick={onStop}
          >
            Stop
          </button>
        )}

        <button
          type="button"
          className="time-button"
          onClick={onWait}
        >
          Wait
        </button>

        <button
          type="button"
          className="time-button"
          onClick={onReset}
        >
          Reset
        </button>

      </div>
    </>
  );
};

Buttons.propTypes = {
  currentStatus: PropTypes.bool.isRequired,
  onStart: PropTypes.func.isRequired,
  onStop: PropTypes.func.isRequired,
  onReset: PropTypes.func.isRequired,
  onWait: PropTypes.func.isRequired,
};
