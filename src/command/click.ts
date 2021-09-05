import { usersRepository } from "../connect"

export const ClickCommand: commandTypes = {
  hearConditions: /^(?:click|клик)$/i,
  handler: async context => {
    context.user.balance += 1
    await usersRepository.save(context.user)

    await context.send(`За клик вы получили: 1$\nВаш баланс: ${context.user.balance}`)
  }
}
