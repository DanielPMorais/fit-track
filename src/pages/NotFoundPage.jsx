import React from 'react';
import styles from './NotFoundPage.module.css';

export function NotFoundPage() {
  return (
    <div className={styles.notFoundContainer}>
      <div className={styles.content}>
        <div className={styles.iconContainer}>
          <span className={styles.errorCode}>404</span>
        </div>
        
        <h1 className={styles.title}>Página não encontrada</h1>
        
        <p className={styles.message}>
          A página que você está procurando não existe ou foi movida.
        </p>
      </div>
    </div>
  );
}

