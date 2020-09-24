const Discord = require("discord.js");
const dotenv = require("dotenv");
const fs = require("fs"); // Para leitura dos arquivos em .js
const path = require("path"); // Encontrar pastas de arquivos

const bot = new Discord.Client(); // Criando o bot do discord
dotenv.config(); // Usando as config do dotenv
bot.login(process.env.TOKEN); // Autenticando bot ao discord com o TOKEN

bot.queues = new Map(); // Criando filas para tocar as músicas

bot.commands = new Discord.Collection(); // Conjunto de comandos a serem entendidos pelo bot
const commandFiles = fs
  .readdirSync(path.join(__dirname, "commands")) // Leitura do diretório atual {commands}
  .filter((filename) => filename.endsWith(".js")); // Filtragem de arquivos com final .js

for (var filename of commandFiles) {
  const command = require(`./commands/${filename}`); // Requerimento dos arquivos na pasta {commands}
  bot.commands.set(command.name, command); // Adiciona na collection *commands* os nomes dos arquivos de comandos encontrado no diretório {commands}
}

//console.log(bot.commands); // Verificar os comandos da collection

bot.on("ready", () => {
  console.log(`${bot.user.username} ta online nessa poha maluco!`);
}); // Event para quando o bot tiver online

bot.on("message", (msg) => {
  if (!msg.content.startsWith(process.env.PREFIX) || msg.author.bot) return; // Verificar se a message não começa com o prefix ou se é um bot
  const args = msg.content.slice(process.env.PREFIX.length).split(" "); // Retira o prefix e quebra os argumentos
  const command = args.shift(); // Retirar o primeiro elemento dos args e adiciona a var[command]
  try {
    bot.commands.get(command).execute(bot, msg, args);
  } catch (e) {
    return msg.reply("Que poha de comando é esse mermão?");
  }
}); // Event para quando o bot receber uma messagem, ele efetuar alguma função
