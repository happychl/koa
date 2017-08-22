const fs = require('mz/fs');
const path = require('path');

function addMapping(router, mapping) {
    for (let url in mapping) {
        if (url.startsWith('GET ')) {
            let path = url.substring(4);
            router.get(path, mapping[url]);
            console.log(`register URL mapping:GET ${path}`);
        } else if (url.startsWith('POST ')) {
            let path = url.substring(5);
            router.post(post, mapping[url]);
            console.log(`register URL mapping:POST ${path}`);
        } else {
            console.log(`invalid URL:${url}`);
        }
    }
}

function addRoutes(router, dir) {
    let base_path = path.join(__dirname, '..', dir);
    let files = fs.readdirSync(base_path);
    let js_files = files.filter(f => {
        return f.endsWith('.js');
    });

    for (let f of js_files) {
        console.log(`process route:${f}...`);
        let mapping = require(`${base_path}/${f}`);
        addMapping(router, mapping);
    }
}

module.exports = function (dir) {
    let router_dir = dir || 'routes',
        router = require('koa-router')();
    addRoutes(router, router_dir);
    return router.routes();
}