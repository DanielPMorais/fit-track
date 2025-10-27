import React from "react";
import styles from "./WorkoutDayItem.module.css";
import { Link } from "react-router-dom";
import { FaHistory, FaChartLine } from "react-icons/fa";

export function WorkoutDayItem({ day }) {
  // o `day` é um objeto vindo dos dados fictícios (mockData.js)

  const workoutLink = `/treino/${day.id}`;

  return (
    <div className={styles.itemWrapper}>
      <div className={styles.info}>
        <h4 className={styles.title}>
          {day.title}{" "}
          <span className={styles.description}>- {day.description}</span>
        </h4>
        <p className={styles.lastCompleted}>
          Último treino concluído em: {day.lastCompleted}
        </p>
      </div>

      <div className={styles.actions}>
        <button className={styles.actionButton}>
          <FaHistory />
          Histórico
        </button>
        <button className={styles.actionButton}>
          <FaChartLine />
          Evolução
        </button>
      </div>

      <Link to={workoutLink} className={styles.mainButton}>
        VER TREINO
      </Link>
    </div>
  );
}
