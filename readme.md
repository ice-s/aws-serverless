```
cp secrets.sample.json secrets.json
```

```
sls plugin install -n serverless-offline
sls offline
```

```
sls dynamodb install
sls dynamodb start --migrate --dbPath ./dbdump	
```