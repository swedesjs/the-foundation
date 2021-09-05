import { createConnection, getRepository, Repository } from "typeorm"
import { Users } from "./entites"

export let usersRepository: Repository<Users>

createConnection().then(() => {
  usersRepository = getRepository(Users)
  console.log(`Connection!`)
})
