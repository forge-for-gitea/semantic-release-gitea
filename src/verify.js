import AggregateError from 'aggregate-error';
import { giteaApi } from 'gitea-js';
import config from './utils/config.js';
import parseGitUrl from './utils/parse-git-url.js';

/**
 * A method to verify that the user has given us a slack webhook url to post to
 */
export default async function verify (pluginConfig, context) {
    const {
        env,
        options: { repositoryUrl },
        logger,
    } = context;
    const errors = [];
    const {giteaToken, giteaUrl, giteaApiPathPrefix} = config(pluginConfig, context);

    if (giteaToken === '') {
        errors.push({
            message: '`GITEA_TOKEN` is required',
            details: '`GITEA_TOKEN` is required'
        });
    }

    if (giteaUrl === '') {
        errors.push({
            message: '`GITEA_URL` is required',
            details: '`GITEA_URL` is required'
        });
    }

    try {
        new URL(giteaUrl);
    } catch (error) {
        errors.push({
            message: '`GITEA_URL` is not a valid URL',
            details: '`GITEA_URL` is not a valid URL. Error: ' . error.message
        });
    }

    const {owner, repo} = parseGitUrl(repositoryUrl);

    if (!owner || !repo) {
        errors.push({
            message: 'The git repository URL is not a valid Gitea URL.',
            details: `The **semantic-release** \`repositoryUrl\` option must a valid Git URL with the format \`<Gitea_URL>/<owner>/<repo>.git\`.

By default the \`repositoryUrl\` option is retrieved from the \`repository\` property of your \`package.json\` or the [git origin url](https://git-scm.com/book/en/v2/Git-Basics-Working-with-Remotes) of the repository cloned by your CI environment.`,
        });
    }

    const api = giteaApi(giteaUrl, {
        token: giteaToken
    });

    if (errors.length > 0) {
        throw new AggregateError(errors);
    }

    api.repos.repoGet(owner, repo).then((response) => {
        return response.data;
    }, (error) => {
        console.log(error);
    }).then((data) => {
        console.log(data);
        console.log(data.permissions.push);
    }, (error) => {
        console.log(error);
    });

    if (errors.length > 0) {
        throw new AggregateError(errors);
    }
};