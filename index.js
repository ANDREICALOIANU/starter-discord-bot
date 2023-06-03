const { Client, Intents } = require('discord.js');

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('messageCreate', message => {
  if (message.content === 'ping') {
    message.reply('pong');
  }
});

client.on('interactionCreate', async interaction => {
  if (!interaction.isCommand()) return;

  const { commandName } = interaction;

  if (commandName === 'yo') {
    await interaction.reply('Yo!');
  } else if (commandName === 'dm') {
    await interaction.reply('I am not able to respond to DMs with slash commands.');
  } else if (commandName === 'ban') {
    if (!interaction.member.permissions.has('BAN_MEMBERS')) {
      return interaction.reply('You do not have permission to use this command!');
    }

    const user = interaction.options.get('user').user;

    if (user) {
      const member = interaction.guild.members.cache.get(user.id);

      if (member) {
        await member.ban({ reason: 'Banned by the bot.' });
        await interaction.reply(`${user.tag} was successfully banned.`);
      } else {
        await interaction.reply("That user isn't in this server!");
      }
    } else {
      await interaction.reply("You didn't mention the user to ban!");
    }
  } else if (commandName === 'warn') {
    if (!interaction.member.permissions.has('KICK_MEMBERS')) {
      return interaction.reply('You do not have permission to use this command!');
    }

    const user = interaction.options.get('user').user;

    if (user) {
      const member = interaction.guild.members.cache.get(user.id);

      if (member) {
        await member.send(`You have been warned in ${interaction.guild.name}.`);
        await interaction.reply(`${user.tag} has been warned.`);
      } else {
        await interaction.reply("That user isn't in this server!");
      }
    } else {
      await interaction.reply("You didn't mention the user to warn!");
    }
  } else if (commandName === 'mute-text') {
    if (!interaction.member.permissions.has('MUTE_MEMBERS')) {
      return interaction.reply('You do not have permission to use this command!');
    }

    const user = interaction.options.get('user').user;

    if (user) {
      const member = interaction.guild.members.cache.get(user.id);

      if (member) {
        const mutedRole = interaction.guild.roles.cache.find(role => role.name === 'Muted');
        if (mutedRole) {
          await member.roles.add(mutedRole);
          await interaction.reply(`${user.tag} was successfully muted.`);
        } else {
          await interaction.reply('The "Muted" role does not exist. Please create it before using this command.');
        }
      } else {
        await interaction.reply("That user isn't in this server!");
      }
    } else {
      await interaction.reply("You didn't mention the user to mute!");
    }
  } else if (commandName === 'kick-role') {
    if (!interaction.member.permissions.has('KICK_MEMBERS')) {
      return interaction.reply('You do not have permission to use this command!');
    }

    const roleName = interaction.options.get('role').value;
    const role = interaction.guild.roles.cache.find(r => r.name === roleName);

    if (role) {
      const membersWithRole = interaction.guild.members.cache.filter(m => m.roles.cache.has(role.id));

      membersWithRole.forEach(async member => {
        await member.kick('Kicked by the bot.');
      });

      await interaction.reply(`Kicked all members with the role "${roleName}".`);
    } else {
      await interaction.reply(`The role "${roleName}" does not exist.`);
    }
  } else if (commandName === 'ban-role') {
    if (!interaction.member.permissions.has('BAN_MEMBERS')) {
      return interaction.reply('You do not have permission to use this command!');
    }

    const roleName = interaction.options.get('role').value;
    const role = interaction.guild.roles.cache.find(r => r.name === roleName);

    if (role) {
      const membersWithRole = interaction.guild.members.cache.filter(m => m.roles.cache.has(role.id));

      membersWithRole.forEach(async member => {
        await member.ban({ reason: 'Banned by the bot.' });
      });

      await interaction.reply(`Banned all members with the role "${roleName}".`);
    } else {
      await interaction.reply(`The role "${roleName}" does not exist.`);
    }
  }
});

client.login('MTExMjc5NDA0MzI1MzAxMDQ4Mg.GtqJKw.QYcBLYSnzBRARUHGCphpn1aEXEe4YULAjprpi0');
