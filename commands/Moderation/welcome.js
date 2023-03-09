const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js')
 
module.exports = {
    data: new SlashCommandBuilder()
    .setName("welcome")
    .setDescription("Welcome to nevermore, run the command fast!")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

    async execute(interaction){
        try{
                const embed = new EmbedBuilder()
            .setColor("DarkBlue")
            .setAuthor({name: "Principal Weems", iconURL: "https://i.ibb.co/QCMLsS6/download.jpg"})
            .setDescription("Welcome to my server, this is a bot-testing server. You can talk to my bot for fun because she is not funny Lol. Thank for running this command!👍")
            .setImage("https://i.ibb.co/HqX60bV/Episode-101-of-Wednesday-Cr-Courtesy-of-Netflix-2022jpg.jpg")
            .setTimestamp()
            .setFooter({ text: 'Nevermore Authority'});
   
            const ms  = await interaction.reply({embeds: [embed], fetchReply: true});
            ms.react("💖");
        }catch(error){
            const err = new EmbedBuilder()
            .setColor("Red")
            .setTitle("An error occurred")
            .setDescription("You do not have permissions to run this command!")
            .setTimestamp()
            return interaction.reply({embeds: [err]})
        }
    }
}