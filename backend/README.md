# テストデータ

db が空であることが前提

```
docker-compose up
docker-compose exec backend flask seed all
```

books に 10 件

users に 10 件

comment_types に`normal, place, secret`の 3 件

comments に 100 件 x3 の 300 件

likes に 1000 件

挿入される
