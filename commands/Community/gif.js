const { SlashCommandBuilder } = require('discord.js')
const { request } = require('undici')
const { google_api } = require('../../config.json')

module.exports = {
    data: new SlashCommandBuilder()
    .setName('tenor')
    .setDescription('Searchs animated GIFs')
    .addStringOption(option => option.setName('query').setDescription('What you want to search?').setRequired(true))
    .addStringOption(option => option.setName('formats').addChoices(
        { name: "gif", value: "gif" },
        { name: "mp4", value: 'mp4'}
    ).setRequired(true).setDescription('file formats')),
    async execute(interaction){
        let q = interaction.options.getString('query')
        let option = interaction.options.getString('formats')
        console.log(option)
        let api_key = google_api;
        let limit = 8;
        let re = await request(`https://tenor.googleapis.com/v2/search?q=${q}&key=${api_key}&client_key=youtubeapi&limit=${limit}`)
        let data = await re.body.json();
        let obj = {
          list: [data]
        }

        let { list } = obj;
        
        let title = list[0].results[0].content_description;
        // let mp4 = list[0].results[0].media_formats.mp4.url;
        // let gif = list[0].results[0].media_formats.gif.url;

        if(option === "mp4"){
        let video = list[0].results[0].media_formats.mp4.url;
        await interaction.reply(`${title}\n${video}`)
        }

        if(option === "gif"){
            let video = list[0].results[0].media_formats.gif.url;
            await interaction.reply(`${title}\n${video}`)
        }

    }
}