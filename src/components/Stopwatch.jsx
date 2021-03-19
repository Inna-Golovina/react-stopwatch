import React, { useState, useEffect } from 'react';
import { interval, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import './Stopwatch.scss';

export const Stopwatch = () => {
  const [time, setTime] = useState(0);
  const [status, setStatus] = useState(false);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const destroy$ = new Subject();

    interval(1000)
      .pipe(takeUntil(destroy$))
      .subscribe(() => {
        if (status) {
          setTime(timeValue => timeValue + 1000);
        }
      });

    return () => {
      destroy$.next();
      destroy$.complete();
    };
  }, [status]);

  const start = () => {
    setStatus(true);
  };

  const stop = () => {
    setStatus(false);
  };

  const reset = () => {
    setTime(0);
    setStatus(true);
  };

  const wait = () => {
    setCount(0);
    setCount(prevCount => prevCount + 1);

    setTimeout(() => {
      if (count === 1) {
        setStatus(false);
      }
    }, 300);
  };

  return (
    <>
      <span>
        <p className="header">
          {' '}
          {new Date(time).toISOString().substr(11, 8)}
        </p>
      </span>
      <div className="wrapper">

        { !status ? (
          <button
            type="button"
            className="time-button"
            onClick={start}
          >
            Start
          </button>
        ) : (
          <button
            type="button"
            className="time-button"
            onClick={stop}
          >
            Stop
          </button>
        )}

        <button
          type="button"
          className="time-button"
          onClick={wait}
        >
          Wait
        </button>

        <button
          type="button"
          className="time-button"
          onClick={reset}
        >
          Reset
        </button>

      </div>
    </>
  );
};
