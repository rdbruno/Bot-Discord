const search = require("yt-search");
const ytdl = require("ytdl-core-discord");

const execute = (bot, msg, args) => {
  const s = args.join(" ");
  try {
    search(s, (err, result) => {
      if (err) {
        throw err;
      } else if (result && result.videos.length > 0) {
        const song = result.videos[0];
        const queue = bot.queues.get(msg.guild.id);
        if (queue) {
          queue.songs.push(song);
          bot.queues.set(msg.guild.id, queue);
          msg.channel.send(`**${song.title}** foi adicionado a fila!`);
        } else playSong(bot, msg, song);
      } else {
        return msg.reply("Desculpe, mas não encontrei a música que você desejava!");
      }
    });
  } catch (e) {
    console.error(e);
  }
};

const playSong = async (bot, msg, song) => {
  let queue = bot.queues.get(msg.member.guild.id);

  if (!song) {
    if (queue) {
      queue.connection.disconnect();
      bot.queues.delete(msg.member.guild.id);
      return msg.channel.send("Não há mais músicas na fila para reproduzir!");
    }
  }

  if (!msg.member.voice.channel) {
    return msg.reply("Você precisa estar em um canal de voz para reproduzir uma música!");
  }

  if (!queue) {
    const conn = await msg.member.voice.channel.join();
    queue = {
      volume: 10,
      connection: conn,
      dispatcher: null,
      songs: [song],
    };
  }

  queue.dispatcher = await queue.connection.play(await ytdl(song.url, { highWaterMark: 1 << 25, filter: "audioonly", quality: "highestaudio" }),{ type: "opus", highWaterMark: 1 });
  queue.dispatcher.on("finish", () => {
    queue.songs.shift();
    playSong(bot, msg, queue.songs[0]);
  });
  bot.queues.set(msg.member.guild.id, queue);
  msg.channel.send(`🎵 **${song.title}** sendo reproduzida!`);
};

module.exports = {
  name: "play",
  help: "Reproduz a música escolhida no canal de voz",
  execute,
  playSong
};