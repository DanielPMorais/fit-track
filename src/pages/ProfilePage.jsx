import React from 'react';
import { useNavigate } from 'react-router-dom';
import { IoPersonCircleOutline, IoMailOutline, IoKeyOutline, IoLanguageOutline, IoLogOutOutline, IoChevronForward } from 'react-icons/io5';
import { getCurrentUser, logout } from '../services/api';
import styles from './ProfilePage.module.css';

export function ProfilePage() {
  const navigate = useNavigate();
  const user = getCurrentUser();

  const handleLogout = () => {
    logout();
    navigate('/login');
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
        onClick={handleLogout}
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
    </div>
  );
}
