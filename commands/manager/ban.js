// This command is not yet available. //

module.exports.run = async function (client, message, args) {
	if (message.member.hasPermission(["ADMINISTRATOR", "BAN_MEMBERS"])) {
		let arg = args[0];
		if (arg === undefined) {
			message.reply("❓ จะให้ฉันจัดการกับสมาชิกคนไหนเหรอคะ")
				.then(function (msg) {
					msg.delete({
						timeout: 10000
					});
				});
		} else {
			let member = client.users.cache.find(user => (user.username === arg) || (user.id === arg));
			if (member === undefined) {
				message.reply("❎ ฉันหาสมาชิกนี้ไม่เจอคะ ลองตรวจสอบใหม่อีกรอบคะ")
					.then(function (msg) {
						msg.delete({
							timeout: 10000
						});
					});
			} else {
				let memberBan = message.guild.members.cache.get(member.id);
				if (memberBan === undefined) {
					message.reply("❎ เอ๋...สมาชิกนี้หายไปไหนแล้วอ่ะ เอ๋...หรือไม่ได้อยู่ที่นี่หรือเปล่า")
						.then(function (msg) {
							msg.delete({
								timeout: 10000
							});
						});
				} else {
					if (memberBan.banable === false) {
						message.reply("❌ ฉันไม่มีสิทธิ์ที่จะแบนเขานะคะ ถ้าหากมีเหตุผลใดๆ ที่เขาทำอะไรไม่ดีให้แจ้งเจ้าของที่นี่นะคะ ตอนนี้ฉันทำอะไรเขาไม่ด้ายยย...");
					} else {
						let reason = args.slice(1).join(" ");
						if (reason === "") {
							reason = "**สมาชิกที่แบนไม่ได้ให้เหตุผลไว้คะ**";
							ban(member, memberBan, reason);
						} else {
							ban(member, memberBan, reason);
						}
					}
				}
			}
		}
	} else {
		return message.reply("🛑 ขอโทษนะคะ แต่ว่าาา...คุณไม่มีสิทธิ์ในการใช้งานฟังก์ชันนี้คะ <:shioru_heavy:694159309877018685>");
	}

	function ban(member, memberBan, reason) {
		let notification = message.guild.channels.cache.find(ch => ch.name === "│การแจ้งเตือน🔔");

		let author = message.author.username;
		let authorAvatar = message.author.displayAvatarURL();
		let avatar = member.avatarURL();
		let username = member.username;
		let time = new Date();
		memberBan.ban(reason)
			.then(function () {
				let embed = {
					"title": username + " โดนแบน เนื่องจาก:",
					"description": reason,
					"color": 16098851,
					"timestamp": time,
					"footer": {
						"icon_url": authorAvatar,
						"text": "แบนโดย " + author
					},
					"thumbnail": {
						"url": avatar
					},
					"author": {
						"name": "สมาชิก",
						"icon_url": "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/microsoft/209/bust-in-silhouette_1f464.png"
					}
				};
				notification.send({
					embed
				});
			}).catch(function (error) {
				message.reply("⚠️ ฉันทำไม่ได้คะ เพราะว่า: " + error);
			});
	}
};

module.exports.help = {
	"name": "ban",
	"description": "Ban a member",
	"usage": "Yban",
	"category": "manager",
	"aliases": ["b", "แบน"]
};