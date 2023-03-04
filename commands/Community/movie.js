const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')
const { request } = require('undici');

module.exports = {
    data: new SlashCommandBuilder()
    .setName("movie")
    .setDescription("shows about the movie that you have searched!")
    .addStringOption(options => options.setName("name").setDescription("Name of the movie!").setRequired(true)),

    async execute(interaction){

        let name = interaction.options.getString("name")

        const re = await request(`https://itunes.apple.com/search?term=${name}&entity=movie`)
        let data = await re.body.json();
        let obj = {
            list: [data]
          }
        const { list } = obj
        let result = list[0].results[0]
        let artist = result.artistName;
        let image = result.artworkUrl100;
        let trailer = result.previewUrl;
        let desc = result.shortDescription;
        let track = result.trackName;
        
        const embed = new EmbedBuilder()
        .setColor("Green")
        .setTitle(track)
        .setAuthor({ name: 'Isey', iconURL: 'https://cdn.discordapp.com/avatars/1039904038231224371/bcf49b70fe17cdbd5c276331eceef269.webp', })
        .setThumbnail(image)
        .setTimestamp()
        .addFields({name: "Artists", value: `${artist}`}, {name: "Description", value: `${desc}`}, {name: "Trailer", value: `${trailer}`})
        .setFooter({ text: 'Created by - Isey#4762'});
        await interaction.reply({embeds: [embed]})
    }
}