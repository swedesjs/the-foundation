import { MessageContext, VK } from "vk-io"
import { HearManager } from "@vk-io/hear"
import { config } from "dotenv"

import * as command from "./command"

config()

const vk = new VK({
  token: process.env.TOKEN
})

const hearManager = new HearManager<MessageContext>()

vk.updates.on("message_new", hearManager.middleware)

Object.values(command).forEach(({ hearConditions, handler }) => hearManager.hear(hearConditions, handler))

vk.updates.start()
