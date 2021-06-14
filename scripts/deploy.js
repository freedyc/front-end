const path = require('path');
const shell = require('shelljs');
const Rsync = require('rsync');
const colors = require('colors');
const yargs = require('yargs/yargs')
const { hideBin } = require('yargs/helpers')
const argv = yargs(hideBin(process.argv)).argv

const [name] = argv._;

const hostMap = {
    hw: 'root@bugchao.com:/usr/share/front-end',
}

const log = (text, color) => {
    console.log(colors[color || 'green'](text));
}


if (!hostMap[name]) {
    log('目标主机不存在', 'red');
    shell.exit(1);
}

log('开始构建Front-end项目', 'yellow');

// 通知开始构建

// 安装依赖
log('⏬开始下载依赖', 'yellow')
if (shell.exec('yarn').code !== 0) {
    shell.echo('Error: yarn failed');
    shell.exit(1);
}
log('🚩依赖下载成功\n')

// 测试
log('⌛️开始保存测试快照', 'yellow')
if (shell.exec('yarn playwright').code !== 0) {
    shell.echo('Error: save snapshot failed');
    shell.exit(1);
}
log('🚩测试快照保存成功\n')

// 构建
log('🔧开始构建', 'yellow')
if (shell.exec('yarn build').code !== 0) {
    shell.echo('Error: build failed');
    shell.exit(1);
}
log('✅构建完成\n')

// 部署
log('🪤开始部署', 'yellow')
const sourcePath = path.join(__dirname, '..', 'dist/*');

const rsync = new Rsync()
  .shell('ssh')
  .flags('avz')
  .source(sourcePath)
  .destination(hostMap[name]);
console.log('部署中...');
rsync.execute(function(error, code, cmd) {
    if (error) {
        console.log('Error: rsync failed');
    } else {
        log('🚀部署成功');
    }
});
