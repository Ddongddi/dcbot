const Discord = require('discord.js')
const client = new Discord.Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION'] })
const { prefix, mongodb } = require('./config.json')
const fs = require('fs')
const mongoose = require('mongoose')
const profileModel = require('./models/profileSchema')
const memberCounter = require('./counters/membercounter')
const usercounter = require('./counters/usercounter')
const botcounter = require('./counters/botcounter')
const ticket = require('./ticket-system')

client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('js'));
for(const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name,command);
}


client.once('ready', () => {
    console.log('I am ready to go!')
    memberCounter(client)
    usercounter(client)
    botcounter(client)
    ticket(client)


})

client.on('guildMemberAdd', async guildMember =>{
    let profile = await profileModel.create({
        userID: guildMember.id,
        serverID: guildMember.guild.id,
        warning: 0,
        work: false
    });
    profile.save();

    let welcomerole = guildMember.guild.roles.cache.find(role => role.name === '유저')
    guildMember.roles.add(welcomerole)
    guildMember.guild.channels.cache.get('835511897301188630').send(`<@${guildMember.user.id}> 님, 서버에 입장하신 것을 환영합니다!`)
})

client.on('guildMemberAdd', async guildMember =>{
    guildMember.guild.channels.cache.get('835511926041083914').send(`${guildMember.user.username}님이 서버에서 퇴장하셨습니다`)
})

client.on('message', async msg => {
    if (msg.author.bot) return

    let profileData;
    try {
        profileData = await profileModel.findOne({ userID: msg.author.id})
        if(!profileData) {
            let profile = await profileModel.create({
                userID: msg.author.id,
                serverID: msg.guild.id,
                warning: 0,
                work: false
            });
            profile.save();
        }

    

    } catch(error) {
        console.log(error)
    }

        var array = ['간나새끼', '갈보는', '개새', '개새끼', '닥쳐', '등신', '또라이', '똘아이', '똥개', '미친놈', '뻐큐', '염병', '좆', '섹스']

        if (array.some(w => ` ${msg.content.toLowerCase()} `.includes(` ${w} `))) {
            if(msg.deletable) {
            msg.delete();
            const embed = new Discord.MessageEmbed()
                .setColor('#662500')
                .setTitle('* 알림 *')
                .addFields(
                    { name: '욕 감지!', value: `${msg.author.username}님이 욕을 쓰셨습니다.` },
                    { name: '보내신 메시지', value: `||${msg.content}||` },
                );
            msg.channel.send(embed);
            } else return msg.reply('비속어를 사용하지 말아주세요!')
        }

        if (!msg.content.startsWith(prefix) || msg.author.bot) return
        const args = msg.content.slice(prefix.length).trim().split(/ +/);
        const commandName = args.shift();
        const command = client.commands.get(commandName);
        try {
            command.execute(msg, args, client, Discord, profileData);
        } catch (error) {
            console.log(error);
        }
})

mongoose.connect(mongodb, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}).then(() => {
    console.log('database connected!')
}).catch((err) => {
    console.log(err)
})


client.on('guildMember', async guildMember =>{
    let profile = await profileModel.findOne({userID: guildMember.id })
    try{
        if (profile.warning == 5) {
            guildMember.kick()
        }
    } catch(rror) {
        console.log(error)
    }
})


client.login('봇 토큰 입력')