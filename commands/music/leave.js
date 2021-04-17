module.exports.run = async function (client, message, args) {
	let arg = args.join(" ");
	if (arg === "") {
		let voiceChannel = message.member.voice.channel;
		if (!voiceChannel) {
			message.reply(client.lang.command_music_leave_arg_empty);
		} else {
			voiceChannel.leave();
			message.channel.send(client.lang.command_music_leave_arg_empty_leave_success);
		}
	} else {
		let channel = client.channels.cache.find(channels => (channels.id === arg) || (channels.name === arg));
		if (!channel) {
			message.channel.send(client.lang.command_music_leave_with_id_not_found_channel);
		} else {
			channel.leave();
			message.channel.send(client.lang.command_music_leave_with_id_leave_success);
		}
	}
};

module.exports.help = {
	"name": "leave",
	"description": "Out of the current audio channel",
	"usage": "leave (name/id)",
	"category": "music",
	"aliases": ["l", "dis", "disconnect", "ออก", "ออกจาก"]
};