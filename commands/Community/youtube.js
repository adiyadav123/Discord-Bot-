const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')
const { request } = require('undici');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('youtube')
    .setDescription("Searchs on youtube!")
    .addStringOption(option => option.setName('query').setDescription("Type here the name of the video!").setRequired(true)),
    async execute (interaction){
         let ques = interaction.options.getString('query')
         const query = new URLSearchParams({ ques });

         let re = await request(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&q=${query}&key=AIzaSyAUR9aaYXzcSLc7EnoetFomkSxNmhPsyFg`)

         let data = await re.body.json();
         let obj = {
            list: [data]
         }
         let { list } = obj;
         let result = list[0].items[0].snippet
         let videoId = list[0].items[0].id.videoId;
         let title = result.title;
         let ur = `https://youtu.be/${videoId}`;
         let image = list[0].items[0].snippet.thumbnails.high.url;

         const embed = new EmbedBuilder()
         .setColor("DarkPurple")
         .setTitle(title)
         .setImage(image)
         .setTimestamp()
         .setFooter({text: "Created by Isey#4762"})

        await interaction.reply({embeds: [embed], content: `${ur}`})
    }
}