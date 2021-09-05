declare global {
  declare module "vk-io" {
    export interface MessageContext {
      user: { id: number; balance: number }
    }
  }
  declare module "@vk-io/hear" {}
  declare module "middleware-io" {}

  declare global {
    import { Middleware } from "middleware-io"
    import { HearConditions } from "@vk-io/hear"
    import { MessageContext } from "vk-io"

    type commandTypes = {
      hearConditions: HearConditions<MessageContext>
      handler: Middleware<MessageContext>
    }
  }
}
