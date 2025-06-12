import AggregateError from 'aggregate-error';

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

    // Throw any errors we accumulated during the validation
    if (errors.length > 0) {
        throw new AggregateError(errors);
    }
};