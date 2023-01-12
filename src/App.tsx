import { useEffect, useState } from 'react';
import './App.css';

const getDurationInSeconds = (duration: number) => duration < 0 ? 0 : Math.floor(duration / 1000);

const formatTime = (durationInSeconds: number) => {
  if (durationInSeconds < 60) {
    return [durationInSeconds];
  }
  const minutes = Math.floor(durationInSeconds / 60);
  if (minutes < 60) {
    return [minutes, durationInSeconds - (minutes * 60)];
  }
  const hours = Math.floor(minutes / 60);
  if (hours < 24) {
    return [hours, minutes - (hours * 60), durationInSeconds - (minutes * 60)];
  }
  return [ '?', '?'];
};

function App() {
  const queryParams = new URLSearchParams(window.location.search);
  const hours = ((param: string) => parseInt(param, 10))(queryParams.get('hours') || queryParams.get('h') || '0') * 60 * 60;
  const minutes = ((param: string) => parseInt(param, 10))(queryParams.get('minutes') || queryParams.get('m') || '3') * 60;
  const seconds = ((param: string) => parseInt(param, 10))(queryParams.get('seconds') || queryParams.get('s') || '0');
  const precision = ((param: string) => parseInt(param, 10))(queryParams.get('precision') || queryParams.get('p') || '100');
  const endMessage = queryParams.get('message') || queryParams.get('e') || '';
  const end = 'stream will start soon';

  const time = hours + minutes + seconds;

  const countdown = (time * 1000) + 999;
  const start = Date.now();
  const [remain, setRemain]: [number, any] = useState(countdown);
  const [intervalId, setIntervalId]: [any, any] = useState();

  useEffect(() => {
    if (!intervalId) {
      const _intervalId = setInterval(() => {
        if (remain < 0) {
          clearInterval(intervalId);
          setRemain(0);
        } else {
          const elapsed = Date.now() - start;
          const _remain = remain - elapsed;
          setRemain(_remain);
        }
      }, precision);
      setIntervalId(_intervalId);
    }
  }, [start]);

  const displayedTime = formatTime(getDurationInSeconds(remain));
  const displayedEndMessage = endMessage || end;

  return (
    <div
      className={[
        'App',
        displayedTime.length >= 3 ? 'hours' : '',
        displayedTime.length >= 2 && displayedTime.length < 3 ? 'minutes' : '',
        displayedTime.length === 1 && displayedTime[0] !== 0 ? 'seconds' : '',
        displayedTime.length === 1 && displayedTime[0] === 0 ? 'end' : '',
      ].join(' ')}
    >
      {
        displayedTime[0] === 0 ? displayedEndMessage : displayedTime
        .map((bit, _, arr) => bit < 10 && arr.length > 1  ? `0${bit}` : bit)
        .join(getDurationInSeconds(remain) % 2 === 0 ? ':' : ' ')
      }
    </div>
  )
}

export default App
