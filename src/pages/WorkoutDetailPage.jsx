import React, { useState, useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { fetchWorkoutDayById, completeWorkoutDay } from '../services/api';
import { ExerciseCard } from '../components/ExerciseCard';
import styles from './WorkoutDetailPage.module.css';

export function WorkoutDetailPage() {
  const { workoutId } = useParams();
  const [workoutDay, setWorkoutDay] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadWorkoutDay() {
      try {
        const data = await fetchWorkoutDayById(workoutId);
        setWorkoutDay(data);
      } catch (err) {
        setError(err.message || 'Erro ao carregar treino');
      } finally {
        setLoading(false);
      }
    }
    loadWorkoutDay();
  }, [workoutId]);

  const handleComplete = async () => {
    try {
      const updated = await completeWorkoutDay(workoutId);
      setWorkoutDay(updated.workoutDay);
    } catch (err) {
      console.error('Erro ao completar treino:', err);
    }
  };

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (error || !workoutDay) {
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
        <button className={styles.startButton} onClick={handleComplete}>
          INICIAR
        </button>
        <p>Você está no "modo visualização".<br />Aperte INICIAR para começar seu treino.</p>
      </div>

      {/* --- LISTA DE EXERCÍCIOS --- */}
      <div className={styles.exerciseList}>
        {workoutDay.exercises && workoutDay.exercises.length > 0 ? (
          workoutDay.exercises.map(exercise => (
            <ExerciseCard 
              key={exercise.id} 
              exercise={exercise}
              isTraining={false} // Fixo em 'false' por enquanto
            />
          ))
        ) : (
          <p>Nenhum exercício encontrado neste treino.</p>
        )}
      </div>

    </div>
  );
}