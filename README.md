# express-quick-starter

이 저장소는 express-generator가 가지는 구 버전 JS 문법을 최대한 배제하고 수정한 레포지토리입니다.  
  
## 주요 기능
### ESM 사용
### 자동 라우터 부착 가능
```js
// router atuo attatch
const routeFiles = fs.readdirSync(path.join(__dirname, '/routes'))
    .filter(file => file.indexOf('.') !== 0  && file.slice(-3) === ".js");

for await (const routeFile of routeFiles) {
  const router = await import(`./routes/${routeFile}`);
  app.use(`/${routeFile.split('.')[0].replace('index','')}`, router.default);
}

```
### bin/www 서버 분리

## 사용법
```git
git remote add starter https://github.com/Shane-Park/playddit.git
```
