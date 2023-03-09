const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const ecoSchema = require('../../Schemas.js/eco');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('balance')
    .setDescription('Bank balance!')
    .addUserOption(option => option.setName('user').setDescription('the user you want to check balance').setRequired(true)),
    async execute(interaction){
        try{
            const { guild, user, options } = interaction;
        const us = options.getUser('user');
        const Data = await ecoSchema.findOne({ Guild: guild.id, User: us.id });

        if(!Data) return interaction.reply(`You haven't created you account\nTo create your account type - \`/setaccount\``);
        // console.log(Data);
        const wallet = await Data.Wallet;
        const Bank = await Data.Bank;
        // console.log(us.id)
        // console.log(us)
        const embed = new EmbedBuilder()
        .setColor("Blue")
        .setTitle(`${us.username}'s Balance`)
        .setThumbnail(`${us.displayAvatarURL()}`)
        .setTimestamp()
        .addFields(
            { name: 'Wallet', value: `${wallet}`, inline: true },
            { name: 'Bank', value: `${Bank}`, inline: true }
        )
        await interaction.reply({ embeds: [embed] })
        }catch(e){
            return await interaction.reply(`Test failed with response code ${e.response.status}`)
        }
    }

}