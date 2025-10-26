import React from 'react';
import styles from './FrequencyTracker.module.css';
import { FaExclamation } from 'react-icons/fa';

// Por enquanto, vamos 'hardcodar' os dias de treino
const days = [
  { label: 'S', status: 'done' },
  { label: 'T', status: 'done' },
  { label: 'Q', status: 'done' },
  { label: 'Q', status: 'missed' },
  { label: 'S', status: 'pending' },
  { label: 'S', status: 'pending' },
  { label: 'D', status: 'pending' },
];

const renderDayContent = (day) => {
  if (day.status === 'missed') {
    return <FaExclamation />;
  }
  return day.label;
}

const getDayClass = (status) => {
  if (status === 'missed') return styles.missed;
  if (status === 'done') return styles.done;
  return styles.pending;
}

export function FrequencyTracker() {
  return (
    <div className={styles.card}>
      <h3>Frequência de Treinos</h3>
      <div className={styles.daysContainer}>
        {days.map((day, index) => (
          <div key={index} className={`${styles.dayBubble} ${getDayClass(day.status)}`}>
            {renderDayContent(day)}
          </div>
        ))}
      </div>
    </div>
  );
}