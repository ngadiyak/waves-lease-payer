```shell
docker build . -t payer
```

```shell
docker run -d  -e SEED="your seed"  -e BENEFICIARY="your address"  -e MINER="your miner address" --restart=always --name payer payer 
```