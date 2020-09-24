const execute = (bot, message, args) => {
  const queue = bot.queues.get(message.guild.id);
  if (!queue) {
    // Verifica se há músicas sendo tocas na fila
    return message.reply(
      "Não tem música sendo reproduzida pra pausa maluco..."
    );
  }
  queue.dispatcher.pause(); // Responsável por pausa a música atual da fila
};

module.exports = {
  name: "pause",
  help: "Pausa a música atual da fila",
  execute,
};
