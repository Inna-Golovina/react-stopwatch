import React, { useState, useEffect, useCallback } from 'react';
import { interval, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Buttons } from '../Buttons';
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

  const start = useCallback(() => {
    setStatus(true);
  }, []);

  const stop = useCallback(() => {
    setTime(0);
    setStatus(false);
  }, []);

  const wait = () => {
    setCount(0);
    setCount(prevCount => prevCount + 1);

    setTimeout(() => {
      if (count === 1) {
        setStatus(false);
      }
    }, 300);
  };

  const reset = () => {
    setTime(0);
    setStatus(true);
  };

  return (
    <>
      <span>
        <p className="header">
          {new Date(time).toISOString().substr(11, 8)}
        </p>
      </span>
      <Buttons
        currentStatus={status}
        onStart={start}
        onStop={stop}
        onReset={reset}
        onWait={wait}
      />
    </>
  );
};
