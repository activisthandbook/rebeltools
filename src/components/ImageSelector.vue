<template>
  <q-card>
    <q-card-section>
      <div class="q-gutter-y-sm">
        <div class="text-bold">Visuals</div>
        <q-item clickable class="q-pa-none rounded-borders" @dragover="dragover" @dragleave="dragleave" @drop="drop" @click="dialogOpen = true" :class="{ 'bg-grey-4': dropboxActive, 'bg-grey-3': !dropboxActive }">
          <input type="file" id="assetsFieldHandle" @change="onChange" ref="fileInput" accept="image/*" class="absolute invisible"/>
          <q-img :ratio="16/9">

          <q-chip class="q-ma-lg" icon="mdi-image" color="white" text-color="black">Select image</q-chip>

          </q-img>
        </q-item>
      </div>
    </q-card-section>
  </q-card>
  <!-- UPLOAD OVERLAY -->
  <!-- <div class="fullscreen" :class="{ 'bg-grey-4': dropboxActive, 'invisible': !dropboxActive }" @dragover="dragover" @dragleave="dragleave" @drop="drop"> -->

  <!-- </div> -->
  <q-dialog v-model="dialogOpen" :maximized="$q.screen.lt.sm" persistent @dragover="dragover" @dragleave="dragleave" @drop="drop">
    <q-layout view="hHh lpR fFf" container class="bg-white" style="max-width:640px;">
      <q-header class="bg-white text-black" bordered>
        <q-toolbar>
          <q-btn flat v-close-popup round dense icon="mdi-close" />
          <q-toolbar-title>Image selector</q-toolbar-title>
          <q-btn no-caps v-close-popup label="Save" color="secondary" v-if="fileURL"/>
          <q-btn label="Upload" no-caps color="secondary" icon="mdi-upload" v-if="!fileURL"/>
        </q-toolbar>
      </q-header>

      <q-page-container>
        <q-page padding v-if="!fileURL">
          <div class="q-gutter-y-sm">

            <!-- PEXELS SEARCH & UPLOAD BUTTON -->
            <q-input type="search" label="🔍 Search pictures" outlined color="secondary" v-model="searchQuery" @keyup.enter="searchPexels()">
              <template v-slot:append>
                <!-- <q-btn label="Upload" no-caps color="secondary" icon="mdi-upload" /> -->
              </template>
            </q-input>

            <div class="text-caption">Search photos from <a href="https://www.pexels.com">Pexels</a></div>

            <!-- RESULTS NATIGATION -->
            <div class="flex items-center justify-between q-gutter-sm direction-links" v-if="searchResults && !emptySearch">
              <span class="text-caption">{{ searchResults.total_results }} results</span>
              <q-pagination
                v-model="resultsPage"
                :max="Math.round(searchResults.total_results / 21)"
                :max-pages="6"
                boundary-numbers
                color="secondary"
              />
            </div>

            <!-- SEARCH RESULTS -->
            <div v-if="searchResults && !resultsLoading && !emptySearch" class="row q-col-gutter-xs">
              <div class="col-6 col-sm-4" v-for="photo in searchResults.photos" :key="photo.id" >
                <q-img :src="photo.src.tiny" :ratio="16/9" no-spinner :style="'background-color:' + photo.avg_color" @click="selectPexelsPhoto(photo.id)" class="cursor-pointer"/>
              </div>
            </div>

            <div v-if="defaultCollection && (!searchResults || emptySearch) && !resultsLoading">

              <!-- ACTIVIST HANDBOOK GUIDES -->
              <activist-handbook
                title="Find the right photo"
                description="Use authentic photos and show what you are fighting for. For example, show how the climate crisis impacts people's lives. More tips & tricks here:"
                campaign="photo_selector"
                :articles="[
                  {title: 'Taking photos', link: 'https://www.activisthandbook.org/en/communication/photos'},
                  {title: 'Visual identity', link: 'https://www.activisthandbook.org/en/communication/visual-identity'},
                  {title: 'Free image libraries', link: 'https://www.activisthandbook.org/en/tools/photo-video'}
                ]"
              />

              <!-- DEFAULT IMAGE SUGGESTIONS -->
              <div class="row q-col-gutter-xs q-mt-sm">
                <div class="col-6 col-sm-4" v-for="photo in defaultCollection.media" :key="photo.id" >
                  <q-img :src="photo.src.tiny" :ratio="16/9" no-spinner :style="'background-color:' + photo.avg_color" @click="selectPexelsPhoto(photo.id)" class="cursor-pointer"/>
                </div>
              </div>

            </div>

            <!-- RESULTS LOADING -->
            <div v-if="resultsLoading" class="text-center q-my-xl q-py-xl">
              <q-spinner
                color="grey"
                size="3em"
              />
            </div>

          </div>
        </q-page>

        <!-- PREVIEW -->
        <q-page padding v-else>
          <q-input type="textarea" autogrow label="Describe this image" color="secondary" outlined hint="Important for people using screen readers"/>
          <q-img :src="fileURL" :ratio="16/9" class="q-my-md" :style="'background-color: ' + fileAvgColor"/>
          <div class="text-center">
            <q-btn icon="mdi-delete" color="black" label="Delete" outline @click="deleteFile()"/>
          </div>
        </q-page>
      </q-page-container>

      <!-- <q-footer class="bg-white text-black" v-if="!uploadedFile">
        <q-toolbar>
          <div class="text-caption">Photos from <a href="https://www.pexels.com">Pexels</a></div>
        </q-toolbar>
      </q-footer> -->
    </q-layout>
  </q-dialog>
