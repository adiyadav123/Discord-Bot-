const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js');
const linkSchema = require('../../Schemas.js/link');

module.exports = {
    data: new SlashCommandBuilder()
        .addSubcommand(
            command =>
                command.setName('setup')
                    .setDescription('setu p anti-link system')
                    .addStringOption(option => option.setName('permissions').setDescription('choose the permissions to bypass the anti link system')
                        .addChoices(
                            { name: 'Manage Channels', value: 'ManageChannels' },
                            { name: 'Manage Server', value: 'ManageGuild' },
                            { name: 'Embed Links', value: 'EmbedLinks' },
                            { name: 'Attach Files', value: 'AttachFiles' },
                            { name: 'Administrator', value: 'Administrator' }
                        )
                    )
        )
        .addSubcommand(command =>
            command.setName('disable')
                .setDescription('disables the anti link system')
        )
        .addSubcommand(command =>
            command.setName('status')
                .setDescription('checks the status of anti link system')
        )
        .addSubcommand(command =>
            command.setName('edit')
                .setDescription('edit the permissions of anti link system')
                .addStringOption(option => option.setName('permissions').setDescription('choose the permissions to bypass the anti link system')
                    .addChoices(
                        { name: 'Manage Channels', value: 'ManageChannels' },
                        { name: 'Manage Server', value: 'ManageGuild' },
                        { name: 'Embed Links', value: 'EmbedLinks' },
                        { name: 'Attach Files', value: 'AttachFiles' },
                        { name: 'Administrator', value: 'Administrator' }
                    )
                )
        ),
        // .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
    async execute(interaction) {
        const sub = options.getSubcommand();

        switch (sub) {
            case 'setup':
                const permissions = options.getString('permissions')
                const Data = await linkSchema.findOne({ Guild: interaction.guild.id });
                if (Data) {
                    return await interaction.reply({ content: `You already have anti link system setup, so do \`antilink disable to disable it if you want`, ephemeral: true })
                }
                if (!Data) {
                    linkSchema.create({
                        Guild: interaction.guild.id,
                        Perms: permissions
                    })
                }
                const embed = new EmbedBuilder()
                    .setColor("Blue")
                    .setDescription(`✅ The anti link sytem has been setup with bypass permissions ${permissions}`)

                await interaction.reply({ embeds: [embed] });
        }
        switch (sub) {
            case 'disable':
                await linkSchema.deleteMany();
                const embed2 = new EmbedBuilder()
                    .setColor("Blue")
                    .setDescription(`✅ The anti link sytem has been disabled.`)
                await interaction.reply({ embeds: [embed2] })
        }
        switch (sub) {
            case 'check':
                const Data = await linkSchema.findOne({ Guild: interaction.guild.id });
                if (!Data) {
                    return await interaction.reply({ content: `There is no anti link system enabled here!`, ephemeral: true })
                }
                const permissions = Data.Perms;
                if (!permissions) {
                    return await interaction.reply({ content: `there is no anti link system enabled`, ephemeral: true })
                }
                else {
                    return await interaction.reply({ content: `Your anti link system has been enabled. People with permissions **${permissions}** can bypass this system!`, ephemeral: true })
                }
        }
        switch (sub) {
            case 'edit':
                const Data = await linkSchema.findOne({ Guild: interaction.guild.id });
                const permissions = Data.Perms;
                if (!permissions) {
                    return await interaction.reply({ content: `there is no anti link system enabled`, ephemeral: true })
                }
                else {
                    await linkSchema.deleteMany();
                    await linkSchema.create({
                        Guild: interaction.guild.id,
                        Perms: permissions
                    })
                    const embed3 = new EmbedBuilder()
                        .setColor("Blue")
                        .setDescription(`✅ The anti link sytem has been edited and permissions has been set to **${permissions}**`)
                    await interaction.reply({ embeds: [embed3] })
                }
        }
    }
}