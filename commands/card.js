const profileModel = require('../models/profileSchema')
module.exports = {
	name: 'work',
	description: 'testing',
	async execute(message, args, client, Discord, profileData) {
        if(!message.member.hasPermission('ADMINISTRATOR')) return message.reply('관리자가 아닙니다!')

        const channel = client.channels.cache.get('836466785959673866')
        const op = await profileModel.findOne({
            userID: message.author.id,
            serverID: message.guild.id
        })

        if (op.work === 'false') {
            const working = await profileModel.findOneAndUpdate({
                userID: message.author.id,
                serverID: message.guild.id
            },
            {
                $set: {
                    work: 'true'
                }
            })
            channel.send(`${message.author.username}님이 출근하셨습니다.`)
        }

        if (op.work === 'true') {
            const working = await profileModel.findOneAndUpdate({
                userID: message.author.id,
                serverID: message.guild.id
            },
            {
                $set: {
                    work: 'false'
                }
            })
            channel.send(`${message.author.username}님이 퇴근하셨습니다.`)
        }
	}
}