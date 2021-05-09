const Discord = require('discord.js')
module.exports = (client) => {
    const channelID = '837897205867872276'
    const guild = client.guilds.cache.get('834832332787548201')

    client.on('messageReactionAdd', async (reaction, user) => {
        if (reaction.message.channel.id === channelID) {
            var username = user.username.toLowerCase()
            var search = guild.channels.cache.find(channel => channel.name === `신청-${username}`)

            if (!search) {
                var channel = guild.channels.create(`신청-${user.username.toLowerCase()}`, {
                    type: 'text',
                    permissionOverwrites: [
                        {
                            id: guild.roles.everyone.id,
                            deny: ['VIEW_CHANNEL', 'SEND_MESSAGES']
                        },
                        {
                            id: user.id,
                            allow: ['VIEW_CHANNEL', 'SEND_MESSAGES'],
                        }
                    ]
                })

            } else {
                search.overwritePermissions([
                    {
                        id: guild.roles.everyone.id,
                        deny: ['VIEW_CHANNEL', 'SEND_MESSAGES']
                    },
                    {
                        id: user.id,
                        allow: ['VIEW_CHANNEL', 'SEND_MESSAGES'],
                    }
                ])
                const embed = await new Discord.MessageEmbed()
                    .setTitle('신청 채널 만들어짐')
                    .setColor('#FAECC5')
                    .setDescription('원하는 봇의 기능과 이름 등을 알려주세요!')
                await search.send(embed)
            }
        }
    })

    client.on('messageReactionRemove', (reaction, user) => {
        if (reaction.message.channel.id === channelID) {
            var username = user.username.toLowerCase()
            var search = guild.channels.cache.find(channel => channel.name === `신청-${username}`)
            search.overwritePermissions([
                {
                    id: guild.roles.everyone.id,
                    deny: ['VIEW_CHANNEL', 'SEND_MESSAGES']
                },
                {
                    id: user.id,
                    deny: ['VIEW_CHANNEL', 'SEND_MESSAGES']
                }
            ])
            console.log(search)
        }
    })

}