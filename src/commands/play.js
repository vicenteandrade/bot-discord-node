const search = require("yt-search");
const ytdl = require("ytdl-core-discord");

const execute = async (bot, message, args) => {
    const strings = args.join(" "); // Adicionas os args em uma única string separada por espaços
    console.log(strings);
    try {
        search(strings, (err, result) => {
            if(err) {
                throw err;
            } else if (result && result.videos.length > 0) {
                    const song = result.videos[0];
                    playSong(bot, message, song);
                    console.log(song);
            } else {
                return message.reply("Mano não encontrei sa poha não.");
            }
        })
    } catch(e) {
        console.error(e);
    }
};

const playSong = async (bot, message, song) => {
    let queue = bot.queues.get(message.guild.id); // Verifica se ja existe uma fila
    if (!song) {
        if (queue) {
            queue.connection.disconnect();
            bot.queues.delete(message.member.guild.id);
        }
    }
    console.log(message.member.guild);
    if(!message.member.voice.channel){
        return message.reply("Entra em um canal ai meu irmão, senão não da pra tocar música maluco!")
    }
    if (!queue) {
        const conn = await message.member.voice.channel.join(); // Espera o usuário conecta no canal de voz para que o bot entre junto
        queue = { // Resources iniciais do bot
            volume: 10,
            connection: conn,
            dispatcher: null,
            songs: [song]
        }
        queue.dispatcher = await queue.connection.play(
            // Resources para melhorar conexão e aúdio dos videos.
            await ytdl(song.url, { highWaterMark: 1 << 25, filter: "audioonly", }), {
            type: "opus", 
        });
        queue.dispatcher.on("finish", () => { // Quando finalizado uma música ele inicia a próxima música da queue
            queue.songs.shift();
            playSong(bot, message, queue.songs[0]);
        }) 
        bot.queues.set(message.member.guild.id, queue);
        console.log(bot.queues);
    } else { // É adicionado novas música dentro da queue
        queue.songs.push(song); // push novas músicas para queue
        bot.queues.set(message.member.guild.id);
    }
};

module.exports = {
    name: "p",
    help: "Reproduz a música desejada pela user!",
    execute,
}
