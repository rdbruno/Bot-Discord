const execute = (bot, msg, args) => {
    const queue = bot.queues.get(msg.guild.id);
    if (!queue) {
        return msg.reply("Não há música em reprodução no momento.");
    }

    queue.dispatcher.resume();
};

module.exports = {
    name: "resume",
    help: "Continua a reprodução da música atual",
    execute
};