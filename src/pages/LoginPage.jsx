import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './LoginPage.module.css';
import { FaDumbbell } from 'react-icons/fa';

export function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // TODO: Implementar autenticação com backend
    // Por enquanto, validação básica
    if (!email || !password) {
      setError('Por favor, preencha todos os campos');
      setIsLoading(false);
      return;
    }

    // Simulação de login (substituir por chamada à API)
    setTimeout(() => {
      setIsLoading(false);
      // Redirecionar para home após login bem-sucedido
      navigate('/');
    }, 1000);
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginCard}>
        {/* Logo e Título */}
        <div className={styles.logoSection}>
          <div className={styles.logoIcon}>
            <FaDumbbell />
          </div>
          <h1 className={styles.title}>FitTrack</h1>
          <p className={styles.subtitle}>Entre para continuar</p>
        </div>

        {/* Formulário */}
        <form onSubmit={handleSubmit} className={styles.form}>
          {error && (
            <div className={styles.errorMessage}>
              {error}
            </div>
          )}

          <div className={styles.inputGroup}>
            <label htmlFor="email" className={styles.label}>
              E-mail
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={styles.input}
              placeholder="seu@email.com"
              disabled={isLoading}
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="password" className={styles.label}>
              Senha
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={styles.input}
              placeholder="••••••••"
              disabled={isLoading}
            />
          </div>

          <button
            type="submit"
            className={styles.submitButton}
            disabled={isLoading}
          >
            {isLoading ? 'Entrando...' : 'Entrar'}
          </button>

          <div className={styles.footerLinks}>
            <a href="#esqueci-senha" className={styles.link}>
              Esqueci minha senha
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}


