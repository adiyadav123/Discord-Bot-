const { SlashCommandBuilder, PermissionFlagsBits, ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
    .setName('reaction-role')
    .setDescription('Assign a role to member on clicking button')
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .addRoleOption(option => option.setName('role').setDescription('the role you want to assign').setRequired(true)),
    async execute(interaction, client){
        const role = interaction.options.getRole('role');
        const button = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
            .setCustomId('button')
            .setLabel(`${role.name}`)
            .setStyle(ButtonStyle.Primary)
        )

        const embed = new EmbedBuilder()
        .setColor("Blue")
        .setDescription(`React to button to get Pinged if you want to be pinged whenever we start any giveaway! ${role}`)

        await interaction.reply({ embeds: [embed], components: [button] });

        const collector = await interaction.channel.createMessageComponentCollector();

        collector.on('collect', async(i) => {
            const member = i.member;

            // if(i.guild.members.me.role.highest.position < role.position){
            //     i.update({ content: 'My role is below the role that I am trying to give, so that\'s why I shut the reaction down!', ephemeral: true });
            //     return;
            // }

            if(i.customId === 'button'){
                member.roles.add(role);
                i.reply({ content: `You now have the role ${role.name}`, ephemeral: true })
            }
        })
    }
}