</template>
<script>
import ActivistHandbook from 'components/ActivistHandbook'

// SELF-HOSTING CONFIG: When hosting yourself, make sure to edit this configuration
const PexelsAuth = '563492ad6f9170000100000190a4e6732b3c43a3a2d9009518c8f26e'

export default {
  components: { ActivistHandbook },
  data () {
    return {
      dialogOpen: false,
      uploadedFile: null, // Store our uploaded file
      fileURL: '',
      fileAvgColor: '#eee',
      dropboxActive: false,
      defaultCollection: null,
      emptySearch: true,
      searchQuery: '',
      resultsLoading: false,
      searchResults: null,
      resultsPage: 1
    }
  },
  mounted () {
    this.fetchDefaultCollection()
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
    drop (event) {
      event.preventDefault()
      this.uploadedFile = event.dataTransfer.files[0]
      this.fileURL = URL.createObjectURL(this.uploadedFile)

      // console.log(event.dataTransfer.files)

      this.dropboxActive = false
      this.dialogOpen = true

      // const preview = this.$refs.preview
    },
    deleteFile () {
      this.uploadedFile = null
      this.fileURL = ''
    },
    fetchDefaultCollection () {
      this.resultsLoading = true

      // The number of images in this collection divided by 3: https://www.pexels.com/collections/rebel-tools-m9bgkg2/
      const randomPage = Math.floor(Math.random() * (82 / 21)) + 1
      const url = 'https://api.pexels.com/v1/collections/m9bgkg2?per_page=21&page=' + randomPage

      fetch(url, {
        headers: {
          Authorization: PexelsAuth
        }
      }).then(resp => {
        return resp.json()
      }).then(data => {
        this.defaultCollection = data
        this.resultsLoading = false
      })
    },
    searchPexels () {
      this.resultsLoading = true
      this.emptySearch = false
      fetch('https://api.pexels.com/v1/search?per_page=21&page=' + this.resultsPage + '&query=' + this.searchQuery, {
        headers: {
          Authorization: PexelsAuth
        }
      }).then(resp => {
        return resp.json()
      }).then(data => {
        this.searchResults = data
        this.resultsLoading = false
      })
    },
    selectPexelsPhoto (id) {
      this.resultsLoading = true

      fetch('https://api.pexels.com/v1/photos/' + id, {
        headers: {
          Authorization: PexelsAuth
        }
      }).then(resp => {
        return resp.json()
      }).then(data => {
        console.log(data)
        this.fileURL = data.src.large
        this.fileAvgColor = data.avg_color
        console.log(this.fileAvgColor)
        this.resultsLoading = false
      })
    }
  },
  watch: {
    // whenever question changes, this function will run
    resultsPage: function () {
      this.searchPexels()
    },
    searchQuery: function (newVal) {
      if (!newVal) {
        this.emptySearch = true
      }
    }
  }
}
</script>
