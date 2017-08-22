const fs = require('mz/fs');
const path = require('path');

let home = async (ctx, next) => {
    let htmlFile = path.join(__dirname, '../static/index.html');
    if (await fs.exists(htmlFile)) {
        // 查找文件的mime
        ctx.response.type = 'html';
        // 读取文件内容并赋值给response.body
        ctx.response.body = await fs.readFile(htmlFile);
    } else {
        // 文件不存在
        ctx.response.status = 404;
    }
};

module.exports = {
    'GET /': home
};
