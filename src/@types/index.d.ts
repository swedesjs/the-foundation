declare global {
  declare module "vk-io" {}
  declare module "@vk-io/hear" {}
  declare module "middleware-io" {}

  declare global {
    import { NextMiddleware } from "middleware-io"
    import { HearConditions } from "@vk-io/hear"
    import { MessageContext } from "vk-io"

    type commandTypes = {
      hearConditions: HearConditions<MessageContext>
      handler: (context: MessageContext, next?: NextMiddleware) => void
    }
  }
}
