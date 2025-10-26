import React from "react";
import { mockRoutines } from "../services/mockData";
import { WorkoutRoutineCard } from "../components/WorkoutRoutineCard/WorkoutRoutineCard";
import { WorkoutDayItem } from "../components/WorkoutDayItem/WorkoutDayItem";

import styles from "./WorkoutListPage.module.css";

export function WorkoutListPage() {
  const routines = mockRoutines; //quando a API estiver pronta, usaremos: const routines = useFetch('/api/routines');

  return (
    <div>
      <h2 className={styles.pageTitle}>Rotinas de Treinos</h2>

      <div className={styles.listContainer}>
        {routines.map((routine) => (
          <WorkoutRoutineCard key={routine.id} routine={routine}>
            {routine.days.map((day) => (
              <WorkoutDayItem key={day.id} day={day} />
            ))}
          </WorkoutRoutineCard>
        ))}
      </div>
    </div>
  );
}