import { useState, useEffect, useRef, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

const MAX_MINUTES = 240;

const Timer = () => {
    //TODO
    /*
    1-when time end there're two dialogs popping up;
    3-some buttons are not dark in dark mode;
    */
  const { t } = useTranslation();
  const [minutes, setMinutes] = useState(25);
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  const frameRef = useRef<number | undefined>(undefined);
  const lastTimeRef = useRef<number>(0);

  const validateTime = (val: number) => {
    if (val > MAX_MINUTES) {
      setShowWarning(true);
      return MAX_MINUTES;
    } else {
      setShowWarning(false);
      return val;
    }
  };

  const updateTime = useCallback((now: number) => {
    if (!lastTimeRef.current) lastTimeRef.current = now;
    const delta = now - lastTimeRef.current;

    if (delta >= 1000) {
      setTimeLeft(prev => {
        const updated = prev - Math.floor(delta / 1000);
        if (updated <= 0) {
          stop();
          alert(t('timer.timeUp', 'Time is up! Take a break.'));
          return 0;
        }
        return updated;
      });
      lastTimeRef.current = now;
    }

    frameRef.current = requestAnimationFrame(updateTime);
  }, [t]);

  const start = () => {
    if(!minutes){
      alert(t('timer.minTimeWarning', 'Time should be at least 1 minute.🤔'));
      return;
    }
    setTimeLeft(minutes * 60);
    setIsRunning(true);
    lastTimeRef.current = 0; // Reset the last time to ensure accurate timing
    frameRef.current = requestAnimationFrame(updateTime);
  };

  const stop = () => {
    setIsRunning(false);
    if (frameRef.current) cancelAnimationFrame(frameRef.current);
  };

  useEffect(() => {
    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, []);

  const formatTime = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed top-8 left-1/2 transform -translate-x-1/2 bg-white dark:bg-gray-800 text-black dark:text-white p-4 rounded-lg shadow-md font-serif transition-all cursor-default">
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
            className="w-16 px-2 py-1 rounded bg-gray-100 dark:bg-gray-700 border-none mr-2 text-center text-black dark:text-white"
          />
          {t('timer.minutes', 'minutes')}
          <button
            onClick={start}
            className="ml-3 px-3 py-1 bg-green-500 hover:bg-green-600 text-white rounded transition"
          >
            {t('timer.start', 'Start')}
          </button>
        </>
      ) : (
        <>
          <div className="text-center text-xl font-mono mb-2">{formatTime(timeLeft)}</div>
          <button
            onClick={stop}
            className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded transition"
          >
            {t('timer.stop', 'Stop')}
          </button>
        </>
      )}
      {showWarning && (
        <div className="text-red-500 mt-2 text-sm">
          {t('timer.maxTimeWarning', '4-hour is great enough for a break :-)')}
        </div>
      )}
    </div>
  );
};

export default Timer;