const { SlashCommandBuilder, EmbedBuilder, AttachmentBuilder } = require('discord.js')
const levelSchema = require('../../Schemas.js/level');
const Canvacord = require('canvacord');

//  background image link -  https://i.ibb.co/q5rqfSW/canvacord.jpg

module.exports = {
    data: new SlashCommandBuilder()
    .setName('leaderboard')
    .setDescription("Leaderboard of server"),
    async execute(interaction){
          const { guild, client } = interaction;
          const embed1 = new EmbedBuilder()
          .setColor("Blue")
          .setDescription(":white_check_mark: No one is on leaderboard yet!")

          const Data = await levelSchema.find({ Guild: guild.id })
          .sort({
            XP: -1,
            Level: -1
          })
          .limit(10)

          if(!Data) return await interaction.reply({ embeds: [embed1] });

          await interaction.deferReply();

          for(let counter = 0; counter < Data.length; ++counter){
            let { User, XP, Level } = Data[counter]

            const value = await client.users.fetch(User) || "Hidden User";
            const member = value.tag;
            let text =`${counter + 1}. ${member} | XP: ${XP} | Level: ${Level}\n`;
            console.log(text)

            const embed = new EmbedBuilder()
            .setColor("Blue")
            .setTitle(`${interaction.guild.name}'s XP Leaderboard`)
            .setDescription(`\`\`\`${text}\n\`\`\``)
            .setTimestamp()
            .setFooter({ text: "XP Leaderboard" })

            interaction.editReply({ embeds: [embed] })
          }
     }
}