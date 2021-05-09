module.exports = async (client) => {
    const guild = client.guilds.cache.get('834832332787548201')
    setInterval(() => {
       const memberCount = guild.memberCount
       const channel = guild.channels.cache.get('835511847334838312')
       channel.setName(`ALL MEMBERS: ${memberCount.toLocaleString()}`)
    }, 5000);
}