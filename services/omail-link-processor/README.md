# Omail Link Processor

## Query Parameters for `/retrieve`
- `tenantKey` (**required**): The tenant key to query content data from, e.g. `acbm_fcp`
- `host` (**required**): The host to retrieve the HTML from, e.g. `email.forconstructionpros.com`
- `alias` (**required**): The email deployment alias to retrieve, e.g. `power-rental`
- `day` (_optional_): The day to query, e.g. `2020-04-20`. If left blank will pull the current day.
- `exHost` (**required**): The EmailX serving/delivery host to query ad data from, e.g. `acbm.serve.email-x.io`
- `pretty` (_optional_): Whether to pretty-print the output HTML. This is off by default

Putting it all together:
```
/retrieve?tenantKey=acbm_fcp&host=email.forconstructionpros.com&alias=power-rental&day=2020-04-20&exHost=acbm.serve.email-x.io&pretty
```
