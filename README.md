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

      - name: create network
        run: conduit network create --name "my-network"
```

### Inputs

| **Name**  | **Required** | **Description**                                                                                               | **Type** |
|-----------|--------------|---------------------------------------------------------------------------------------------------------------|----------|
| `version` | No          | Version to install, e.g. `nightly` or `1.0.0`.  **Note:** Conduit only has nightly builds for the time being. | string   |
| `api_key` | Yes          | API key to use. You can get this by running `conduit login` locally or by creating a one in your settings | string   |
| `organization` | Yes          | Which organization this installation is targeting. Can be overriden on the command line. | string   |
