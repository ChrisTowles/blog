---
title: Github Copilot when on a proxy
date: 2023-10-11T08:05:00.000+00:00
lang: en
duration: 5min
---



```
Proxy socket connection error,Failed to establish a socket connection to proxies
```


## Fix
```json
{ 
"http.proxyStrictSSL": false,
}
```