declare global {
  declare module "vk-io" {}
  declare module "@vk-io/hear" {}
  declare module "middleware-io" {}

  declare global {
    // eslint-disable-next-line import/no-extraneous-dependencies
    import { Middleware } from "middleware-io";
    import { HearConditions } from "@vk-io/hear";
    import { MessageContext, MessageEventContext } from "vk-io";

    type ContextDefaultState = Record<"user", Record<"id" | "balance", number>>

    type Types<T> = Readonly<
      Record<"hearConditions", HearConditions<T & ContextDefaultState>> & Record<"handler", Middleware<T & ContextDefaultState>>
    >

    type commandTypes = Types<MessageContext>
    type eventCommandTypes = Types<MessageContext | MessageEventContext>
  }
}

type UnArray<T> = T extends (infer U)[] ? U : never
type UnPromise<T> = T extends PromiseLike<infer U> ? U : never
type ExtractInterface<T, K extends keyof T> = {
  [P in Extract<keyof T, K>]: T[P];
}
