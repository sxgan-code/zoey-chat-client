import sq3 from 'sqlite3'
import { is } from '@electron-toolkit/utils'

const sqlite3 = sq3.verbose()
let db: sq3.Database
if (is.dev) {
  db = new sqlite3.Database('db/chat.db')
} else {
  // 打包使用绝对路径
  db = new sqlite3.Database('D:/daniel/Note/zoey-chat-client/db/chat.db')
}


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
