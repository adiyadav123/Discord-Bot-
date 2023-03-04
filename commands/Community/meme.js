const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')
const { request } = require('undici')

module.exports = {
    data: new SlashCommandBuilder()
    .setName("meme")
    .setDescription("meme-generator"),
    async execute(interaction){
           const re = await request(`https://meme-api.com/gimme/funny`)
           let data = await re.body.json();
        //    console.log(data)
           let obj = {
            list: [data]
          }
          const { list } = obj;

          let image = list[0].url;
          let title = list[0].title;
          
          const embed  = new EmbedBuilder()
          .setColor("Blue")
          .setTitle(`${title}`)
          .setImage(`${image}`)
          .setTimestamp()
          .setFooter({ text: 'Created by - Isey#4762'});

          await interaction.reply({embeds: [embed]})

    }
}