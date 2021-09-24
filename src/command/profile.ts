import { Keyboard } from "vk-io";

export const ProfileCommand: commandTypes = {
  hearConditions: /^(?:профиль)$/i,
  handler: (context) => context.send(`Профиль:\nID: ${context.user.id}\nБаланс: ${context.user.balance}`, {
    keyboard: Keyboard.builder().callbackButton({
      label: "Клик",
      payload: "click"
    })
  })
};
