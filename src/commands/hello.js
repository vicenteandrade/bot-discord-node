const execute = (bot, message, args) => {
  return message.reply("Fala meu parcero, fé com fé maluco!");
};

module.exports = {
  name: "hello",
  help: "Dar um hello para o bot.",
  execute,
};
