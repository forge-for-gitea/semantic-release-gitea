# Semantic Release plugin for Gitea

## Developing

### Creating sandbox

> NOTE: For development, you will need to create a sandbox for convenient development and debugging of the written code. 
> In your Gitea instance, create a repository and obtain a token to access the repository (with read and write permissions).

In `project` directory execute
> NOTE: Executing this command will create a symlink, allowing you to use the package in the sandbox.
```shell
npm link
```

In `sandbox` directory execute

```shell
git init && git config --local credential.helper 'cache --timeout=3600' && git branch -m main
```
```shell
git remote add origin <url>
```
```shell
git pull origin main
```
```shell
cat << EOF > package.json
{
  "devDependencies": {
    "semantic-release": "^24.2.8",
    "@forge-for-gitea/semantic-release-gitea": "^1.1.0"
  }
}
EOF
```
```shell
  npm i \
  && npm link @forge-for-gitea/semantic-release-gitea
```
```shell
cat << EOF > .releaserc.yaml
plugins:
  - "@semantic-release/commit-analyzer"
  - "@semantic-release/release-notes-generator"
  - "@forge-for-gitea/semantic-release-gitea"
EOF
```
```shell
cat << EOF > .env
GITEA_TOKEN=" -- CHANGE ME -- "
GITEA_URL="https://gitea-instance.example.com"
EOF
```

running:
```shell
npx semantic-release --dry-run --debug
```
