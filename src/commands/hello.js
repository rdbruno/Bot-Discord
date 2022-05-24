const execute = (bot, msg, args) => {
    return msg.reply("Hello World");
};

module.exports = {
    name: "hello",
    help: "Hello World!",
    execute
};