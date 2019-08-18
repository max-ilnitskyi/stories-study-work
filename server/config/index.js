const config = {
  staticBuildRelativePath: '../client/build',
  serverPort: process.env.PORT || '3001',
  mongodbUri: process.env.MONGODB_URI || `mongodb://localhost:27017/stories`,
  secret:
    process.env.NODE_ENV === 'production'
      ? process.env.SECRET || 'fallback-secret-YJBoJrK3JD'
      : 'dev-secret'
};

module.exports = config;
