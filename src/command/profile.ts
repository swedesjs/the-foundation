export const ProfileCommand: commandTypes = {
  hearConditions: /^(?:профиль)$/i,
  handler: context => context.send(`Профиль:\nID: ${context.user.id}\nБаланс: ${context.user.balance}`)
}
