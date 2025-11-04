import React from "react";
import styles from "./HomePage.module.css";

import { FrequencyTracker } from "../components/FrequencyTracker";
import { NavButton } from "../components/NavButton";

import {
  FaDumbbell,
  FaFileAlt,
  FaClipboardList,
  FaChartLine,
  FaDollarSign,
  FaArchive,
  FaPlus,
} from "react-icons/fa";

export function HomePage() {
  return (
    <div>
      <h2 className={styles.greeting}>Olá, Daniel!</h2>

      <FrequencyTracker />

      <div className={styles.navGrid}>
        {/* Nossos botões reutilizáveis! */}

        <NavButton to="/adicionar-treino" label="Adicionar Treino">
          <FaPlus />
        </NavButton>

        <NavButton to="/treinos" label="Treinos">
          <FaDumbbell />
        </NavButton>

        <NavButton to="/avaliacoes" label="Avaliações">
          <FaClipboardList />
        </NavButton>

        <NavButton to="/progresso" label="Meu Progresso">
          <FaChartLine />
        </NavButton>

        <NavButton to="/faturas" label="Faturas">
          <FaDollarSign />
        </NavButton>

        <NavButton to="/arquivos" label="Arquivos">
          <FaArchive />
        </NavButton>
      </div>
    </div>
  );
}
