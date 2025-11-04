/**
 * Validação robusta de email
 * @param {string} email - Email a ser validado
 * @returns {object} - { isValid: boolean, error: string }
 */
export const validateEmail = (email) => {
  if (!email || !email.trim()) {
    return {
      isValid: false,
      error: 'O e-mail é obrigatório',
    };
  }

  const trimmedEmail = email.trim().toLowerCase();

  // Regex mais robusto para validação de email
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

  if (!emailRegex.test(trimmedEmail)) {
    return {
      isValid: false,
      error: 'Por favor, insira um e-mail válido',
    };
  }

  // Verificar se não tem espaços
  if (email.includes(' ')) {
    return {
      isValid: false,
      error: 'O e-mail não pode conter espaços',
    };
  }

  // Verificar tamanho máximo
  if (trimmedEmail.length > 254) {
    return {
      isValid: false,
      error: 'O e-mail é muito longo (máximo 254 caracteres)',
    };
  }

  // Verificar se tem @ e pelo menos um ponto depois do @
  const parts = trimmedEmail.split('@');
  if (parts.length !== 2) {
    return {
      isValid: false,
      error: 'Formato de e-mail inválido',
    };
  }

  const [localPart, domain] = parts;

  // Verificar parte local (antes do @)
  if (localPart.length === 0 || localPart.length > 64) {
    return {
      isValid: false,
      error: 'A parte local do e-mail é inválida',
    };
  }

  // Verificar domínio
  if (domain.length === 0 || !domain.includes('.')) {
    return {
      isValid: false,
      error: 'O domínio do e-mail é inválido',
    };
  }

  // Verificar se o domínio não começa ou termina com ponto ou hífen
  if (domain.startsWith('.') || domain.endsWith('.') || domain.startsWith('-') || domain.endsWith('-')) {
    return {
      isValid: false,
      error: 'O domínio do e-mail é inválido',
    };
  }

  return {
    isValid: true,
    error: null,
  };
};

/**
 * Normaliza o email (trim e lowercase)
 */
export const normalizeEmail = (email) => {
  if (!email) return '';
  return email.trim().toLowerCase();
};

