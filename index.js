import dotenv from 'dotenv';
import verifyGitea from './src/verify.js';

dotenv.config();

let verified;


export async function verifyConditions(pluginConfig, context) {
    await verifyGitea(pluginConfig, context);
    verified = true;
}