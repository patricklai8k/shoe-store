import { createServer, Request } from 'miragejs';
import Schema from "miragejs/orm/schema";
import { modelInventory } from './modelInventory';
import { getStoresByID, stores } from './stores';

export const makeServer = () => {
    return createServer({
        routes() {
            this.namespace = 'api';

            this.get('/stores', () => {
                return {
                    stores: stores
                };
            });

            this.get('/stores/:id', (_schema: Schema<any>, request: Request) => {
                let id = request.params.id;

                return getStoresByID(id)
            });

            this.get('/model-inventory/:store', (_schema: Schema<any>, request: Request) => {
                let store = request.params.store;
                let inventory = modelInventory.filter((item) => !(item.store === store));

                return { inventory };
            });

            this.passthrough()
            this.passthrough("ws://localhost:8080/**");
            this.passthrough("https://api.mapbox.com/**");
            this.passthrough("https://events.mapbox.com/**");

            if (!window.Request.prototype.hasOwnProperty('signal')) {
                // @ts-ignore
                window.Request.prototype.signal = undefined;
            }

            let oldPassthroughRequests = this.pretender.passthroughRequest.bind(
                this.pretender
            );
            // @ts-ignore
            this.pretender.passthroughRequest = (verb, path, request) => {
                // Needed because responseType is not set correctly in Mirages passthrough
                // for more details see: https://github.com/miragejs/miragejs/issues/1915

                if (verb === 'GET' && path.match(/\.png|\.pbf|\.webp|\.glb/)) {
                    request.responseType = 'arraybuffer';
                }
                return oldPassthroughRequests(verb, path, request);
            };
        },
    });
}
