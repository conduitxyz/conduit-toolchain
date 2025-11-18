## `conduit-toolchain` Action

This GitHub Action installs [Conduit](https://github.com/conduitxyz/conduit-cli).

### Example workflow

```yml
on: [push]

name: test

jobs:
  check:
    name: Conduit project
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
        with:
          submodules: recursive

      - name: Install Conduit
        uses: conduit-xyz/conduit-toolchain@v1
        with:
          version: nightly
          api_key: ${{ secrets.CONDUIT_API_KEY }}
          organization: ${{ secrets.CONDUIT_ORGANIZATION }}

      - name: create network
        run: conduit network create --name "my-network-${{github.run_id}}" > out.json
      
      - name: extract identifiers
        id: data
        run: |
          echo "RPC_URL= $(jq '.network.rpcURL' out.json)" >> $GITHUB_OUTPUT
          echo "NETWORK_ID= $(jq '.network.network' out.json)" >> $GITHUB_OUTPUT
 
      - name: version check rpc url
        run: |
          curl -vvv -H "Content-Type: application/json" -X POST -d '{"jsonrpc":"2.0","method":"web3_clientVersion","params":[],"id":67}' ${{ steps.data.outputs.RPC_URL }}
      
      # Once done, clean up the network
      - name: delete network
        run: conduit network delete --network ${{ steps.data.outputs.NETWORK_ID }}
```

### Inputs

| **Name**  | **Required** | **Description**                                                                                               | **Type** |
|-----------|--------------|---------------------------------------------------------------------------------------------------------------|----------|
| `version` | No          | Version to install, e.g. `nightly` or `1.0.0`.  **Note:** Conduit only has nightly builds for the time being. | string   |
| `api_key` | Yes          | API key to use. You can get this by running `conduit login` locally or by creating a one in your settings | string   |
| `organization` | Yes          | Which organization this installation is targeting. Can be overriden on the command line. | string   |
