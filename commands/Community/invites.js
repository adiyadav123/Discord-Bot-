const { SlashCommandBuilder } = require('discord.js');
const { EmbedBuilder } = require('discord.js');
const { execute } = require('./spoiler');

module.exports = {
    data: new SlashCommandBuilder()
         .setName("invites")
         .setDescription("Tracks invites!")
         .addUserOption(option => option.setName("user").setDescription("Targets a user").setRequired(true)),
    async execute(interaction, message) {
          const user = interaction.options.getUser("user");
          let invites = await interaction.guild.invites.fetch();
          let userInv = invites.filter(u => u.inviter && u.inviter.id === user.id);

          let i = 0;
          userInv.forEach(inv =>  i+=inv.uses);

          const embed = new EmbedBuilder()
          .setColor("Blue")
          .setAuthor({ name: 'Isey', iconURL: 'https://cdn.discordapp.com/avatars/1039904038231224371/bcf49b70fe17cdbd5c276331eceef269.webp', })
          .setDescription(`:tada: ${user.tag} has **${i}** invites`)
          .setThumbnail(`${user.displayAvatarURL()}`)
          .setTimestamp()
          .setFooter({ text: 'Created by - Isey#4762'});
         await interaction.reply({embeds: [embed]});
                
    }
}
