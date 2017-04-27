## term-stats
Check npm download stats in your terminal :100: :computer:

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

<!--**First**, you need to find your `npm` root directory.
Go to a terminal and run the following command:

```bash
$ npm root -g
/usr/lib/node_modules #Linux
C:\Users\YOUR_USERNAME\AppData\Local\node_modules #Windows
```

You might get a different result but as long as it is a `node_modules` folder, you are good to go. Otherwise, please feel free to file an issue.

**Second**, `cd` into that directory, and make a new file named `term-stats.json`. That's where you will put the list of packages you wanna know the stats for.-->

```bash
$ cd /usr/lib/node_modules
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

**Step 2.** All you have to do now is fire a terminal, and type in

```bash
$ term-stats
```

And the party begins. (Demo. Go see the [demo](#demo). ⬇)

## Demo

