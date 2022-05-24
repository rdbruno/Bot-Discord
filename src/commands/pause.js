const execute = (bot, msg, args) => {
    const queue = bot.queues.get(msg.guild.id);
    if (!queue) {
        return msg.reply("Não há música em reprodução no momento.");
    }

    queue.dispatcher.pause();
};

module.exports = {
    name: "pause",
    help: "Pause a reprodução da música atual",
    execute
};