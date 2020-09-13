const execute = (bot, message, args) => {
    const queue = bot.queues.get(message.guild.id);
    if (!queue) {
        return message.reply("Não tem como parar as músicas, se não tem música meu irmão!");
    }
    queue.songs = []; // gera um lista vazia para um nova sessão de músicas
    bot.queues.set(message.guild.id, queue);
    queue.dispatcher.end(); // Finaliza a sessão de músicas.
};

module.exports = {
    name: "stop",
    help: "Para toda queue de músicas",
    execute,
}