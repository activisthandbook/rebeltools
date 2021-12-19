# Rebel Tools ([rebel.tools](https://rebel.tools)) 🦋
**[Rebel Tools](https://rebel.tools)** is the all-in-one toolset for progressive movements. To make it as easy as possible for new developers to contribute, we have added elaborate documentation throughout the project.

## Start developing
Follow these instructions to setup the development enviroment on your computer.

### 1. New to web development? 🐣
We believe everyone should be able to contribute to Rebel Tools. That is why we have set up a **[free web development course](https://activisthandbook.org/academy/web-dev)** to teach you the basics of HTML, CSS, Javascript, Vue.js, Quasar and Firebase.

The course is offered by [Activist Handbook](https://activisthandbook.org), the Wikipedia for activists.

### 2. Prerequisites
In this guide, we assume you already have the following installed:
- [VS Code](https://code.visualstudio.com/download)
- [Node.js](https://nodejs.org)
- [Yarn](https://yarnpkg.com/getting-started/install)
- [Git](https://git-scm.com/downloads)
- [GitHub Desktop](https://desktop.github.com)

### 3. Clone the repository
To start, [clone the repository](https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository) to your local device.

### 4. Install the dependencies
To install all dependencies, run this inside your project folder:
```bash
yarn
```

### 5. Start the app in development mode
To start a local development server, run this inside your project folder:
```bash
quasar dev
```

## Host your own instance
Everyone can use [rebel.tools](https://rebel.tools) for free. However, you can also decide to host your own (customised) version.

### 1. Setup a Firebase project
You will need a [Firebase](firebase.google.com) account to host your own instance. There is a free plan available to get started.

*Important steps:*
- [Setup](https://firebase.google.com/docs/web/setup) your Firebase project.
- Make sure to edit the [Firebase configuration](https://firebase.google.com/docs/web/learn-more#config-object) in the `/src/boot/firebase.js` file.

### 2. Customize the app
If you are hosting your own instance, you can change every aspect of the app. We recommend you to start by editing the following files:
- quasar.conf.js ([Learn more](https://v2.quasar.dev/quasar-cli/quasar-conf-js))
- src/css/quasar.variables.scss ([Learn more](https://quasar.dev/style/sass-scss-variables#customizing))
- src/css/app.scss

#### Change logo
You can use the [Quasar Icongenie](https://quasar.dev/icongenie/). Install it by running the following command:
```bash
yarn global add @quasar/icongenie
```
You can add your own customised logo by changing the logo files in the `/src/assets` folder. Then generate the icons by running:
```bash
icongenie generate -i src/assets/logo.png --quality 12
```

To use a customised logo for the smaller browser icon, run:
```bash
icongenie generate -i src/assets/logo-small.png --filter ico --skip-trim --quality 12
```
