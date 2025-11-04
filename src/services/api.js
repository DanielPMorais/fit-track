const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

// Função para obter o token do localStorage
const getToken = () => {
  return localStorage.getItem('token');
};

// Função para fazer requisições autenticadas
const fetchWithAuth = async (url, options = {}) => {
  const token = getToken();
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${url}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Erro na requisição' }));
    throw new Error(error.message || error.error || 'Erro na requisição');
  }

  return response.json();
};

// Função para fazer requisições simples (sem auth)
const fetchSimple = async (url, options = {}) => {
  const response = await fetch(`${API_BASE_URL}${url}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Erro na requisição' }));
    throw new Error(error.message || error.error || 'Erro na requisição');
  }

  return response.json();
};

// ========== AUTENTICAÇÃO ==========

export const register = async (name, email, password) => {
  const data = await fetchSimple('/auth/register', {
    method: 'POST',
    body: JSON.stringify({ name, email, password }),
  });

  // Salvar token
  if (data.token) {
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));
  }

  return data;
};

export const login = async (email, password) => {
  const data = await fetchSimple('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });

  // Salvar token
  if (data.token) {
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));
  }

  return data;
};

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};

export const getCurrentUser = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};

export const isAuthenticated = () => {
  return !!getToken();
};

export const updateProfile = async (name, email) => {
  const data = await fetchWithAuth('/auth/profile', {
    method: 'PATCH',
    body: JSON.stringify({ name, email }),
  });

  // Atualizar dados do usuário no localStorage
  if (data.user) {
    localStorage.setItem('user', JSON.stringify(data.user));
  }

  return data;
};

export const updatePassword = async (currentPassword, newPassword) => {
  return await fetchWithAuth('/auth/password', {
    method: 'PATCH',
    body: JSON.stringify({ currentPassword, newPassword }),
  });
};

// ========== ROTINAS ==========

export const fetchRoutines = async () => {
  return fetchWithAuth('/routines');
};

export const fetchRoutineById = async (routineId) => {
  return fetchWithAuth(`/routines/${routineId}`);
};

// ========== WORKOUT DAYS ==========

export const fetchWorkoutDayById = async (workoutId) => {
  return fetchWithAuth(`/workout-days/${workoutId}`);
};

export const completeWorkoutDay = async (workoutId) => {
  return fetchWithAuth(`/workout-days/${workoutId}/complete`, {
    method: 'PATCH',
  });
};

