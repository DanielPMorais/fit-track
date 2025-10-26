import React from "react";
import { Outlet, Link } from "react-router-dom";
import styles from "./Layout.module.css";

const IconHome = () => <span></span>;
const IconWhatsApp = () => <span></span>;
const IconMenu = () => <span></span>;

export function Layout() {
  return (
    <div className={styles.appContainer}>
      <header className={styles.header}>
        {/* <img src="logo-placeholder.svg" alt="FitTrack Logo" className={styles.logo} /> */}
      </header>

      <main className={styles.mainContent}>
        <Outlet />
      </main>

      <footer className={styles.bottomNav}>
        <Link to="/" className={styles.navButton}>
          <IconHome />
          <span>Início</span>
        </Link>
        <a href="https://wa.me/your-number" className={styles.navButton}>
          <IconWhatsApp />
          <span>WhatsApp</span>
        </a>
        <button className={styles.navButton}>
          <IconMenu />
          <span>Menu</span>
        </button>
      </footer>
    </div>
  );
}