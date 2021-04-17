import sql from 'mssql/msnodesqlv8'

const pool = new sql.ConnectionPool({
  database: 'CS-B',
  server: 'localhost\\SQLEXPRESS',
  driver: 'msnodesqlv8',
  options: {
    trustedConnection: true
  }
})


export default pool