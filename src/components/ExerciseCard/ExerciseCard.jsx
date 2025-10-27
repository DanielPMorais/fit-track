import React from "react";
import styles from "./ExerciseCard.module.css";
import { FaPlayCircle, FaInfoCircle, FaStopwatch } from "react-icons/fa";

// Recebe `exercise` (objeto de exercício) e `isTraining` (para saber se está em modo treino)
// Por enquanto, `isTraining` será `false`
export function ExerciseCard({ exercise, isTraining = false }) {
  return (
    <div className={styles.card}>
      {/* Coluna do checkbox (visível apenas no modo treino) */}
      {isTraining && (
        <div className={styles.checkboxWrapper}>
          <input type="checkbox" className={styles.checkbox} />
        </div>
      )}

      {/* Coluna de informações do exercício */}
      <div className={styles.infoWrapper}>
        <h4 className={styles.title}>{exercise.title}</h4>
        
        <div className={styles.detail}>
          <FaInfoCircle />
          <span>Séries: <strong>{exercise.series}</strong></span>
        </div>

        <div className={styles.detail}>
          <FaInfoCircle />
          <span>Carga: <strong>{exercise.load}</strong></span>
        </div>
        
        <div className={styles.detail}>
          <FaStopwatch />
          <span>Intervalo: <strong>{exercise.interval}</strong></span>
        </div>
      </div>

      {/* Coluna do Vídeo/Thumbnail */}
      <div className={styles.videoWrapper}>
        <img 
          src="https://via.placeholder.com/100x100.png?text=Video" // Placeholder
          alt={`Vídeo do ${exercise.title}`} 
          className={styles.thumbnail} 
        />
        <FaPlayCircle className={styles.playIcon} />
      </div>
    </div>
  );
}