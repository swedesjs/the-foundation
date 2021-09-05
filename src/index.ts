import { MessageContext, VK } from "vk-io"
import { HearManager } from "@vk-io/hear"
import { config } from "dotenv"

import * as command from "./command"
import { usersRepository } from "./connect"

config()

const vk = new VK({
  token: process.env.TOKEN
})

const hearManager = new HearManager<MessageContext>()

/**
 * Creates a user
 * @param id User Id
 */
const createUser = (id: number) => usersRepository.save(usersRepository.create({ id }))

vk.updates.on("message", async (context, next) => {
  context.user = await usersRepository.findOne(context.senderId)

  if (!context.user) context.user = await createUser(context.senderId)

  await next()
})

vk.updates.on("message", hearManager.middleware)

Object.values(command).forEach(({ hearConditions, handler }) => hearManager.hear(hearConditions, handler))

vk.updates.start()
