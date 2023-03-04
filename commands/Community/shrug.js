const { SlashCommandBuilder, Guild } = require('discord.js')
const { execute } = require('./server')
const levelSchema = require('../../Schemas.js/level')

module.exports = {
    data: new SlashCommandBuilder()
    .setName("shrug")
    .setDescription("Appends shrug to your message!")
    .addStringOption(option => option.setName("message").setDescription("Add your message here!")),
async execute(interaction){
    let message = interaction.options.getString("message");
    const data = await levelSchema.findOne({ Guild: interaction.guild.id, User: interaction.user.id  })

    await interaction.reply(message + "(ツ)");
}
}