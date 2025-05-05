import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

const MAX_MINUTES = 240;

interface TimerProps {
  className?: string;
}

const Timer: React.FC<TimerProps> = React.memo(({ className = '' }) => {
  const { t } = useTranslation();
  const [minutes, setMinutes] = useState(25);
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  const frameRef = useRef<number | undefined>(undefined);
  const lastTimeRef = useRef<number>(0);

  const containerClasses = useMemo(() => 
    `fixed top-8 left-1/2 transform -translate-x-1/2 bg-white dark:bg-gray-800 text-black dark:text-white p-4 rounded-lg shadow-md font-serif transition-all cursor-default ${className}`,
    [className]
  );

  const inputClasses = useMemo(() => 
    'w-16 px-2 py-1 rounded bg-gray-100 dark:bg-gray-700 border-none mr-2 text-center text-black dark:text-white',
    []
  );

  const startButtonClasses = useMemo(() => 
    'ml-3 px-3 py-1 bg-green-500 hover:bg-green-600 text-white rounded transition',
    []
  );

  const stopButtonClasses = useMemo(() => 
    'px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded transition',
    []
  );

  const timeDisplayClasses = useMemo(() => 
    'text-center text-xl font-mono mb-2',
    []
  );

  const warningClasses = useMemo(() => 
    'text-red-500 mt-2 text-sm',
    []
  );

  const validateTime = useCallback((val: number) => {
    if (val > MAX_MINUTES) {
      setShowWarning(true);
      return MAX_MINUTES;
    } else {
      setShowWarning(false);
      return val;
    }
  }, []);

  const updateTime = useCallback((now: number) => {
    if (!lastTimeRef.current) lastTimeRef.current = now;
    const delta = now - lastTimeRef.current;

    if (delta >= 1000) {
      setTimeLeft(prev => {
        const updated = prev - Math.floor(delta / 1000);
        if (updated <= 0) {
          stop();
          alert(t('timer.timeUp'));
          return 0;
        }
        return updated;
      });
      lastTimeRef.current = now;
    }

    frameRef.current = requestAnimationFrame(updateTime);
  }, [t]);

  const start = useCallback(() => {
    if(!minutes){
      alert(t('timer.minTimeWarning'));
      return;
    }
    setTimeLeft(minutes * 60);
    setIsRunning(true);
    lastTimeRef.current = 0;
    frameRef.current = requestAnimationFrame(updateTime);
  }, [minutes, updateTime, t]);

  const stop = useCallback(() => {
    setIsRunning(false);
    if (frameRef.current) cancelAnimationFrame(frameRef.current);
  }, []);

  useEffect(() => {
    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, []);

  const formatTime = useCallback((sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  }, []);

  return (
    <div className={containerClasses}>
      {!isRunning ? (
        <>
          <input
            type="number"
            min={1}
            max={MAX_MINUTES}
            value={minutes}
            onChange={(e) => {
              const val = validateTime(Number(e.target.value));
              setMinutes(val);
              setTimeLeft(val * 60);
            }}
            className={inputClasses}
          />
          {t('timer.minutes')}
          <button
            onClick={start}
            className={startButtonClasses}
          >
            {t('timer.start')}
          </button>
        </>
      ) : (
        <>
          <div className={timeDisplayClasses}>{formatTime(timeLeft)}</div>
          <button
            onClick={stop}
            className={stopButtonClasses}
          >
            {t('timer.stop')}
          </button>
        </>
      )}
      {showWarning && (
        <div className={warningClasses}>
          {t('timer.maxTimeWarning')}
        </div>
      )}
    </div>
  );
});

Timer.displayName = 'Timer';

export default Timer;