const { get } = require('axios');

exports.VKDiceCallback = class {
    constructor (vkDice) {
        if(!vkDice?.api?.key) throw new Error(`VKDice Callback: Вы не передали параметр ключ авторизации (key).`);
    
        this.apiKey = vkDice.api.key;

        this.fastify = new require('fastify')();

        this.fastify.post('/', async (request, reply) => {
            const { body } = request;

            if(!this.#check(body)) return { ok: false };

            this.callbacks.map(callback => callback(body));

            return { ok: true };
        });

        this.callbacks = [];
    };

    #check (body) {
        const { request_hash } = body;

        delete body.request_hash;

        return (require('js-md5')(`${this.apiKey}|${JSON.stringify(body)}`) === request_hash);
    };

    on (callback) {
        if(typeof callback !== 'function') throw new Error('VKDice Callback: Callback must be a function.');

        this.callbacks.push(callback);
    };

    start (port = 3000, host = '0.0.0.0') {
        return this.fastify.listen({ port, host });
    };

    stop () {
        return this.fastify.close();
    };
};

exports.VKDice = class {
    constructor (options = {}) {
        const { key, merchant, version } = options;

        if(!key || !merchant) throw new Error(`VKDice: Вы не передали ${key ? 'ID мерчанта (merchant)' : 'ключ авторизации (key)'}.`);

        this.api = {
            merchant,
            key,
            headers: { 'dc-key': key },
            url: 'https://api-dice.belle.dev/',
            version: version || 'v2'
        };

        ['coins','api'].map(group => this.api[group] = new Proxy({ group }, { get: ({ group }, method) => params => this.callApi(`${group}.${method}`, params) }));
    };

    callApi (method, data) {
        return get(this.api.url + `${this.api.version}/` + method, { params: { m: this.api.merchant }, data, headers: this.api.headers }).then(({ data }) => data);
    };
};