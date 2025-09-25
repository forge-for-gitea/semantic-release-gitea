import AggregateError from 'aggregate-error';
import {giteaApi} from 'gitea-js';
import config from './utils/config.js';
import parseGitUrl from './utils/parse-git-url.js';

export default async (pluginConfig, context) => {
    const {
        cwd,
        options: {repositoryUrl},
        branch,
        nextRelease: {name, gitTag, notes},
        logger,
    } = context;
    const errors = [];
    const {giteaToken, giteaUrl, giteaApiPathPrefix, assets} = config(pluginConfig, context);

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
            details: '`GITEA_URL` is not a valid URL. Error: ' + error.message
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

    const release = {
        body: notes,
        draft: false,
        name: name,
        prerelease: false,
        tag_name: gitTag,
        target_commitish: branch.name,
    };

    await api.repos.repoCreateRelease(owner, repo, release)
    .then((response) => {
        return response.data;
    }, (error) => {
        if (error instanceof Response) {
            throw new Error(`Request Error: ${error.status} ${error.statusText}`);
        }

        throw error;
    }).then((data) => {
        return {url: data.url, name: name};
    }, (error) => {
        throw error;
    }).catch(function (error) {
        errors.push({
            message: 'API Error',
            details: 'API Error: ' + error.message
        });
        throw new AggregateError(errors);
    });

    if (errors.length > 0) {
        throw new AggregateError(errors);
    }

    return {url: '', name: ''};
};