#!/usr/bin/env node

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
    let config = process.env.TERM_STATS_CONFIG;
    if (config) {
        findListOfPackages(config);
        return;
    }
    console.log("Did you add the environment variable?");
    return;
}

function parseToLocaleString(number) {

    return parseInt(number).toLocaleString();

}

function listDownloads() {

    var tableLength = 0;

    listOfPackages.forEach((package) => {

        let newURL = URL + package;

        request(newURL, function (error, response, html) {
            if (!error && response.statusCode == 200) {

                let doc = cheerio.load(html);

                let dailyDownloads = chalk.magenta(parseToLocaleString(doc('.daily-downloads').text()));

                let weeklyDownloads = chalk.cyan(parseToLocaleString(doc('.weekly-downloads').text()));

                let monthlyDownloads = chalk.green(parseToLocaleString(doc('.monthly-downloads').text()));

                tableLength = table.push([package, dailyDownloads, weeklyDownloads, monthlyDownloads]);

                // All packages have been scraped.
                if (tableLength === listOfPackages.length) {
                    console.log(table.toString());
                }
            } else if (response.statusCode == 404) {
                // Wrong or typo in package name. Inserting "N/A" in the table.
                tableLength = table.push([package, "N/A", "N/A", "N/A"]);

                if (tableLength === listOfPackages.length) {
                    console.log(table.toString());
                }
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

findConfigFile(findListOfPackages);