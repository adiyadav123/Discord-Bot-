const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const {request} = require('undici');
const { weather_key } = require('../../config.json');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('weather')
    .setDescription('send you the weather of your desired city or country')
    .addStringOption(
        option => 
        option.setName('city')
        .setDescription('You can enter both country or city name')
        .setRequired(true)
    ),
    async execute(interaction){
        const city = interaction.options.getString('city');
        const response = await request(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${weather_key}`);
        const data = await response.body.json();
        // console.log(data);
        const image = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
        const city_name = data.name;
        const country = data.sys.country;
        const temper = data.main.temp - 273.15;
        const feels = data.main.feels_like - 273.15;
        const spee = data.wind.speed;
        const pressur = data.main.pressure;
        const embed = new EmbedBuilder()
        .setColor("Blue")
        .setTitle('Weather Forecast')
        .addFields(
            { name: 'City', value: `${city_name}`, inline: true },
            { name: 'Country', value: `${country}`, inline: true },
            { name: 'Temperature', value: `${temper}°C` , inline: true},
            { name: 'Feels Like', value: `${feels}°C` , inline: true},
            { name: 'Wind', value: `Speed ${spee} Km/h`, inline: true },
            { name: 'Pressure', value: `Speed ${pressur} Pa`, inline: true },
        )
        .setThumbnail(`${image}`)
        .setTimestamp()
        .setAuthor({ name: `${interaction.user.username}`, iconURL: `${interaction.user.displayAvatarURL()}` })
        .setFooter({ text: `Weather Forecast` })

        await interaction.reply({ embeds: [embed] })
    }
}