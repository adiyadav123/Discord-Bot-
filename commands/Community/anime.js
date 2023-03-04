const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')
const { request } = require('undici');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('anime')
    .setDescription('wanted to know about anime? Search here!')
	.addStringOption(option => option.setName('name').setDescription('name of the anime').setRequired(true)),
    async execute(interaction){
        let name = interaction.options.getString('name')

		const re = await request(`https://gogoanime.consumet.stream/anime-details/${name}`);
		let data = await re.body.json();
        let obj = {
        list: [data] 
	}
	let { list } = obj;
	// console.log(list)
	let title = list[0].animeTitle;
	// console.log(title)
	let img = list[0].animeImg;
	// console.log(img)
	let genre = list[0].genres;
	let status = list[0].status;
	let releasedDate = list[0].releasedDate;
	let synopsis = list[0].synopsis;
	let totalEpisodes = list[0].totalEpisodes;
	let type = list[0].type;

	const embed = new EmbedBuilder()
	.setColor("Green")
	.setTitle(`${title}`)
	.setThumbnail(`${img}`)
	.addFields(
		{ name: "Status", value: `${status}`, inline: true},
		{ name: "Realease Date", value:`${releasedDate}`, inline: true },
		{ name: "Total Episodes", value: `${totalEpisodes}`, inline: true }
	)
	// .addFields(
	// 	{ name: "Genres", value: genre_1, genre_2, genre_3, genre_4 }
	// )
	.setDescription(`${synopsis}`)
	.setTimestamp()

	await interaction.reply({embeds: [embed]})
    }
}