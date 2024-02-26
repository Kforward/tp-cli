#!/usr/bin/env node
const { promisify } = require('util')

const ora = require('ora')
const clear = require('clear')
const inquirer = require('inquirer')
const program = require('commander')
const download = require('git-pull-or-clone')
const { log } = require('../lib/tools')
const package = require("../package.json")
// const download = require('download-git-repo')

const figlet = promisify(require("figlet"));

const choicesMenu = {
  vue3Template: 'Vue3',
  quit: '退出',
}

clear()

// 绘制 LOGO
log(figlet.textSync("TP-CLI", {
  horizontalLayout: "Isometric1",
  verticalLayout: "default",
  width: 80,
  whitespaceBreak: true,
}));


new program
  .Command('create <projectName>')
  .description('create a new project')
  .alias('c')
  .action(handler).version(package.version).parse(process.argv)

async function handler(projectName, options) {
  try {
    const answer = await inquirer.prompt([
      {
        type: 'list',
        name: 'frameTemplate',
        message: '请选择框架类型',
        choices: Object.values(choicesMenu)
      }
    ])

    if (answer.frameTemplate === choicesMenu.vue2Template) {
      return
    }
    if (answer.frameTemplate === choicesMenu.quit) {
      return
    }
    if (choicesMenu.vue3Template) {
      const spinner = ora('正在下载……\n').start();
      download("https://gitee.com/linkTarget/custom-vue3-admin-project.git", options.args[1], {}, function (err) {
        if (err) {
          spinner.text = '下载失败……'
          spinner.stop()
        } else {
          spinner.succeed('下载成功!')
          spinner.stop()
        }
      })
    }
  } catch (error) {

  }
}