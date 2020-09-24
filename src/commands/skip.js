const playSong = require("./play").playSong;

const execute = (bot, message, args) => {
  const queue = bot.queues.get(message.guild.id);
  if (!queue) {
    return message.reply("Não tem outra música na fila maluco!, fé com fé");
  }
  queue.songs.shift(); // Retira a primeira música da fila.
  bot.queues.set(message.guild.id, queue); // Atualizaa fila de música
  playSong(bot, message, queue.songs[0]); // Reproduz novamente, mas ja com a próxima música da fila.
};

module.exports = {
  name: "skip",
  help: "Passa para a próxima música da fila",
  execute,
};
