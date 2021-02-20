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
        let repositories = await fetch(`https://api.github.com/users/${args[0]}/repos`, {
            method: 'GET'
        }).then( (res) => res.json());

        if (profile.message) return message.channel.send(await client.modules.errorEmbed(client, 'GitHub user not found.'));

        repositories =  repositories.slice(0, 10);
        for ( let i = 0; i < repositories.length; i++) repositories[i] = repositories[i].name;

        embed.setTitle(`GitHub user ${profile.login} info`)
            .setURL(`https://github.com/${profile.login}`)
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
        if (repositories[0]) embed.addField('Repositories', ` • ${repositories.join('\n • ')}`)


        return message.channel.send(embed);
    }
}