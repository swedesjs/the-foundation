import { MessageContext, MessageEventContext, VK } from "vk-io"
import { HearConditions, HearManager } from "@vk-io/hear"
import { config } from "dotenv"

import { usersRepository } from "./connect"

import * as command from "./command"

config()

const vk = new VK({
  token: process.env.TOKEN
})

const hearManager = new HearManager<MessageContext>()
const eventManager = new HearManager<MessageEventContext>()

/**
 * Creates a user
 * @param id User Id
 */
const createUser = (id: number) => usersRepository.save(usersRepository.create({ id }))

vk.updates.use<MessageContext | MessageEventContext>(async (context, next) => {
  if (context.is(["message_new"]) || context.is(["message_event"])) {
    const senderId = context.senderId || context.userId

    context.user = await usersRepository.findOne(senderId)

    if (!context.user) context.user = await createUser(senderId)

    await next()
  }
})

vk.updates.on("message_new", hearManager.middleware)
vk.updates.on("message_event", eventManager.middleware)

const match = /get\s(.*)\(\)/g

const getGetter = (classes: object) =>
  classes
    .toString()
    .match(match)
    .map(value => value.replace(/get\s/, "").replace("()", ""))

Object.values(command).forEach(({ hearConditions, handler }) => {
  // @ts-expect-error
  if (hearConditions.eventPayload) {
    // @ts-expect-error
    const eventCondition = { ...hearConditions } as unknown as HearConditions<MessageEventContext>
    const getters = getGetter(MessageContext)
    getters.push("text")

    getters.forEach(value => delete eventCondition[value])

    // @ts-expect-error
    eventManager.hear(eventCondition, handler)
  }

  getGetter(MessageEventContext).forEach(value => (typeof hearConditions == "object" ? delete hearConditions[value] : null))

  // @ts-expect-error
  hearManager.hear(hearConditions, handler)
})

vk.updates.start()
