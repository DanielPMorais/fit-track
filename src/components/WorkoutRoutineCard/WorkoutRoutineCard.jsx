import React from "react";
import styles from "./WorkoutRoutineCard.module.css";
import { FaCalendarAlt, FaChevronDown, FaChevronUp } from 'react-icons/fa';

export function WorkoutRoutineCard({ routine, children }) {
  // o `routine` é um objeto vindo dos dados fictícios (mockData.js)
  // o `children` são os componentes WorkoutDayItem
  const [isOpen, setIsOpen] = React.useState(false);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={styles.card}>
      <button className={styles.header} onClick={toggleOpen}>
        <div className={styles.iconWrapper}>
          {routine.icon}
        </div>
        <div className={styles.titleWrapper}>
          <h3 className={styles.title}>{routine.title}</h3>
          <span className={styles.dateRange}>
            <FaCalendarAlt /> {routine.dateRange}
          </span>
        </div>
        <div className={styles.toggleIcon}>
          {isOpen ? <FaChevronUp /> : <FaChevronDown />}
        </div>
      </button>

      {/* Renderização condicional do conteúdo */}
      {isOpen && (
        <div className={styles.content}>
          {children}
        </div>
      )}
    </div>
  );
}