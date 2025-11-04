import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoPersonCircleOutline, IoMailOutline, IoKeyOutline, IoLanguageOutline, IoLogOutOutline, IoChevronForward } from 'react-icons/io5';
import { getCurrentUser, logout, updateProfile, updatePassword } from '../services/api';
import { ConfirmModal } from '../components/ConfirmModal';
import { UpdateProfileModal } from '../components/UpdateProfileModal';
import { UpdatePasswordModal } from '../components/UpdatePasswordModal';
import styles from './ProfilePage.module.css';

export function ProfilePage() {
  const navigate = useNavigate();
  const user = getCurrentUser();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showUpdateProfileModal, setShowUpdateProfileModal] = useState(false);
  const [showUpdatePasswordModal, setShowUpdatePasswordModal] = useState(false);

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

  const handleUpdateProfileClick = () => {
    setShowUpdateProfileModal(true);
  };

  const handleUpdatePasswordClick = () => {
    setShowUpdatePasswordModal(true);
  };

  const handleUpdateProfile = async (data) => {
    try {
      await updateProfile(data.name, data.email);
      // Recarregar página para atualizar dados na interface
      window.location.reload();
    } catch (error) {
      throw error; // Re-throw para o modal tratar
    }
  };

  const handleUpdatePassword = async (data) => {
    try {
      await updatePassword(data.currentPassword, data.newPassword);
    } catch (error) {
      throw error; // Re-throw para o modal tratar
    }
  };

  return (
    <div className={styles.profileContainer}>
      <h2 className={styles.pageTitle}>Perfil e Configurações</h2>

      <div className={styles.optionsList}>
        {/* Alterar foto */}
        <button
          className={styles.optionCard}
          onClick={() => console.log('Alterar foto - em desenvolvimento')}
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
          onClick={handleUpdateProfileClick}
        >
          <div className={styles.optionContent}>
            <div className={styles.iconWrapper}>
              <IoMailOutline className={styles.optionIcon} />
            </div>
            <span className={styles.optionText}>Alterar Nome ou Email</span>
          </div>
          <IoChevronForward className={styles.chevronIcon} />
        </button>

        {/* Atualizar senha */}
        <button
          className={styles.optionCard}
          onClick={handleUpdatePasswordClick}
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
          onClick={() => console.log('Alterar idioma - em desenvolvimento')}
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

      {/* Modal de atualizar perfil */}
      <UpdateProfileModal
        isOpen={showUpdateProfileModal}
        onClose={() => setShowUpdateProfileModal(false)}
        onSave={handleUpdateProfile}
      />

      {/* Modal de atualizar senha */}
      <UpdatePasswordModal
        isOpen={showUpdatePasswordModal}
        onClose={() => setShowUpdatePasswordModal(false)}
        onSave={handleUpdatePassword}
      />
    </div>
  );
}
