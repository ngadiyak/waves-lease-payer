```shell
docker build . -t payer
```

```shell
docker run -d  -e SEED="your seed"  -e BENEFICIARY="your address"  -e MINER="your miner address"  --name payer payer 
```