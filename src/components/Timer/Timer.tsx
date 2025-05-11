import { useEffect, useRef, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { RootState } from '../../store';
import { 
  setMinutes, 
  startTimer, 
  stopTimer, 
  updateTimeLeft,
  clearWarning 
} from '../../store/slices/timerSlice';

const MAX_MINUTES = 240;

const Timer = () => {
    //TODO
    /*
    1-when time end there're two dialogs popping up;
    3-some buttons are not dark in dark mode;
    */
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { minutes, timeLeft, isRunning, showWarning } = useSelector((state: RootState) => state.timer);
  const frameRef = useRef<number | undefined>(undefined);
  const lastTimeRef = useRef<number>(0);
  const [showTimeUpDialog, setShowTimeUpDialog] = useState(false);

  const validateTime = (val: number) => {
    if (val > MAX_MINUTES) {
      dispatch(setMinutes(MAX_MINUTES));
      return;
    }
    dispatch(setMinutes(val));
  };

  const updateTime = useCallback((now: number) => {
    if (!lastTimeRef.current) lastTimeRef.current = now;
    const delta = now - lastTimeRef.current;

    if (delta >= 1000) {
      const updated = timeLeft - Math.floor(delta / 1000);
      if (updated <= 0) {
        dispatch(stopTimer());
        dispatch(updateTimeLeft(0));
        if (!showTimeUpDialog) {
          setShowTimeUpDialog(true);
          setTimeout(() => {
            alert(t('timer.timeUp', 'Time is up! Take a break.'));
            setShowTimeUpDialog(false);
          }, 100);
        }
        return;
      }
      dispatch(updateTimeLeft(updated));
      lastTimeRef.current = now;
    }

    frameRef.current = requestAnimationFrame(updateTime);
  }, [timeLeft, dispatch, t, showTimeUpDialog]);

  const start = () => {
    if(!minutes){
      alert(t('timer.minTimeWarning', 'Time should be at least 1 minute.🤔'));
      return;
    }
    dispatch(startTimer());
    lastTimeRef.current = 0; // Reset the last time to ensure accurate timing
    frameRef.current = requestAnimationFrame(updateTime);
  };

  const stop = () => {
    dispatch(stopTimer());
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
            onChange={(e) => validateTime(Number(e.target.value))}
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