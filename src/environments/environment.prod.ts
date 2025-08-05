export const environment = {
  production: true,
  api: {
    baseUrl: 'https://your-production-api.com/api', // URL de producción
  },
  mongodb: {
    // Tu MongoDB Atlas connection string para producción
    connectionString: '', // Se configurará desde variables de entorno
    databaseName: 'edv_route_production'
  }
};