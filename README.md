## term-stats
Check npm download stats in your terminal. 💯 💻 

[![npm](https://img.shields.io/npm/dt/term-stats.svg?style=flat-square)](https://www.npmjs.com/package/term-stats)
[![license](https://img.shields.io/npm/l/term-stats.svg?style=flat-square)](https://www.npmjs.com/package/term-stats)

![term-stats demo](https://raw.githubusercontent.com/abhisheksoni27/term-stats/master/term-stats.gif)

## Installation

Well, here we go again.

Let the awesomeness breathe. (duh!)
```bash
$ yarn global add term-stats
```

In case you like **npm** more,

```bash
$ npm i -g term-stats
```

## Usage

**Step 1.** Add some pretty(🙈) **config**.

A config file is what helps the package display stats for only the ones you care about. In this step you are gonna create one, and put it where it belongs.

* Add Environment variable &ndash; **TERM_STATS_CONFIG**

Adding an environment variable is a different procedure in every OS. If you are on windows, you can hit the `window` key and type `Environment variables` (Or you could Google). On linux/unix,

* if you're using `zsh`, that's probably in your home directory's `~/.zshrc` file
* if you're using `bash`, that could be your `bash_profile` file or `~/.bashrc` file
* if you're using `fish`, use set -gx key value in your `~/.config/fish/config.fish` file

Open the required file, and enter the following line:

```bash_profile
export TERM_STATS_CONFIG = '/usr/lib'
```
Change the contents inside the quotes to wherever you want to save the file. To check if it was successful, fire a new terminal and run this,

```bash
$ echo $TERM_STATS_CONFIG
'/usr/lib/' #Directory location of your config file. (See step 2.)
```

🎉

**Step 2.** Make a file named `term-stats.json` in the directory you chose above.

```bash
$ cd /usr/lib/
$ touch term-stats.json && nano term-stats.json
```

Feel free to open it in whatever editor you hang out with.

See the example `term-stats.json` to see how it works. You __*need*__ to have a key named `packages`,   which is an array of the names of packages you want the stats for.

```json
{
    "packages":["express", "npm", "yarn", "bower", "react", "react-native"]
}
```

Save it and move on. You are done. The next step is gonna be brilliant.

**Party Step** All you have to do now is fire a terminal, and type in

```bash
$ term-stats
```

And the party begins. 