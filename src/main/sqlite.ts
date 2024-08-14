import sq3 from 'sqlite3'

const sqlite3 = sq3.verbose()
const db = new sqlite3.Database('sq3.db')

db.serialize(() => {
  db.run('create table test(name varchar(20))', () => {
    db.run('insert into test values(\'nihao\')', () => {
      db.all('select * from test', (err, res) => {
        if (err) throw err
        console.log(JSON.stringify(res))
      })
    })
  })
})
export default db
