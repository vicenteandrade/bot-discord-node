const execute = (bot, message, args) => {
    const queue = bot.queues.get(message.guild.id);
    if (!queue) {
        return message.reply("Não tem música pra continuar a reprodução meu irmão!");
    }
    queue.dispatcher.resume();
};

module.exports = {
    name: "resume",
    help: "Continua a reprodução das músicas.",
    execute,
}