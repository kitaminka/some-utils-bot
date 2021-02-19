const Discord = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
    name: 'person',
    description: 'Display random person data.',
    async execute(client, message, args) {
        let data;

        try {
            data = await fetch(`https://randomuser.me/api/`, {
                method: 'GET',
            }).then((res) => res.json()).then((body) => {
                return body.results[0];
            });
        } catch (err) {
            message.channel.send(await client.modules.errorEmbed(client, 'An error has occurred.'));
            return console.error(err);
        }

        const embed = new Discord.MessageEmbed()
            .setTitle('Random person data')
            .setThumbnail(data.picture.large)
            .setColor(client.config.embedColor)
            .addField('Gender', data.gender, true)
            .addField('Full name', `${data.name.title} ${data.name.first} ${data.name.last}`)
            .addField('Phone number', data.phone)
            .addField('Username', data.login.username)
            .addField('Password', data.login.password)
            .addField('Country',data.location.country)
            .addField('State', data.location.state)
            .addField('City', data.location.city)
            .setTimestamp();

        return message.channel.send(embed);
    }
}