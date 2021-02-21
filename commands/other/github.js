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

        if (profile.public_repos !== 0) embed.setFooter('Press reaction below to see repositories');

        if (profile.bio) embed.setDescription(profile.bio);
        if (profile.name) embed.addField('Name', profile.name);
        if (profile.company) embed.addField('Company', profile.company);
        if (profile.location) embed.addField('Location', profile.location);
        if (profile.email) embed.addField('Email', profile.email);

        const botMessage = await message.channel.send(embed);
        if (profile.public_repos !== 0) {
            await botMessage.react('📁');

            const filter = (reaction, user) => {
                return reaction.emoji.name === '📁' && user.id === message.author.id;
            };

            botMessage.awaitReactions(filter, {max: 1, time: 60000, errors: ['time']}).then(async () => {
                let repositories = await fetch(`https://api.github.com/users/${args[0]}/repos`, {
                    method: 'GET'
                }).then( (res) => res.json());
                repositories =  repositories.slice(0, 5);

                await botMessage.reactions.removeAll();

                embed = new Discord.MessageEmbed()
                    .setTitle(`GitHub ${profile.login} repositories`)
                    .setURL(`https://github.com/${profile.login}?tab=repositories`)
                    .setColor(client.config.embedColor)
                    .setTimestamp();

                for (const repository of repositories) {
                    if (repository.description) embed.addField(repository.name, `${repository.description}\n⭐${repository.stargazers_count}`);
                    if (!repository.description) embed.addField(repository.name, `⭐${repository.stargazers_count}`);
                }
                await botMessage.edit(embed);
            }).catch(async () => {
                botMessage.reactions.removeAll();
            });
        }
    }
}