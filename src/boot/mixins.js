import { boot } from 'quasar/wrappers'

// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default boot(({ app }) => {
  // something to do
  app.mixin({
    methods: {
      mixin_mergeErrorMessages (errors) {
        let allErrorMessages = ''
        errors.forEach(error => {
          if (allErrorMessages) {
            allErrorMessages = allErrorMessages + ' ' + error.$message
          } else {
            allErrorMessages = error.$message
          }
        })
        return allErrorMessages
      }
    }
  })
})
