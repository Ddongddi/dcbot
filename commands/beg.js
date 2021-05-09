const profileModel = require('../models/profileSchema')
module.exports = {
	name: 'beg',
	description: 'testing',
	async execute(message, args, client, Discord, profileData) {

        const member = message.mentions.members.first()
        const check = await profileModel.findOne({
            userID: member.id,
            serverID: message.guild.id
        })

        if (check.warning == 4) {
            const channel = client.channels.cache.get('822282714559938564')
            channel.send(`${member.user.username}님이 너무 많은 경고로 퇴장되었습니다.`)
            member.kick()
        }

        if (check.warning == 9) {
            const channel = client.channels.cache.get('822282714559938564')
            channel.send(`${member.user.username}님이 너무 많은 경고로 차단되었습니다.`)
            member.ban()
        }
        
        const response = await profileModel.findOneAndUpdate({
            userID: member.id,
            serverID: message.guild.id
        },
        {
            $inc: {
                warning: +1
            },
        })

        const warn = response.warning + 1
        return message.reply(`${warn}`)
	}
}