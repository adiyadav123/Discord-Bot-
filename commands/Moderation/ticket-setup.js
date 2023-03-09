const { SlashCommandBuilder, EmbedBuilder, ChannelType, ActionRowBuilder, StringSelectMenuBuilder, PermissionFlagsBits } = require('discord.js');
const ticketSchema = require('../../Schemas.js/ticket-schema');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('ticket-setup')
    .setDescription('this sets up ticket message system')
    .addChannelOption(option => option.setName('channel').setDescription('the channel where you want to send logs!').addChannelTypes(ChannelType.GuildText).setRequired(true))
    .addChannelOption(option => option.setName('category').setDescription('the category where you want to send tickets!').addChannelTypes(ChannelType.GuildCategory).setRequired(true))
    .addStringOption(option => option.setName('heading').setDescription('this will be the heading of ticket panel').setRequired(true))
    .addStringOption(option => option.setName('description').setDescription('this will be the description of ticket panel').setRequired(true))
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
    async execute(interaction){
        const { options, guild } = interaction;
        const channel = options.getChannel('channel');
        const head = options.getString('heading');
        const desc = options.getString('description');
        const category = options.getChannel('category');
        const data = ticketSchema.findOne({ Guild: guild.id }, async(err, data) => {
        if(!data){
            await ticketSchema.create({
                Guild: guild.id,
                Channel: category.id,
                Ticket : "first"
            })
        }else{
            await interaction.reply({ content: 'You have already enabled ticket system!\nType `/ticket-disable` to disable ticket system!' });
            return;
        }
        const embed = new EmbedBuilder()
        .setColor("Blue")
        .setTitle(`${head}`)
        .setDescription(`${desc}`)
        .setFooter({ text: `${interaction.guild.name}` })

        const menu = new ActionRowBuilder()
        .addComponents(
            new StringSelectMenuBuilder()
            .setCustomId('select')
            .setMaxValues(1)
            .setPlaceholder('Select a topic...')
            .addOptions(
                {
                    label: '🛠️ General Support',
                    value: 'Subject: General Support'
                },
                {
                    label: '🎉 Rewards Related',
                    value: 'Subject: Rewards Related'
                },
                {
                    label: '💖 Server Support',
                    value: 'Subject: Server Support'
                },
                {
                    label: '🌀 Others',
                    value: 'Subject: Others'
                }
            )
        );
        await channel.send({ embeds: [embed], components: [menu] });
        await interaction.reply({ content:`Ticket system set to ${channel}`, ephemeral: true });
        });
    }
}