import { MessageContext } from "vk-io"
import { usersRepository } from "../connect"

export const ClickCommand: eventCommandTypes = {
  hearConditions: {
    text: /^(?:click|клик)$/i,
    eventPayload: "click"
  },
  handler: async context => {
    context.user.balance += 1
    await usersRepository.save(context.user)

    const text = `За клик вы получили: 1$\nВаш баланс: ${context.user.balance}`

    if (context instanceof MessageContext) await context.send(text)
    else context.answer({ type: "show_snackbar", text })
  }
}
