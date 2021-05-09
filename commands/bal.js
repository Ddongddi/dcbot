module.exports = {
	name: 'bal',
	description: 'testing',
	async execute(message, args, client, Discord, profileData) {
	  message.reply(`경고 수 : ${profileData.warning}번`)
	}
}