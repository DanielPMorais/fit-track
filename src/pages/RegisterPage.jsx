import React, { useState, useMemo } from "react";
import { useNavigate, Link } from "react-router-dom";
import styles from "./RegisterPage.module.css";
import { FaDumbbell } from "react-icons/fa";
import { IoCheckmarkCircle, IoCheckmarkCircleOutline } from "react-icons/io5";
import { register } from "../services/api";

export function RegisterPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Validações de senha em tempo real
  const passwordValidations = useMemo(() => {
    const password = formData.password;
    return {
      minLength: password.length >= 8,
      hasUpperCase: /[A-Z]/.test(password),
      hasLowerCase: /[a-z]/.test(password),
      hasSpecialChar: /[!@#$%^&*()_+\-={};':"\\|,.<>/?]/.test(password),
      hasNumber: /[0-9]/.test(password),
    };
  }, [formData.password]);

  const isPasswordValid = useMemo(() => {
    return Object.values(passwordValidations).every(Boolean);
  }, [passwordValidations]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Limpa erro ao digitar
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // Validações
    if (
      !formData.name ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      setError("Por favor, preencha todos os campos");
      setIsLoading(false);
      return;
    }

    if (!isPasswordValid) {
      setError("A senha não atende a todos os requisitos");
      setIsLoading(false);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("As senhas não coincidem");
      setIsLoading(false);
      return;
    }

    try {
      await register(formData.name, formData.email, formData.password);
      // Redirecionar para home após cadastro bem-sucedido
      navigate("/");
    } catch (err) {
      setError(err.message || "Erro ao criar conta. Tente novamente.");
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.registerContainer}>
      <div className={styles.registerCard}>
        {/* Logo e Título */}
        <div className={styles.logoSection}>
          <div className={styles.logoIcon}>
            <FaDumbbell />
          </div>
          <h1 className={styles.title}>FitTrack</h1>
          <p className={styles.subtitle}>Crie sua conta</p>
        </div>

        {/* Formulário */}
        <form onSubmit={handleSubmit} className={styles.form}>
          {error && <div className={styles.errorMessage}>{error}</div>}

          <div className={styles.inputGroup}>
            <label htmlFor="name" className={styles.label}>
              Nome completo
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              className={styles.input}
              placeholder="Seu nome completo"
              disabled={isLoading}
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="email" className={styles.label}>
              E-mail
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
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
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              className={styles.input}
              placeholder="••••••••"
              disabled={isLoading}
            />
            <div className={styles.passwordRequirements}>
              <div className={styles.requirement}>
                {passwordValidations.minLength ? (
                  <IoCheckmarkCircle className={styles.checkIcon} />
                ) : (
                  <IoCheckmarkCircleOutline
                    className={styles.checkIconOutline}
                  />
                )}
                <span
                  className={
                    passwordValidations.minLength
                      ? styles.requirementMet
                      : styles.requirementText
                  }
                >
                  Mínimo de 8 caracteres
                </span>
              </div>
              <div className={styles.requirement}>
                {passwordValidations.hasUpperCase ? (
                  <IoCheckmarkCircle className={styles.checkIcon} />
                ) : (
                  <IoCheckmarkCircleOutline
                    className={styles.checkIconOutline}
                  />
                )}
                <span
                  className={
                    passwordValidations.hasUpperCase
                      ? styles.requirementMet
                      : styles.requirementText
                  }
                >
                  1 letra maiúscula
                </span>
              </div>
              <div className={styles.requirement}>
                {passwordValidations.hasLowerCase ? (
                  <IoCheckmarkCircle className={styles.checkIcon} />
                ) : (
                  <IoCheckmarkCircleOutline
                    className={styles.checkIconOutline}
                  />
                )}
                <span
                  className={
                    passwordValidations.hasLowerCase
                      ? styles.requirementMet
                      : styles.requirementText
                  }
                >
                  1 letra minúscula
                </span>
              </div>
              <div className={styles.requirement}>
                {passwordValidations.hasSpecialChar ? (
                  <IoCheckmarkCircle className={styles.checkIcon} />
                ) : (
                  <IoCheckmarkCircleOutline
                    className={styles.checkIconOutline}
                  />
                )}
                <span
                  className={
                    passwordValidations.hasSpecialChar
                      ? styles.requirementMet
                      : styles.requirementText
                  }
                >
                  1 caractere especial
                </span>
              </div>
              <div className={styles.requirement}>
                {passwordValidations.hasNumber ? (
                  <IoCheckmarkCircle className={styles.checkIcon} />
                ) : (
                  <IoCheckmarkCircleOutline
                    className={styles.checkIconOutline}
                  />
                )}
                <span
                  className={
                    passwordValidations.hasNumber
                      ? styles.requirementMet
                      : styles.requirementText
                  }
                >
                  1 número
                </span>
              </div>
            </div>
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="confirmPassword" className={styles.label}>
              Confirmar senha
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
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
            {isLoading ? "Criando conta..." : "Criar conta"}
          </button>

          <div className={styles.footerLinks}>
            <p className={styles.footerText}>
              Já tem uma conta?{" "}
              <Link to="/login" className={styles.link}>
                Entrar
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
