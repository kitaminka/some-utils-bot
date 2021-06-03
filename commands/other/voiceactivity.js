const Discord = require('discord.js');
const activities = ['youtube', 'poker', 'chess', 'betrayal', 'fishing'];

module.exports = {
    description: 'Create invite to the voice activity.',
    async execute(client, message, args) {
        if (!args[0]) return message.channel.send(await client.modules.errorEmbed(client, `No activity type(${activities.join(', ')}) specified.`));
        const activityType = args[0];
        if (!message.member.voice.channelID) return message.channel.send(await client.modules.errorEmbed(client, 'You need to join the voice channel first.'));
        if (!activities.includes(activityType)) return message.channel.send(await client.modules.errorEmbed(client, `Entered incorrect activity type(${activities.join(', ')}).`));
        const invite = await client.discordTogether.createTogetherCode(message.member.voice.channelID, activityType);
        const embed = new Discord.MessageEmbed()
            .setTitle(':sound: Voice activity')
            .setColor(client.config.embedColor)
            .setDescription(`Voice activity invite: ${invite.code}`)
            .setTimestamp();
        return message.channel.send(embed);
    }
}