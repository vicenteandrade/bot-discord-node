const execute = (bot, message, args) => {
  const queue = bot.queues.get(message.guild.id);
  if (!queue) {
    // Verifica se há músicas sendo tocas na fila
    return message.reply(
      "Não tem música sendo reproduzida pra ajustar o volume maluco..."
    );
  }
  const volume = Number(args.join(" "));
  if (isNaN(volume) || volume < 0 || volume > 10) {
    return message.reply("O volume so pode ser de 0 a 10 maluco!");
  }
  queue.dispatcher.setVolume(volume / 10);
  queue.volume = volume;
  bot.queues.set(message.guild.id, queue);
};

module.exports = {
  name: "vol",
  help: "Ajusta o volume da música na escala de 0 a 10",
  execute,
};
