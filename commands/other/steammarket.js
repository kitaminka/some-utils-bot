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
            method: 'GET',
            headers: {
                cookie: process.env.STEAM_LOGIN
            }
        }).then(res => res.json());
        if (!itemInfo.success) return message.channel.send(await client.modules.errorEmbed(client, 'Failed to get Community Market item information.'));
        if (itemInfo.results === []) return message.channel.send(await client.modules.errorEmbed(client, 'Failed to find Community Market item.'));
        const priceInfo = await fetch(`https://steamcommunity.com/market/pricehistory/?country=GB&currency=1&appid=${itemInfo.results[0].asset_description.appid}&market_hash_name=${itemInfo.results[0].hash_name}`, {
            method: 'GET',
            headers: {
                cookie: process.env.STEAM_LOGIN
            }
        }).then(res => res.json());
        if (!priceInfo.success) return message.channel.send(await client.modules.errorEmbed(client, 'Failed to get Community Market item information.'));
        const dates = [],
            price = [];
        for (let i = priceInfo.prices.length - 1; i > 0; i--) {
            if (dates.length === 0 || (new Date(priceInfo.prices[i][0]).getUTCDate() !== dates[dates.length - 1].getUTCDate() && dates.length < 100)) {
                dates.push(new Date(priceInfo.prices[i][0]));
                price.push(priceInfo.prices[i][1]);
            }
        }
        const chart = new QuickChart().setConfig({
                type: 'line',
                data: {
                    labels: dates,
                    datasets: [{
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
                    },
                    legend: {
                        display: false
                    },
                    title: {
                        display: true,
                        text: 'Price',
                        fontSize: 20,
                        fontColor: '#FFFFFF'
                    }
                }
            }).setBackgroundColor('#2C2F33');
        const embed = new Discord.MessageEmbed()
            .setTitle(itemInfo.results[0].name)
            .setAuthor(itemInfo.results[0].app_name, itemInfo.results[0].app_icon)
            .setColor(client.config.embedColor)
            .setThumbnail(`https://community.cloudflare.steamstatic.com/economy/image/${itemInfo.results[0].asset_description.icon_url}`)
            .addField('Price', itemInfo.results[0].sell_price_text)
            .addField('Type', itemInfo.results[0].asset_description.type)
            .setImage(await chart.getShortUrl());
        return message.channel.send(embed);
    }
}