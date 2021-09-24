/* eslint-disable no-console */
import { createConnection, getRepository, Repository } from "typeorm";

import { Users } from "./entites";
import ormconfig from "../ormconfig.json";

export let usersRepository: Repository<Users>;

// @ts-expect-error
createConnection({ ...ormconfig, entities: [Users] }).then(() => {
  usersRepository = getRepository(Users);
  console.log(`Connection!`);
});
