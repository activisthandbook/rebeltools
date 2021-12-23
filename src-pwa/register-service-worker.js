import { register } from 'register-service-worker'
import { Notify } from 'quasar'

// The ready(), registered(), cached(), updatefound() and updated()
// events passes a ServiceWorkerRegistration instance in their arguments.
// ServiceWorkerRegistration: https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerRegistration

register(process.env.SERVICE_WORKER_FILE, {
  // The registrationOptions object will be passed as the second argument
  // to ServiceWorkerContainer.register()
  // https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerContainer/register#Parameter

  // registrationOptions: { scope: './' },

  ready (/* registration */) {
    // console.log('Service worker is active.')
  },

  registered (/* registration */) {
    // console.log('Service worker has been registered.')
  },

  cached (/* registration */) {
    Notify.create({
      icon: 'mdi-cloud-check',
      message: 'Rebel Tools now works offline.',
      color: 'white',
      textColor: 'black',
      timeout: 1000,
      position: 'bottom-left'
    })
  },

  updatefound (/* registration */) {
    Notify.create({
      icon: 'mdi-cloud-download-outline',
      message: 'Downloading update...',
      color: 'white',
      textColor: 'black',
      timeout: 1000,
      position: 'bottom-left'
    })
  },

  updated (/* registration */) {
    // console.log('New content is available; please refresh.')
    Notify.create({
      icon: 'mdi-shimmer',
      message: "There's a new version of Rebel Tools.",
      color: 'white',
      textColor: 'black',
      timeout: 0,
      position: 'bottom-left',
      actions: [
        { label: 'Update', handler: () => { window.location.reload() } }
      ]
    })
  },

  offline () {
    // console.log('No internet connection found. App is running in offline mode.')
    Notify.create({
      icon: 'mdi-wifi-off',
      message: "You're offline"
    })
  },

  error (/* err */) {
    // console.error('Error during service worker registration:', err)
  }
})
