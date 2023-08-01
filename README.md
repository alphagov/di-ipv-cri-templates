# di-ipv-cri-templates

Micro-templates for creating and developing Digital Identity Credential Issuers

## Usage

1. Install plop globally

```bash
npm install -g plop
```

2. Inside the directory to apply the templates

```bash
plop --plopfile ../di-ipv-cri-templates/plopfile.mjs --dest .

```

## Options

The following templates are available:

`repo:init`
</br>
Initialises a GitHub repository with the necessary default files and some customisation.

`lambda:new`
</br>
Creates a new Lambda and updates the template file with the necessary CloudFormation resources.

`api:init`
</br>
Initialises a new CRI API CloudFormation template.
