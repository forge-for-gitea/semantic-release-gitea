# Semantic Release plugin for Gitea

## Developing

### Using sandbox

in `project` directory execute
```shell
npm link
```

and in `sandbox` directory execute
```shell
npm i \
    && npm link @forge-for-gitea/semantic-release-gitea \
    && git init \
    && git branch -m main \
    && git remote add origin https://github.com/forge-for-gitea/sandbox-semantic-release.git \
    && git pull origin main \
    && git log 
```
