import ServerUrl from '@/service/ServerUrl';
import axios from 'axios';

const client = axios.create({
  baseURL: `${ServerUrl}/api`,
  headers: {
    'Content-Type': 'application/json'
  }
});

client.interceptors.request.use(
  async (config) => {
    const token = (await import('next-auth/react'))
      .getSession()
      .then((session) => session?.user?.token)
      .catch(() => null);

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default client;
