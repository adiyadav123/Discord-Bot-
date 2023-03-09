const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
    .setName("embed")
    .setDescription("converts your message to an embed!")
    .addStringOption(option => option.setName('title').setDescription('Title of the embed!').setRequired(true))
    .addStringOption(option => option.setName('description').setDescription('description of the embed!')),
    async execute(interaction){
        let tit = interaction.options.getString('title')
        let dec = interaction.options.getString('description')

        const embed = new EmbedBuilder()
        .setColor("blue")
        .setTitle(tit)
        .setDescription(dec)
        .setTimestamp()
        .setFooter({text: "Created by Isey"})

        console.log(interaction.user.id)
        await interaction.reply({embeds: [embed]})

    }

}