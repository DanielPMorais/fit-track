import React from "react";
import { Link } from "react-router-dom";
import styles from "./NavButton.module.css";

// Nosso botão aceitará 'to' (para onde navegar), 'label' (o texto)
// e 'children' (que será o ícone que passarmos)
export function NavButton({ to, label, children }) {
  return (
    <Link to={to} className={styles.navButton}>
      <div className={styles.iconWrapper}>{children}</div>
      <span>{label}</span>
    </Link>
  );
}
