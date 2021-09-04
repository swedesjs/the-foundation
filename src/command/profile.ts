export const ProfileCommand: commandTypes ={
  hearConditions: /^(?:профиль)$/i,
  handler: (context) => {
    context.send(`Профиль: ...`)
  }
}