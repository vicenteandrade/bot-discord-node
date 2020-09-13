const execute = (bot, message, args) => {
    const queue = bot.queues.get(message.guild.id);
    if (!queue) {
        return message.reply("Não tem música tocando meu irmão.");
    }
    queue.dispatcher.pause();
};

module.exports = {
    name: "pause",
    help: "Pausa a reprodução atual",
    execute,
}