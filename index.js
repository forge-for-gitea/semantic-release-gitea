import dotenv from 'dotenv';
import verifyGitea from './src/verify.js';
import publishGitea from './src/publish.js';

dotenv.config();

let verified;

export async function verifyConditions(pluginConfig, context) {
    await verifyGitea(pluginConfig, context);
    verified = true;
}

export async function publish(pluginConfig, context) {

    if (!verified) {
        await verifyGitea(pluginConfig, context);
        verified = true;
    }

    return publishGitea(pluginConfig, context);
}
