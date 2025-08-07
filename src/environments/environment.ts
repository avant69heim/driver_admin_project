export const environment = {
  production: false,
  api: {
    baseUrl: 'http://localhost:3000/api', // Backend EDV corriendo en puerto 3000
    healthCheckUrl: 'http://localhost:3000/health', // Endpoint de health check
  },
  cors: {
    origin: 'http://localhost:6500', // Puerto del frontend Angular
  },
  mongodb: {
    // Configuración manejada por el backend
    databaseName: 'edv_backend'
  }
};