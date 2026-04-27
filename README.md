# Express MSSQL Stored Procedure App

Express.js 4, mssql, dotenv 기반의 Stored Procedure 호출 예제입니다.

> `mssql@12`는 Node.js `18.19.0` 이상이 필요합니다.

## 폴더 구조

```text
.
├── config/
│   └── db.js
├── controllers/
│   ├── healthController.js
│   └── itemController.js
├── middleware/
│   ├── errorHandler.js
│   └── notFoundHandler.js
├── public/
│   ├── css/styles.css
│   └── js/app.js
├── routes/
│   ├── api.js
│   └── index.js
├── scripts/
│   └── healthcheck.js
├── views/
│   └── index.html
├── .env.example
├── package.json
└── server.js
```

## 실행

```bash
npm install
npm start
```

개발 중 자동 재시작이 필요하면 아래 명령을 사용합니다.

```bash
npm run dev
```

브라우저에서 `http://localhost:3000`으로 접속하면 기본 화면과 서버 상태를 확인할 수 있습니다.

## 정상 작동 확인

서버가 실행 중일 때 아래 명령으로 헬스체크를 실행합니다.

```bash
npm run check
```

직접 확인할 URL은 `http://localhost:3000/api/health`입니다.

서버 실행부터 URL 확인까지 한 번에 검증하려면 아래 명령을 사용합니다.

```bash
npm run verify
```

## DB 설정

`.env.example`을 참고해 `.env`에 실제 외부 SQL Server 정보를 입력합니다. `.env`는 `.gitignore`에 포함되어 저장소에 커밋되지 않습니다.

```env
DB_SERVER=your-sql-server.example.com
DB_PORT=1433
DB_USER=your-db-user
DB_PASSWORD=your-db-password
DB_NAME=your-db-name
DB_POOL_MAX=10
DB_POOL_MIN=0
DB_ENCRYPT=false
DB_TRUST_SERVER_CERTIFICATE=true
```

API는 직접 SQL을 실행하지 않고 `mssql`의 `request.execute()`로 Stored Procedure를 호출하도록 구성되어 있습니다.

```js
request.execute('P_SAVE');
request.execute('P_SAVE_IUD');
```
