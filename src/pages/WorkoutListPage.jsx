import React, { useState, useEffect } from "react";
import { fetchRoutines } from "../services/api";
import { WorkoutRoutineCard } from "../components/WorkoutRoutineCard/WorkoutRoutineCard";
import { WorkoutDayItem } from "../components/WorkoutDayItem/WorkoutDayItem";

import styles from "./WorkoutListPage.module.css";

export function WorkoutListPage() {
  const [routines, setRoutines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadRoutines() {
      try {
        const data = await fetchRoutines();
        setRoutines(data);
      } catch (err) {
        setError(err.message || "Erro ao carregar rotinas");
      } finally {
        setLoading(false);
      }
    }
    loadRoutines();
  }, []);

  if (loading) {
    return (
      <div>
        <h2 className={styles.pageTitle}>Rotinas de Treinos</h2>
        <p>Carregando...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <h2 className={styles.pageTitle}>Rotinas de Treinos</h2>
        <p style={{ color: "var(--feedback-error-text)" }}>Erro: {error}</p>
      </div>
    );
  }

  return (
    <div>
      <h2 className={styles.pageTitle}>Rotinas de Treinos</h2>

      <div className={styles.listContainer}>
        {routines.length === 0 ? (
          <p>Nenhuma rotina encontrada.</p>
        ) : (
          routines.map((routine) => (
            <WorkoutRoutineCard key={routine.id} routine={routine}>
              {routine.days.map((day) => (
                <WorkoutDayItem key={day.id} day={day} />
              ))}
            </WorkoutRoutineCard>
          ))
        )}
      </div>
    </div>
  );
}