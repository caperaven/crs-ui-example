export class GreetingsManager {
    #data = {};

    get isManager() {
        return true;
    }

    /**
     * Mark this manager as a value processor so that the provider knows to call the process method.
     * @returns {boolean}
     */
    get valueProcessor() {
        return true;
    }

    get key() {
        return "greetings";
    }

    /**
     * Reset the manager to its initial state.
     * This will remove all registered datasources, so that it is ready to be used again.
     */
    reset() {
        this.#data = {};
    }

    /**
     * This is called when the schema is loaded.
     * The key in the root of the schema matches this manager's key property.
     * The parameter passed is the object in the schema that matches the key.
     * @param arg
     */
    initialize(arg) {
        this.#data = arg;
    }

    /**
     * This is called when the provider calls the parseStringValue method
     * See the heading provider for an example of how this is used.
     * 1. Evaluate if the value matches the markers you are looking for.
     * 2. Return the updated string with the required modifications.
     * @param value
     * @returns {Promise<*|string>}
     */
    async process(value) {
        if (typeof value != "string" || !value.startsWith("$g{")) return value;
        // strip value from between $g{ and }
        let key = value.substring(3, value.length - 1);
        return this.#data[key];
    }
}