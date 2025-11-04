import React, { useState, useMemo } from 'react';
import { Modal } from '../Modal';
import { IoCheckmarkCircle, IoCheckmarkCircleOutline } from 'react-icons/io5';
import styles from './UpdatePasswordModal.module.css';

export function UpdatePasswordModal({ isOpen, onClose, onSave }) {
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Validações de senha em tempo real
  const passwordValidations = useMemo(() => {
    const password = formData.newPassword;
    return {
      minLength: password.length >= 8,
      hasUpperCase: /[A-Z]/.test(password),
      hasLowerCase: /[a-z]/.test(password),
      hasSpecialChar: /[!@#$%^&*()_+\-={};':"\\|,.<>/?]/.test(password),
      hasNumber: /[0-9]/.test(password),
    };
  }, [formData.newPassword]);

  const isPasswordValid = useMemo(() => {
    return Object.values(passwordValidations).every(Boolean);
  }, [passwordValidations]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Validações
    if (!formData.currentPassword) {
      setError('A senha atual é obrigatória');
      setIsLoading(false);
      return;
    }

    if (!formData.newPassword) {
      setError('A nova senha é obrigatória');
      setIsLoading(false);
      return;
    }

    if (!isPasswordValid) {
      setError('A nova senha não atende a todos os requisitos');
      setIsLoading(false);
      return;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      setError('As senhas não coincidem');
      setIsLoading(false);
      return;
    }

    if (formData.currentPassword === formData.newPassword) {
      setError('A nova senha deve ser diferente da senha atual');
      setIsLoading(false);
      return;
    }

    try {
      await onSave({
        currentPassword: formData.currentPassword,
        newPassword: formData.newPassword,
      });
      // Mostrar mensagem de sucesso
      setSuccess(true);
      setError('');
      // Limpar formulário
      setFormData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
      // Fechar modal após sucesso
      setTimeout(() => {
        setSuccess(false);
        onClose();
      }, 1500);
    } catch (err) {
      setError(err.message || 'Erro ao atualizar senha');
      setSuccess(false);
    } finally {
      setIsLoading(false);
    }
  };

  // Reset form when modal closes
  React.useEffect(() => {
    if (!isOpen) {
      setFormData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
      setError('');
      setSuccess(false);
    }
  }, [isOpen]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Atualizar Senha">
      <form onSubmit={handleSubmit} className={styles.form}>
        {success && (
          <div className={styles.successMessage}>
            Senha atualizada com sucesso!
          </div>
        )}
        {error && <div className={styles.errorMessage}>{error}</div>}

        <div className={styles.inputGroup}>
          <label htmlFor="currentPassword" className={styles.label}>
            Senha atual
          </label>
          <input
            id="currentPassword"
            name="currentPassword"
            type="password"
            value={formData.currentPassword}
            onChange={handleChange}
            className={styles.input}
            placeholder="••••••••"
            disabled={isLoading}
          />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="newPassword" className={styles.label}>
            Nova senha
          </label>
          <input
            id="newPassword"
            name="newPassword"
            type="password"
            value={formData.newPassword}
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
                <IoCheckmarkCircleOutline className={styles.checkIconOutline} />
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
                <IoCheckmarkCircleOutline className={styles.checkIconOutline} />
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
                <IoCheckmarkCircleOutline className={styles.checkIconOutline} />
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
                <IoCheckmarkCircleOutline className={styles.checkIconOutline} />
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
                <IoCheckmarkCircleOutline className={styles.checkIconOutline} />
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
            Confirmar nova senha
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

        <div className={styles.formButtons}>
          <button
            type="button"
            className={`${styles.button} ${styles.cancelButton}`}
            onClick={onClose}
            disabled={isLoading}
          >
            Cancelar
          </button>
          <button
            type="submit"
            className={`${styles.button} ${styles.saveButton}`}
            disabled={isLoading || !isPasswordValid}
          >
            {isLoading ? 'Salvando...' : 'Salvar'}
          </button>
        </div>
      </form>
    </Modal>
  );
}

