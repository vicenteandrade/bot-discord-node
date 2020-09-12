const execute = (bot, message, args) => {
    let string = "======== AJUDA ========\n\n";
    bot.commands.forEach(command => {
        if (command.help) {
            string += `**${process.env.PREFIX}${command.name}**: ${command.help}\n`;
        }
    });
    return message.channel.send(string);
};

module.exports = {
    name: "help",
    help: "Exibe todos os comandos!",
    execute,
}