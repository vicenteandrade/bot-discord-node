const execute = (bot, message, args) => {
    return message.replay("Bom dia ai meu parcero!");
}

module.exports = {
    name: "hello",
    help: "Te dar um oi bem carinhoso...",
    execute,
};