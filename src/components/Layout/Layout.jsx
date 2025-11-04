import React from "react";
import { Outlet, Link, NavLink, useNavigate } from "react-router-dom";
import styles from "./Layout.module.css";

import { IoChevronBack, IoHomeOutline, IoPersonOutline } from "react-icons/io5";
import { FaDumbbell } from 'react-icons/fa';

export function Layout() {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className={styles.appContainer}>
      <header className={styles.header}>
        <div className={styles.logoContainer}>
          <div className={styles.logoIcon}>
            <FaDumbbell />
          </div>
          <label className={styles.logo}>FitTrack</label>
        </div>
      </header>

      <main className={styles.mainContent}>
        <Outlet />
      </main>

      <footer className={styles.bottomNav}>
        {/* 1. Botão Voltar (Esquerda) */}
        <button onClick={handleBack} className={styles.navButton}>
          <IoChevronBack className={styles.navIcon} />
          <span>Voltar</span>
        </button>

        {/* 2. Botão Início (Centro) - Usamos NavLink */}
        <NavLink
          to="/"
          // O NavLink nos dá 'isActive' para aplicarmos um estilo especial
          className={({ isActive }) =>
            isActive ? `${styles.navButton} ${styles.active}` : styles.navButton
          }
          end // 'end' garante que ele só fica ativo na rota exata "/"
        >
          <IoHomeOutline className={styles.navIcon} />
          <span>Início</span>
        </NavLink>

        {/* 3. Botão Perfil (Direita) - Usamos Link normal */}
        <NavLink
          to="/perfil"
          className={({ isActive }) =>
            isActive ? `${styles.navButton} ${styles.active}` : styles.navButton
          }
          end
        >
          <IoPersonOutline className={styles.navIcon} />
          <span>Perfil</span>
        </NavLink>
      </footer>
    </div>
  );
}
