var connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/citybook';

module.exports = connectionString;
