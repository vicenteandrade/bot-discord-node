const execute = (bot, message, args) => {
  const queue = bot.queues.get(message.guild.id);
  if (!queue) {
    return message.reply(
      "Não existe música pra recomeçar a reprodução maluco!"
    );
  }
  queue.dispatcher.resume(); // Responsável por recomeçar a tocar a música atual da fila
};

module.exports = {
  name: "resume",
  help: "Retorna a música atual da fila",
  execute,
};
