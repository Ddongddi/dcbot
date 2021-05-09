module.exports = async (client) => {
    const guild = client.guilds.cache.get('834832332787548201')
    setInterval(() => {
        var memberCount = guild.members.cache.filter(member => !member.user.bot).size;
        var memberCountChannel = client.channels.cache.get("834832332787548205");
        memberCountChannel.setName(`USER: ${memberCount}`);
    }, 5000);
}