import { DiscordRequest } from './requests.js';

export async function InstallAppCommands(appId, commands) {
    if (appId === '') return;

    commands.forEach(async (c) => {
        await HasAppCommand(appId, c);
    });

};

export async function InstallAppCommand(appId, command) {

    const endpoint = `applications/${appId}/commands`;

    try {

        await DiscordRequest(endpoint, { method: 'POST', body: command });

    } catch (err) {

        console.error(err);

    }
}

async function HasAppCommand(appId, command) {

    const endpoint = `applications/${appId}/commands`;

    try {
        const res = await DiscordRequest(endpoint, { method: 'GET' });
        const data = await res.json();

        if (data) {
            const installedNames = data.map(async (c) => {
                c.name
            });

            if (!installedNames.includes(command.name)) {
                console.log(`Installing /${command.name}`);
                InstallAppCommand(appId, command);
            } else {
                console.log(
                    `/"${command.name}" command already installed!`
                );
            };

        }
    } catch (err) {

        console.error(err);

    }
}
