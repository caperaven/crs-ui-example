export class DatasourceManager {
    #datasources = {};

    get isManager() {
        return true;
    }

    get key() {
        return "datasources";
    }

    /**
     * Reset the manager to its initial state.
     * This will remove all registered datasources, so that it is ready to be used again.
     */
    reset() {
        this.#datasources = {};
    }

    /**
     * This is called when the schema is loaded.
     * The key in the root of the schema matches this manager's key property.
     * The parameter passed is the object in the schema that matches the key.
     * @param arg
     */
    initialize(arg) {
        this.#datasources = arg;
    }

    getDataSource(name) {
        return this.#datasources[name];
    }
}