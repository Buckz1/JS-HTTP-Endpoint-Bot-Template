import 'dotenv/config';
import fs from "fs";
import express from 'express';
import { 
  InteractionType, 
  InteractionResponseType, 
  MessageComponentTypes 
} from 'discord-interactions';

import {
  VerifyDiscordRequest,
} from './requests.js';
import { connect } from "ngrok";
import { Collection } from "discord.js";
import { createRequire } from "module";
import { REST } from "@discordjs/rest";
import { Routes } from "discord-api-types/v10";

const require = createRequire(import.meta.url);
const app = express();
//const wait = require('util').promisify(setTimeout);
const rest = new REST({ version: "10" }).setToken(process.env.Token);

(async function () {
  const url = await connect(3000);
  console.log(url + "/interactions");
})();

app.use(express.json({
  verify: VerifyDiscordRequest(process.env.publicKey)
}));
// ------------------------------------------------------------

const commands = [];
const slashcommands = new Collection();
const commandFiles = fs.readdirSync('./SlashCommands').filter(file => file.endsWith('.cjs'));

for (const file of commandFiles) {
  const command = require(`./SlashCommands/${file}`);
  console.log(command)
  commands.push(command.data);
  slashcommands.set(command.data.name, command);
  rest.put(
    Routes.applicationCommands(process.env.appId),
    { body: commands },
  )
};

commands.forEach( (c) => { console.log(`Installed /${c.name}`)});
// ------------------------------------------------------------

const buttons = new Collection();
const buttonFiles = fs.readdirSync('./Buttons').filter(file => file.endsWith('.cjs'));

for (const file of buttonFiles) {
  const button = require(`./Buttons/${file}`);

  buttons.set(button.data.custom_id, button);
};
// ------------------------------------------------------------

app.post("/interactions", async function (req, res) {

  const { type, data } = req.body;

  if (type === InteractionType.PING) {

    return res.send({
      type: InteractionResponseType.PONG,
    });

  } else if (type === InteractionType.APPLICATION_COMMAND) {

    const commandName = data.name;
    const command = slashcommands.get(commandName);
    const { avatar, id, username, discriminator } = req.body.member.user;
    if (!command) return;
    if (!req.body.guild_id) return;

    try {

      return command.execute(req, res);

    } catch (error) {

      console.log(error);

    };

  } else if (type === InteractionType.MESSAGE_COMPONENT) {
    if (data.component_type = MessageComponentTypes.BUTTON) {

      const button = buttons.get(data.custom_id);
      const { avatar, id, username, discriminator } = req.body.member.user;
      if (!button) return;

      try {

        return button.execute(req, res);

      } catch (error) {

        console.log(error);

      };

    };

  };

});

app.listen(3000, async () => {
  console.log('Listening on port 3000');
});

const hex = require("hex-to-64int"); 
console.log(hex.convert("d454ff"))

