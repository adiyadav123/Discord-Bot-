const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { request } = require('undici');

module.exports = {
  data: new SlashCommandBuilder()
    .setName("dictionary")
    .setDescription("no description, run the command")
    .addStringOption(option => option.setName("question").setDescription("What you want to search on urban dict?").setRequired(true)),

    async execute(interaction){
      const term = interaction.options.getString("question")
      const query = new URLSearchParams({ term });

      const dictResult = await request(`https://api.urbandictionary.com/v0/define?${query}`);
		  const { list } = await dictResult.body.json();
      const trim = (str, max) => (str.length > max ? `${str.slice(0, max - 3)}...` : str);
      const [answer] = list;


      const er = new EmbedBuilder()
      .setColor("Red")
      .setAuthor({ name: 'Isey', iconURL: 'https://cdn.discordapp.com/avatars/1039904038231224371/bcf49b70fe17cdbd5c276331eceef269.webp', })
      .setTitle("**Error!**")
      .setDescription(`No results found for **${term}**.` )

      if (!list.length) {
        return await interaction.reply({embeds: [er]});
      }

const embed = new EmbedBuilder()
	.setColor("Green")
	.setTitle(answer.word)
  .setAuthor({ name: 'Isey', iconURL: 'https://cdn.discordapp.com/avatars/1039904038231224371/bcf49b70fe17cdbd5c276331eceef269.webp', })
	.setURL(answer.permalink)
  .setTimestamp()
	.addFields({ name: 'Definition', value: trim(answer.definition, 1024) }, { name: 'Example', value: trim(answer.example, 1024) }, { name: 'Rating', value: `${answer.thumbs_up} thumbs up. ${answer.thumbs_down} thumbs down.` })
  .setFooter({ text: 'Created by - Isey#4762'});
  
  await interaction.reply({embeds: [embed]})
    }
}