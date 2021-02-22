const Discord = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
    name: 'github',
    description: 'Display information about GitHub user.',
    async execute(client, message, args) {
        if (!args[0]) return message.channel.send(await client.modules.errorEmbed(client, 'No GitHub username specified.'));
        let embed = new Discord.MessageEmbed();

        const profile = await fetch(`https://api.github.com/users/${args[0]}`, {
            method: 'GET'
        }).then( (res) => res.json());

        if (profile.message) return message.channel.send(await client.modules.errorEmbed(client, 'GitHub user not found.'));

        embed.setTitle(`GitHub ${profile.login}`)
            .setURL(profile.html_url)
            .setColor(client.config.embedColor)
            .setThumbnail(profile.avatar_url)
            .addField('Public repositories', profile.public_repos)
            .addField('Followers', profile.followers)
            .addField('Following', profile.following)
            .setTimestamp();

        if (profile.bio) embed.setDescription(profile.bio);
        if (profile.name) embed.addField('Name', profile.name);
        if (profile.company) embed.addField('Company', profile.company);
        if (profile.location) embed.addField('Location', profile.location);
        if (profile.email) embed.addField('Email', profile.email);

        return message.channel.send(embed);
    }
}