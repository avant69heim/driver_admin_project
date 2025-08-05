export const environment = {
  production: false,
  api: {
    baseUrl: 'http://localhost:3000/api', // URL de tu backend con MongoDB
  },
  mongodb: {
    // Tu MongoDB connection string irá aquí cuando lo tengas
    connectionString: '', // Ejemplo: 'mongodb+srv://username:password@cluster.mongodb.net/database'
    databaseName: 'edv_route_db'
  }
};