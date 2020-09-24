const execute = (bot, message, args) => {
  let string = "======= Comandos Principais =======\n\n";
  bot.commands.forEach((command) => {
    if (command.help) {
      string += `**${command.name}**: ${command.help}\n`;
    }
  });
  return message.channel.send(string);
};

module.exports = {
  name: "help",
  help: "Exibe todos os comandos do bot",
  execute,
};
