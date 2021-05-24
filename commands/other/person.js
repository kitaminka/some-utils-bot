const Discord = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
    description: 'Display random person data.',
    async execute(client, message) {
        let data;

        data = await fetch(`https://randomuser.me/api/`, {
            method: 'GET',
        }).then((res) => res.json()).then((body) => {
            return body.results[0];
        });

        const embed = new Discord.MessageEmbed()
            .setTitle(':bust_in_silhouette: Random person data')
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