const AggregateError = require("aggregate-error");

/**
 * A method to verify that the user has given us a slack webhook url to post to
 */
module.exports = async (pluginConfig, context) => {
    const { logger } = context;
    const errors = [];

    // Throw any errors we accumulated during the validation
    if (errors.length > 0) {
        throw new AggregateError(errors);
    }
};