import './BreakTimer.css'
import { useState } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { StaticTimePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';

import { useCountdown } from '../hooks/useCountdown';

function BreakTimer() {
  const [deadline, setDeadline] = useState(null);
  const [timeValue, setTimeValue] = useState(dayjs())

  const { minutes } = useCountdown(deadline);
  const { t } = useTranslation();

  function initialize() {
    setDeadline(null);
    setTimeValue(dayjs());
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className="BreakTimer">
        {
          deadline ?
            timeValue.diff(dayjs()) > 0 ?
              <div>
                <h1>{t('break')}</h1>
                <h2>{t('continue at', { targetTime: deadline.format('H.mm') })}</h2>
                <div>{t('in minutes', { minutes })}</div>
                <button className="footer" onClick={initialize}>{t('close')}</button>
              </div> :
              <div>
                <h2>{t('continue')}</h2>
                <button className="footer" onClick={initialize}>{t('close')}</button>
              </div>
            :
            <div>
              <StaticTimePicker
                localeText={t('TimePicker', { returnObjects: true })}
                label="Enter target time"
                ampm={false}
                views={['hours', 'minutes']}
                onChange={time => setTimeValue(time)}
                value={timeValue}
                onAccept={() => setDeadline(timeValue)}
              />
            </div>
        }
      </div>
    </LocalizationProvider>
  )
}

export default BreakTimer;
