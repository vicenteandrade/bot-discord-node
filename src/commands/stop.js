const execute = (bot, message, args) => {
  const queue = bot.queues.get(message.guild.id);
  if (!queue) {
    return message.reply(
      "Se não tem música como é que vou parar a reprodução maluco!!?"
    );
  }
  queue.songs = []; // Atualiza a nossa lista de música para uma lista vazia
  bot.queues.set(message.guild.id, queue); // Atualiza a fila de música do bot pela lista vaiza
  queue.dispatcher.end(); // Finaliza por completo a reprodução de músicas.
};

module.exports = {
  name: "stop",
  help: "Para a reprodução de músicas no servidor",
  execute,
};
