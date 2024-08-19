import {BaseProvider} from "/crs-framework/packages/crs-schema/html/crs-base-provider.js";

export class ListProvider extends BaseProvider {
    get key() {
        return "list";
    }

    get template() {
        return `<ul __attributes__ __styles__>__content__</ul>`;
    }

    async process(item) {
        const parts = await super.process(item);

        const datasourceName = item.datasource;
        const datasource = this.parser.managers["datasources"].getDataSource(datasourceName);
        const content = datasource.map(item => `<li>${item}</li>`).join("");

        return this.setValues(this.template, {
            "__content__": content,
            "__attributes__": parts.attributes,
            "__styles__": parts.styles
        })
    }
}