<template>
  <input type="file" accept="image/*" ref="file" style="display: none" @change="processFile($event)">
  <q-banner class="rounded-borders flex"  @dragover="dragover" @dragleave="dragleave" @drop="drop" :class="{ 'bg-grey-4': dropboxActive, 'bg-grey-3': !dropboxActive }">
    <q-avatar color="secondary" text-color="white" size="64px" class="q-mr-md cursor-pointer" @click="$refs.file.click()" v-ripple>
      <q-img v-if="profileImage1x" :src="profileImage2x" :srcset="profileImage1x + ' 1x,' + profileImage2x + ' 2x'" no-spinner :ratio="1"/>
      <q-img :src="fileURL" v-else-if="fileURL" :ratio="1"/>
      <q-icon name="mdi-account" v-else-if="!fileURL"/>
      <q-img :src="fileURL" v-else :ratio="1"/>
    </q-avatar>
    <span v-if="!imageLoading">
      <q-btn icon="mdi-upload" label="Upload picture" no-caps color="white" text-color="secondary" v-if="!fileURL && !profileImage1x" @click="$refs.file.click()"/>
      <q-btn icon="mdi-delete" label="Delete picture" color="grey-4" text-color="black" no-caps unelevated @click="deleteFile()" v-else/>
    </span>
  </q-banner>
</template>
<script>
import { getStorage, ref, uploadBytes, deleteObject, getDownloadURL } from 'firebase/storage'
const storage = getStorage()

export default {
  data () {
    return {
      dialogOpen: false,
      uploadedFile: null, // Store our uploaded file
      fileURL: '',
      dropboxActive: false,
      imageLoading: true,
      profileImage1x: '',
      profileImage2x: ''
    }
  },
  mounted () {
    this.$nextTick(function () {
      getDownloadURL(ref(storage, 'profileImages/' + this.$store.state.auth.data.uid + '_64x64'))
        .then((url) => {
          this.profileImage1x = url
          this.imageLoading = false
        })
        .catch((error) => {
          console.log(error)
          this.imageLoading = false
        })

      getDownloadURL(ref(storage, 'profileImages/' + this.$store.state.auth.data.uid + '_128x128'))
        .then((url) => {
          this.profileImage2x = url
        })
        .catch((error) => {
          console.log(error)
        })
    })
  },
  methods: {
    dragover (event) {
      event.preventDefault()
      // Add some visual fluff to show the user can drop its files
      this.dropboxActive = true
    },
    dragleave (event) {
      // Clean up
      this.dropboxActive = false
    },
    processFile (event) {
      const file = event.target.files[0]
      if (this.validateFileType(file) && this.validateFileSize(file)) {
        this.uploadedFile = event.target.files[0]
        this.fileURL = URL.createObjectURL(this.uploadedFile)
        this.uploadFile()
        this.profileImage1x = ''
        this.profileImage2x = ''
      }
    },
    drop (event) {
      event.preventDefault()
      const file = event.dataTransfer.files[0]
      if (this.validateFileType(file) && this.validateFileSize(file)) {
        this.uploadedFile = file
        this.fileURL = URL.createObjectURL(this.uploadedFile)
        this.uploadFile()
        this.profileImage1x = ''
        this.profileImage2x = ''
      }
      // if(event.dataTransfer.files[0].type === '')

      this.dropboxActive = false
    },
    deleteFile () {
      this.uploadedFile = null
      this.fileURL = ''
      this.profileImage1x = ''
      this.profileImage2x = ''

      const storageRef32 = ref(storage, 'profileImages/' + this.$store.state.auth.data.uid + '_32x32')
      const storageRef64 = ref(storage, 'profileImages/' + this.$store.state.auth.data.uid + '_64x64')
      const storageRef128 = ref(storage, 'profileImages/' + this.$store.state.auth.data.uid + '_128x128')

      deleteObject(storageRef32)
      deleteObject(storageRef64)
      deleteObject(storageRef128)
    },
    validateFileType (file) {
      if (
        file.type === 'image/png' ||
        file.type === 'image/jpeg' ||
        file.type === 'image/webp'
      ) {
        return true
      } else {
        this.$q.notify({
          message: 'Only PNG, JPEG and WebP supported',
          icon: 'mdi-alert'
        })
        return false
      }
    },
    validateFileSize (file) {
      if (file.size < 5000000) {
        return true
      } else {
        this.$q.notify({
          message: 'Image too large (max 5MB)',
          icon: 'mdi-alert'
        })
      }
    },
    uploadFile () {
      const storageRef = ref(storage, 'profileImages/' + this.$store.state.auth.data.uid)

      this.uploadLoading = true

      // 'file' comes from the Blob or File API
      uploadBytes(storageRef, this.uploadedFile).then((snapshot) => {
        this.$q.notify({
          message: 'Picture uploaded',
          icon: 'mdi-check'
        })
        this.uploadLoading = false
      }).catch(error => {
        this.$q.notify({
          message: error + ' (ProfilePictureUploader.vue)',
          icon: 'mdi-alert'
        })
      })
    }
  }
}
</script>
