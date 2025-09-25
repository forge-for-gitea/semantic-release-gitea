export default (
    {
        giteaUrl,
        giteaApiPathPrefix,
    },
    {env}
) => ({
    giteaToken: env.GITEA_TOKEN || '',
    giteaUrl: env.GITEA_URL || '',
    giteaApiPathPrefix: env.GITEA_PREFIX || '/api/v1',
    assets: [],
});