## `conduit-toolchain` Action

This GitHub Action installs [Conduit](https://github.com/conduit-xyz/conduit-cli).

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
          api_key: ${{ secrets.API_KEY }}
          organization: ${{ secrets.ORGANIZATION }}

      - name: Run snapshot
        run: conduit network create --name "my-network"
```

### Inputs

| **Name**  | **Required** | **Description**                                                                                               | **Type** |
|-----------|--------------|---------------------------------------------------------------------------------------------------------------|----------|
| `version` | Yes          | Version to install, e.g. `nightly` or `1.0.0`.  **Note:** Conduit only has nightly builds for the time being. | string   |
