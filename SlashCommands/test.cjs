const { request, response } = require("express");
const { InteractionResponseType, InteractionResponseFlags, ButtonStyleTypes, MessageComponentTypes } = require('discord-interactions');
const { ApplicationCommandType } = require("discord.js");
const hex = require("hex-to-64int");

module.exports = {
    data: {
        name: "test",
        description: "Basic test command.",
        type: ApplicationCommandType.ChatInput,
    },
    /**
     * @param { request } req
     * @param { response } res
     */
    async execute(req, res) {

        const { avatar, id, username, discriminator } = req.body.member.user;
        const { application_id, channel_id, guild_id } = req.body;
        const commandId = req.body.id;

        return res.send({
            type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
            data: {
                embeds: [{
                    author: {
                        name: `${username}#${discriminator}  |  You used this command!`,
                        icon_url: `https://cdn.discordapp.com/avatars/${id}/${avatar}.png?size=4096`,
                    },
                    footer: {
                        text: "The footer.",
                    },
                    title: "The title.",
                    description: "The description.",
                    color: hex.convert("d454ff")
                }],
                components: [
                    {
                        type: MessageComponentTypes.ACTION_ROW,
                        components: [
                            {
                                type: MessageComponentTypes.BUTTON,
                                style: ButtonStyleTypes.SUCCESS,
                                label: "Button",
                                custom_id: "button",

                            }
                        ]
                    }
                ],
                flags: InteractionResponseFlags.EPHEMERAL,
            },
        });


    },
};
