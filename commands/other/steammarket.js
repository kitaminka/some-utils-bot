const Discord = require('discord.js');
const fetch = require('node-fetch');
const QuickChart = require('quickchart-js');

module.exports = {
    name: 'steammarket',
    description: 'Display information about item from Steam Community Market',
    permission: 'ADMINISTRATOR',
    async execute(client, message, args) {
        // TODO Add catch for requests
        if (!args[0]) return message.channel.send(await client.modules.errorEmbed(client, 'No Steam Community Market item name specified.'));
        const itemInfo = await fetch(`https://steamcommunity.com/market/search/render/?search_descriptions=0&sort_column=default&sort_dir=desc&norender=1&count=1&query=${args.join(' ')}`, {
            method: 'GET'
        }).then(res => res.json());
        if (!itemInfo.success) return message.channel.send(await client.modules.errorEmbed(client, 'Failed to get Community Market item information.'));
        if (itemInfo.results === []) return message.channel.send(await client.modules.errorEmbed(client, 'Failed to find Community Market item.'));
        const priceInfo = await fetch(`https://steamcommunity.com/market/pricehistory/?currency=1&appid=730&market_hash_name=${itemInfo.results[0].hash_name}`, {
            method: 'GET',
            headers: {
                cookie: process.env.STEAM_LOGIN
            }
        }).then(res => res.json());
        if (!priceInfo.success) return message.channel.send(await client.modules.errorEmbed(client, 'Failed to get Community Market item information.'));
        const dates = [],
            price = [];
        for (const info of priceInfo.prices) {
            if (dates.length === 0 || new Date(info[0]).getUTCDate() !== dates[dates.length - 1].getUTCDate()) {
                dates.push(new Date(info[0]));
                price.push(info[1]);
            }
        }
        const chart = new QuickChart().setConfig({
                type: 'line',
                data: {
                    labels: dates,
                    datasets: [{
                        label: 'Price',
                        data: price,
                        fill: false,
                        borderColor: client.config.embedColor,
                        pointRadius: 0
                    }]
                },
                options: {
                    scales: {
                        xAxes: [{
                            type: 'time',
                            time: {
                                parser: 'MM/DD/YYYY HH:mm',
                                displayFormats: {
                                    day: 'MMM DD YYYY'
                                }
                            },
                            ticks: {
                                fontColor: '#FFFFFF'
                            },
                            gridLines: {
                                display: false
                            }
                        }],
                        yAxes: [{
                            ticks: {
                                fontColor: '#FFFFFF'
                            },
                            gridLines: {
                                color: '#FFFFFF'
                            }
                        }]
                    }
                }
            }).setBackgroundColor('#2C2F33');
        const embed = new Discord.MessageEmbed()
            .setTitle(args.join(' '))
            .setColor(client.config.embedColor)
            .setImage(await chart.getShortUrl());
        if (message.deletable) await message.delete();
        return message.channel.send(embed);
    }
}