import { createSchemaLoader } from "/crs-framework/packages/crs-schema/crs-schema.js";
import { HTMLParser } from "/crs-framework/packages/crs-schema/html/crs-html-parser.js";
import { HeadingProvider } from "./schema_providers/heading-provider.js";
import { ListProvider } from "./schema_providers/list-provider.js";
import { DatasourceManager } from "./schema_managers/datasource-manager.js";
import { GreetingsManager } from "./schema_managers/greetings-manager.js";

// import components
import "/crs-framework/components/combo-box/combo-box.js";

export default class WelcomeViewModel extends crs.classes.BindableElement {
    #schemaLoader;

    get html() {
        return import.meta.url.replace(".js", ".html");
    }

    get shadowDom() {
        return true;
    }

    get hasStyle() {
        return false;
    }

    async connectedCallback() {
        this.#schemaLoader = await createSchemaLoader(new HTMLParser());
        this.#schemaLoader.register(HeadingProvider);
        this.#schemaLoader.register(ListProvider);
        this.#schemaLoader.register(DatasourceManager);
        this.#schemaLoader.register(GreetingsManager);

        await super.connectedCallback();
    }

    async disconnectedCallback() {
        this.#schemaLoader = this.#schemaLoader.dispose();
        await super.disconnectedCallback();
    }

    async viewChanged(newValue) {
        const targetElement = this.shadowRoot.querySelector("#view-container");

        if (newValue == null) {
            targetElement.innerHTML = "";
            return;
        }

        const url = new URL(`schemas/${newValue}.json`, import.meta.url);
        const schema = await fetch(url).then(response => response.json());
        targetElement.innerHTML = await this.#schemaLoader.parse(schema);
    }
}