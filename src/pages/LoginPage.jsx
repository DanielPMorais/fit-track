import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './LoginPage.module.css';
import { FaDumbbell } from 'react-icons/fa';
import { login } from '../services/api';
import { validateEmail, normalizeEmail } from '../utils/emailValidation';

export function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    setError('');
    
    // Validação de email em tempo real
    if (value.length > 0) {
      const emailValidation = validateEmail(value);
      if (!emailValidation.isValid) {
        setEmailError(emailValidation.error);
      } else {
        setEmailError('');
      }
    } else {
      setEmailError('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Validação básica
    if (!email || !password) {
      setError('Por favor, preencha todos os campos');
      setIsLoading(false);
      return;
    }

    // Validação de email
    const emailValidation = validateEmail(email);
    if (!emailValidation.isValid) {
      setError(emailValidation.error);
      setIsLoading(false);
      return;
    }

    try {
      // Normalizar email antes de enviar
      const normalizedEmail = normalizeEmail(email);
      await login(normalizedEmail, password);
      // Redirecionar para home após login bem-sucedido
      navigate('/');
    } catch (err) {
      setError(err.message || 'Erro ao fazer login. Verifique suas credenciais.');
      setIsLoading(false);
    }
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
              onChange={handleEmailChange}
              className={`${styles.input} ${emailError ? styles.inputError : ''}`}
              placeholder="seu@email.com"
              disabled={isLoading}
            />
            {emailError && (
              <span className={styles.fieldError}>{emailError}</span>
            )}
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

          <button
            type="button"
            className={styles.registerButton}
            onClick={() => navigate('/cadastro')}
          >
            Criar conta
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


