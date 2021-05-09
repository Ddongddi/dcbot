module.exports = {
	name: 'unban',
	description: 'testing',
	async execute(message, args, client, Discord, profileData) {
        const id = args[0];
        message.member.guild.members.unban(id);
	}
}