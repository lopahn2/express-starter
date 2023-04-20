# express-quick-starter

This repository has been modified to exclude as much as possible the outdated JS syntax used by express-generator.
  
## Main Property
### ESM
### Auto Router Attach is Possible
```js
// router atuo attatch
const routeFiles = fs.readdirSync(path.join(__dirname, '/routes'))
    .filter(file => file.indexOf('.') !== 0  && file.slice(-3) === ".js");

for await (const routeFile of routeFiles) {
  const router = await import(`./routes/${routeFile}`);
  app.use(`/${routeFile.split('.')[0].replace('index','')}`, router.default);
}

```
### bin/www seperate Server

## Usage
```git
git remote add starter https://github.com/lopahn2/express-starter.git
git pull starter main
```
```npm
npm i
```
