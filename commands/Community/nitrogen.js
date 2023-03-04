const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const rollSchema = require('../../Schemas.js/roll');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('nitro-gen')
    .setDescription('It will generate a nitro for you!'),
    async execute(interaction) {
        const { user, guild } = interaction;
        const Data = await rollSchema.findOne({ Guild: guild.id, User: user.id });
        if(!Data){
            rollSchema.create({
                Guild: guild.id,
                User: user.id
            })
        }
        user.send('https://media.tenor.com/x8v1oNUOmg4AAAAC/rickroll-roll.gif');
        user.send('Got rick rolled hahaha')

        const embed = new EmbedBuilder()
        .setColor("Blue")
        .setDescription('I sent you the gift link please check your dms')
        await interaction.reply({ embeds: [embed] });
    }
}