import axios from 'axios';

const API_BASE_URL = '/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Interceptor to attach JWT token to admin requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('adminToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => Promise.reject(error));

export const authApi = {
  login: async (email, password) => {
    const res = await api.post('/auth/login', { email, password });
    if (res.data.success && res.data.data.token) {
      localStorage.setItem('adminToken', res.data.data.token);
    }
    return res.data;
  },
  logout: () => {
    localStorage.removeItem('adminToken');
  },
  getMe: async () => {
    const res = await api.get('/auth/me');
    return res.data;
  }
};

export const leadsApi = {
  submitIdea: async (leadData) => {
    const res = await api.post('/leads', leadData);
    return res.data;
  },
  getLeads: async (params = {}) => {
    const res = await api.get('/leads', { params });
    return res.data;
  },
  updateLeadStatus: async (id, status, adminNotes) => {
    const res = await api.patch(`/leads/${id}`, { status, adminNotes });
    return res.data;
  },
  deleteLead: async (id) => {
    const res = await api.delete(`/leads/${id}`);
    return res.data;
  },
  qualifyLeadWithAI: async (id) => {
    const res = await api.post(`/leads/${id}/ai-qualify`);
    return res.data;
  }
};

export const projectsApi = {
  getProjects: async (category = 'All') => {
    const res = await api.get('/projects', { params: { category } });
    return res.data;
  },
  createProject: async (projectData) => {
    const res = await api.post('/projects', projectData);
    return res.data;
  },
  updateProject: async (id, projectData) => {
    const res = await api.patch(`/projects/${id}`, projectData);
    return res.data;
  },
  deleteProject: async (id) => {
    const res = await api.delete(`/projects/${id}`);
    return res.data;
  }
};

export const testimonialsApi = {
  getTestimonials: async () => {
    const res = await api.get('/testimonials');
    return res.data;
  }
};

export const faqsApi = {
  getFAQs: async () => {
    const res = await api.get('/faqs');
    return res.data;
  }
};

export const statsApi = {
  getSummary: async () => {
    const res = await api.get('/stats/summary');
    return res.data;
  }
};

export default api;
