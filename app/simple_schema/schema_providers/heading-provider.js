import {BaseProvider} from "/crs-framework/packages/crs-schema/html/crs-base-provider.js";

export class HeadingProvider extends BaseProvider {
    get key() {
        return "heading";
    }

    get template() {
        return `<h2 __attributes__ __styles__>__heading__</h2>`;
    }

    async process(item) {
        const parts = await super.process(item);

        return this.setValues(this.template, {
            "__heading__": await this.parser.parseStringValue(item.heading ?? "No heading"),
            "__attributes__": parts.attributes,
            "__styles__": parts.styles
        })
    }
}