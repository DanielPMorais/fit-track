import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoPersonCircleOutline, IoMailOutline, IoKeyOutline, IoLanguageOutline, IoLogOutOutline, IoChevronForward } from 'react-icons/io5';
import { getCurrentUser, logout } from '../services/api';
import { ConfirmModal } from '../components/ConfirmModal';
import styles from './ProfilePage.module.css';

export function ProfilePage() {
  const navigate = useNavigate();
  const user = getCurrentUser();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleLogoutClick = () => {
    setShowLogoutModal(true);
  };

  const handleLogoutConfirm = () => {
    logout();
    setShowLogoutModal(false);
    navigate('/login');
  };

  const handleLogoutCancel = () => {
    setShowLogoutModal(false);
  };

  const handleOptionClick = (option) => {
    // Por enquanto apenas console.log - pode implementar as telas depois
    console.log(`Opção selecionada: ${option}`);
    // Exemplo: navigate(`/perfil/${option}`);
  };

  return (
    <div className={styles.profileContainer}>
      <h2 className={styles.pageTitle}>Perfil e Configurações</h2>

      <div className={styles.optionsList}>
        {/* Alterar foto */}
        <button
          className={styles.optionCard}
          onClick={() => handleOptionClick('alterar-foto')}
        >
          <div className={styles.optionContent}>
            <div className={styles.iconWrapper}>
              <IoPersonCircleOutline className={styles.optionIcon} />
            </div>
            <span className={styles.optionText}>Alterar foto</span>
          </div>
          <IoChevronForward className={styles.chevronIcon} />
        </button>

        {/* Nome ou Email */}
        <button
          className={styles.optionCard}
          onClick={() => handleOptionClick('editar-dados')}
        >
          <div className={styles.optionContent}>
            <div className={styles.iconWrapper}>
              <IoMailOutline className={styles.optionIcon} />
            </div>
            <span className={styles.optionText}>Nome ou Email</span>
          </div>
          <IoChevronForward className={styles.chevronIcon} />
        </button>

        {/* Atualizar senha */}
        <button
          className={styles.optionCard}
          onClick={() => handleOptionClick('atualizar-senha')}
        >
          <div className={styles.optionContent}>
            <div className={styles.iconWrapper}>
              <IoKeyOutline className={styles.optionIcon} />
            </div>
            <span className={styles.optionText}>Atualizar senha</span>
          </div>
          <IoChevronForward className={styles.chevronIcon} />
        </button>

        {/* Alterar idioma */}
        <button
          className={styles.optionCard}
          onClick={() => handleOptionClick('alterar-idioma')}
        >
          <div className={styles.optionContent}>
            <div className={styles.iconWrapper}>
              <IoLanguageOutline className={styles.optionIcon} />
            </div>
            <span className={styles.optionText}>Alterar idioma</span>
          </div>
          <IoChevronForward className={styles.chevronIcon} />
        </button>
      </div>

      {/* Logout */}
      <button
        className={`${styles.optionCard} ${styles.logoutButton}`}
        onClick={handleLogoutClick}
      >
        <div className={styles.optionContent}>
          <div className={styles.iconWrapper}>
            <IoLogOutOutline className={styles.optionIcon} />
          </div>
          <span className={styles.optionText}>Sair</span>
        </div>
        <IoChevronForward className={styles.chevronIcon} />
      </button>

      {/* Informações do usuário */}
      {user && (
        <div className={styles.userInfo}>
          <p className={styles.userEmail}>{user.email}</p>
        </div>
      )}

      {/* Modal de confirmação de logout */}
      <ConfirmModal
        isOpen={showLogoutModal}
        onClose={handleLogoutCancel}
        onConfirm={handleLogoutConfirm}
        title="Confirmar saída"
        message="Tem certeza que deseja sair da sua conta?"
        confirmText="Sair"
        cancelText="Cancelar"
        confirmButtonClass="danger"
      />
    </div>
  );
}
