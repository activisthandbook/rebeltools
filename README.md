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

### 3. Fork & clone the repository
You will need to fork & clone this repository, to start making edits & sharing them with us.

Never done that before? Don't worry, read this [guide for beginners](https://github.com/firstcontributions/first-contributions/blob/master/gui-tool-tutorials/github-desktop-tutorial.md).

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
Everyone can use [rebel.tools](https://rebel.tools) for free. However, you can also decide to host your it by yourself.

Benefits:
- You can customise any aspect of the app. This is especially useful if you are a large movement with lots of smaller local groups. You can help these smaller groups by hosting your own customised version which they can use.
- You can decide yourself what geographical area to host your Firebase project. This will help your pages load a bit faster.

Drawbacks:
- You will need to pay yourself for any costs incurred by running your own Firebase project. If you are a small movement, these costs will be minimal.
- Hosting your own instance requires more maintainance. You will need to update your instance manually to make use of our latest features.

### 1. Setup a Firebase project
You will need a [Firebase](firebase.google.com) account to host your own instance. There is a free plan available to get started.

*Important steps:*
- [Setup](https://firebase.google.com/docs/web/setup) your Firebase project.
- Make sure to edit the [Firebase configuration](https://firebase.google.com/docs/web/learn-more#config-object) in the `/src/boot/firebase.js` file.

### 2. Deploy
We use automatic deployment whenever our GitHub repository updates. Learn how to [set up automatic deployments](https://firebase.google.com/docs/hosting/github-integration). Add this line to the `firebase-hosting-merge.yml` and `firebase-hosting-pull-request.yml` files:
```yml
- run: yarn install --immutable && yarn global add @quasar/cli && quasar build  -m pwa
```

### 3. Customize the app
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
