# Rebel Tools (rebeltools) 🦋
Rebel Tools is the all-in-one toolset for progressive movements. To make it as easy as possible for new developers to contribute, we have added elaborate documentation throughout the project.

## Start developing
Follow these instructions to setup the development enviroment on your computer.

### Prerequisites
In this guide, we assume you already have the following installed:
- [VS Code](https://code.visualstudio.com/download)
- [Node.js](https://nodejs.org)
- [Yarn](https://yarnpkg.com/getting-started/install)
- [Git](https://git-scm.com/downloads)
- [GitHub Desktop](https://desktop.github.com)

### Clone the repository
To start, [clone the repository](https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository) to your local device.

### Install the dependencies
To install all dependencies, run this inside your project folder:
```bash
yarn
```

### Start the app in development mode
To start a local development server, run this inside your project folder:
```bash
quasar dev
```

## Host your own instance
Everyone can use [rebel.tools](https://rebel.tools) for free. However, you can also decide to host your own (customised) version.

### Requirements
You will need a Firebase account to host your own instance.

### Customize the configuration
If you are hosting your own instance, you can change every aspect of the app. We recommend you to start by editing the following files:
- [quasar.conf.js](https://v2.quasar.dev/quasar-cli/quasar-conf-js)
- [src/css/quasar.variables.scss](https://quasar.dev/style/sass-scss-variables#customizing)
- src/css/app.scss
