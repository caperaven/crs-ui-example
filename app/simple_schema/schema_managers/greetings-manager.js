export class GreetingsManager {
    #data = {};

    get isManager() {
        return true;
    }

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

    async process(value) {
        if (typeof value != "string" || !value.startsWith("$g{")) return value;
        // strip value from between $g{ and }
        let key = value.substring(3, value.length - 1);
        return this.#data[key];
    }
}