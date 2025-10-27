import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { findWorkoutDayById } from '../services/mockData';
import { ExerciseCard } from '../components/ExerciseCard';
import styles from './WorkoutDetailPage.module.css';

export function WorkoutDetailPage() {
  const { workoutId } = useParams();
  
  // "Buscamos" os dados do treino usando o ID da URL
  const workoutDay = findWorkoutDayById(workoutId);

  // Se o treino não for encontrado, redireciona para a home
  if (!workoutDay) {
    console.error("Workout not found!");
    return <Navigate to="/" replace />;
  }

  return (
    <div>
      {/* --- CABEÇALHO --- */}
      <header className={styles.pageHeader}>
        <button className={styles.downloadButton}>Baixar treino</button>
        <h2 className={styles.pageTitle}>{workoutDay.description}</h2>
      </header>

      {/* --- BARRA DE INICIAR --- */}
      <div className={styles.startBar}>
        <button className={styles.startButton}>
          INICIAR
        </button>
        <p>Você está no "modo visualização".<br />Aperte INICIAR para começar seu treino.</p>
      </div>

      {/* --- LISTA DE EXERCÍCIOS --- */}
      <div className={styles.exerciseList}>
        {workoutDay.exercises.map(exercise => (
          <ExerciseCard 
            key={exercise.id} 
            exercise={exercise}
            isTraining={false} // Fixo em 'false' por enquanto
          />
        ))}
      </div>

    </div>
  );
}