const Discord = require("discord.js");
const dotenv = require("dotenv");
const fs = require("fs"); // biblioteca para leitura de arquivos
const path = require("path");

dotenv.config();

const bot = new Discord.Client(); // Adicionando bot ao client do discord
bot.commands = new Discord.Collection(); // Adicionando comandos a serem permitidos pelo bot/user

// Pegando arquivos que da pasta /commands, que terminam com .js
const commandFiles = fs
    .readdirSync(path.join(__dirname, "/commands"))
    .filter(filename => filename.endsWith(".js"))

console.log(commandFiles);

// Adiciona na variável filename, a coleção de commands dos arquivos listado na pasta commands
for (var filename of commandFiles) {
    const command = require(`./commands/${filename}`);
    bot.commands.set(command.name, command);
}

console.log(bot.commands);

bot.on("ready", () => {
    console.log(`Pai ta on caralho, vem de quatro! ${bot.user.username}`);
});

// Processar comandos enviados no chat do servidor
// .replay => Responde a mensagem de quem enviou o comando
// .channel.send => Envia uma mensagem ao canal
bot.on("message", (message) => {
    if (!message.content.startsWith(process.env.PREFIX) || message.author.bot)
        return;
    // Pega os argumentos, no caso os comandos
    const args = message.content.slice(process.env.PREFIX.length).split(" ");
    const command = args.shift();
    // verificar se existe esse comando na lista de comandos!
    try {
        bot.commands.get(command).execute(bot, message, args);
    } catch (err) {
        return message.reply("Que poha de comando é esse maluco?");
    }  
});

bot.login(process.env.TOKEN);