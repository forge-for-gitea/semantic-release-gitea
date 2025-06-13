import verifyGita from './src/verify';

let verified;

/**
 * Called by semantic-release during the verification step
 * @param {*} pluginConfig The semantic-release plugin config
 * @param {*} context The context provided by semantic-release
 */
export async function verifyConditions(pluginConfig, context) {
    await verifyGita(pluginConfig, context);
    verified = true;
}