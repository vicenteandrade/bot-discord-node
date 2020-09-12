const execute = (bot, message, args) => {
    return message.reply("Ta me tirando maluco?, Bom dia!");
}

module.exports = {
    name: "hello",
    help: "Te dar um oi bem carinhoso...",
    execute,
};