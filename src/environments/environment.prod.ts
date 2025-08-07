export const environment = {
  production: true,
  api: {
    baseUrl: 'https://your-production-api.com/api', // URL de producción del backend EDV
    healthCheckUrl: 'https://your-production-api.com/health',
  },
  cors: {
    origin: 'https://your-production-domain.com',
  },
  mongodb: {
    // Configuración manejada por el backend
    databaseName: 'edv_backend_production'
  }
};