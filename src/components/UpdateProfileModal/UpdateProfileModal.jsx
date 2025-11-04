import React, { useState, useEffect } from 'react';
import { Modal } from '../Modal';
import { getCurrentUser } from '../../services/api';
import { validateEmail, normalizeEmail } from '../../utils/emailValidation';
import styles from './UpdateProfileModal.module.css';

export function UpdateProfileModal({ isOpen, onClose, onSave }) {
  const user = getCurrentUser();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
  });
  const [error, setError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [originalEmail, setOriginalEmail] = useState('');

  useEffect(() => {
    if (isOpen && user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
      });
      setOriginalEmail(user.email || '');
      setError('');
      setEmailError('');
    }
  }, [isOpen, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (error) setError('');
    
    // Validação de email em tempo real
    if (name === 'email') {
      const emailValidation = validateEmail(value);
      if (!emailValidation.isValid && value.length > 0) {
        setEmailError(emailValidation.error);
      } else {
        setEmailError('');
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Validações
    if (!formData.name.trim()) {
      setError('O nome é obrigatório');
      setIsLoading(false);
      return;
    }

    // Validação de email
    const emailValidation = validateEmail(formData.email);
    if (!emailValidation.isValid) {
      setError(emailValidation.error);
      setIsLoading(false);
      return;
    }

    // Verificar se o email foi alterado
    const normalizedNewEmail = normalizeEmail(formData.email);
    const normalizedOriginalEmail = normalizeEmail(originalEmail);
    
    // Se o email mudou, pode ser necessário verificar se já existe no backend
    // Por enquanto, apenas normalizamos
    const dataToSave = {
      name: formData.name.trim(),
      email: normalizedNewEmail,
    };

    try {
      await onSave(dataToSave);
      onClose();
    } catch (err) {
      setError(err.message || 'Erro ao atualizar dados');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Alterar Nome ou Email">
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
            className={`${styles.input} ${emailError ? styles.inputError : ''}`}
            placeholder="seu@email.com"
            disabled={isLoading}
          />
          {emailError && (
            <span className={styles.fieldError}>{emailError}</span>
          )}
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
            disabled={isLoading}
          >
            {isLoading ? 'Salvando...' : 'Salvar'}
          </button>
        </div>
      </form>
    </Modal>
  );
}

