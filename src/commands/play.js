const search = require("yt-search");
const ytdl = require("ytdl-core-discord");

const execute = (bot, message, args) => {
  // Function para busca de músicas
  const string = args.join(" "); // Separa o arranjos e colocar ele em um texto único
  try {
    search(string, (err, result) => {
      if (err) {
        throw err;
      } else if (result && result.videos.length > 0) {
        const song = result.videos[0];
        const queue = bot.queues.get(message.guild.id);
        if (queue) {
          // Verifica se há uma fila de música
          queue.songs.push(song); // Adiciona uma nova música na queue
          bot.queues.set(message.guild.id, queue); // Atualiza a fila de músicas
        } else playSong(bot, message, song); // Caso contrátio, inicia a reprodução normalmente
      } else {
        return message.reply("Mano não achei essa música não...");
      }
    });
  } catch (e) {
    console.log(e);
  }
};

const playSong = async (bot, message, song) => {
  // Function resposável por tocar as músicas
  let queue = bot.queues.get(message.member.guild.id);
  if (!song) {
    if (queue) {
      queue.connection.disconnect(); // Caso não haja mais músicas o bot é desconectado
      return bot.queues.delete(message.member.guild.id); // É deletado a fila de músicas atual.
    }
  }
  console.log(message.member.guild);
  if (!message.member.voice.channel) {
    return message.reply(
      "Tu precisa ta em um canal de voz pra tocar a música maluco!"
    );
  }
  if (!queue) {
    const conn = await message.member.voice.channel.join();
    queue = {
      // Caso não haja um fila criada, é criado com essas especificações
      volume: 10,
      connection: conn,
      dispatcher: null,
      songs: [song],
    };
    queue.dispatcher = await queue.connection.play(
      await ytdl(song.url, { highWaterMark: 1 << 25, filter: "audioonly" }), // Config para melhor o áudio no discord
      {
        type: "opus",
      }
    );
    queue.dispatcher.on("finish", () => {
      // Verifica se a música atual foi finalizada, para tocar a próxima
      queue.songs.shift(); // Exclui a música atual
      playSong(bot, message, queue.songs[0]); // Reiniciar o bot com a próxima música.
    });
    bot.queues.set(message.member.guild.id, queue);
  } else {
    queue.songs.push(song);
    bot.queues.set(message.member.guild.id);
  }
};

module.exports = {
  name: "play",
  help: "Toca uma música(Seguida de uma URL ou nome da música)",
  execute,
  playSong,
};
