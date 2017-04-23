const chalk = require('chalk');
const cheerio = require('cheerio');
const request = require('request');
const emoji = require('node-emoji');
const cp = require('child_process');
const Table = require('cli-table');

const fs = require('fs');
const path = require('path');

const CONFIG = 'term-stats.json';
const URL = 'https://www.npmjs.com/package/';
var listOfPackages;

const packageEmoji = chalk.blue(emoji.get('package'));
const downloadsEmoji = chalk.white(emoji.get('arrow_down'));

var table = new Table({
    head: [
        chalk.blue('Package ') + packageEmoji,
        chalk
            .bgMagenta
            .white(' Daily '),
        chalk
            .bgCyan
            .white(' Weekly '),
        chalk
            .bgGreen
            .white(' Monthly ')
    ],
    colWidths: [15, 15, 15, 15]
});

function findConfigFile(findListOfPackages) {

    cp.exec('npm root -g', (err, stdout, stdin) => {

        let npmRoot = stdout.trim();

        let configRoot = npmRoot.substr(0, npmRoot.lastIndexOf(path.sep) + 1);

        findListOfPackages(configRoot);

    });

}

function listDownloads() {

    listOfPackages.forEach((package) => {

        let newURL = URL + package;

        request(newURL, function (error, response, html) {

            if (!error && response.statusCode == 200) {

                let doc = cheerio.load(html);

                let dailyDownloads = chalk.magenta(doc('.daily-downloads').text());

                let weeklyDownloads = chalk.cyan(doc('.weekly-downloads').text());

                let monthlyDownloads = chalk.green(doc('.monthly-downloads').text());

                table.push([package, dailyDownloads, weeklyDownloads, monthlyDownloads]);

                console.log(table.toString());
            }
        });
    });
};

function findListOfPackages(configRoot) {
    fs.readFile(configRoot + CONFIG, (err, data) => {
        if (!err) {
            let file = JSON.parse(data.toString());
            listOfPackages = file.packages;
            listDownloads();
        } else {
            throw new Error(err);
        }
    });
};

// findConfigFile(findListOfPackages);