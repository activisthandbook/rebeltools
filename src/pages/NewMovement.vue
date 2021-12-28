<!--
PAGE: NEW MOVEMENT 🌊
On this page, users can create a new movement.

Path: /new-movement
 -->
<template>
  <h1 class="q-mb-md">New movement</h1>
  <q-stepper
    v-model="step"
    vertical
    animated
    header-nav
  >
    <!-- 1️⃣ STEP 1: PAGE DETAILS -->
    <q-step
      :name="1"
      title="Page details"
      icon="mdi-bullhorn-outline"
      active-icon="mdi-bullhorn-outline"
      :done="step > 1"
    >
      <div class="q-gutter-y-sm">

        <div class="text-bold">What do you want to call your movement?</div>

        <input-name
          v-model="newMovement.name"
          :error="this.v$.newMovement.name.$error"
          :errorMessage="mixin_mergeErrorMessages(this.v$.newMovement.name.$errors)"
          @blur="blurMovementNameInput()"
        />

        <input-path
          v-model="newMovement.path"
          :error="this.v$.newMovement.path.$error"
          :errorMessage="mixin_mergeErrorMessages(this.v$.newMovement.path.$errors)"
        />

        <!-- ADVANCED MOVEMENT DETAILS -->
        <transition v-show="advanced" enter-active-class="animated fadeIn">
          <div v-show="advanced" class="q-gutter-y-sm">
            <input-headline
              v-model="newMovement.headline"
              :error="this.v$.newMovement.headline.$error"
              :errorMessage="mixin_mergeErrorMessages(this.v$.newMovement.headline.$errors)"
            />

            <input-description
              v-model="newMovement.description"
              :error="this.v$.newMovement.description.$error"
              :errorMessage="mixin_mergeErrorMessages(this.v$.newMovement.description.$errors)"
            />

          </div>
        </transition>

      </div>

      <q-stepper-navigation class="flex justify-between items-center q-gutter-sm">
        <q-btn @click="step = 2" color="primary" label="Continue" icon-right="mdi-arrow-right" no-caps :disable="this.v$.newMovement.name.$invalid || this.v$.newMovement.path.$invalid"/>
        <q-btn label="Advanced settings" no-caps flat class="bg-grey-3" size="sm" @click="advanced = !advanced" :ripple="false"/>
      </q-stepper-navigation>
    </q-step>

    <!-- 2️⃣ STEP 2: CUSTOMISE DESIGN -->
    <q-step
      :name="2"
      :done="step > 2"
      title="Customise design"
      icon="mdi-palette"
      active-icon="mdi-palette"
      :disable="this.v$.newMovement.name.$invalid || this.v$.newMovement.path.$invalid"
    >
      <div class="q-gutter-y-sm">
        <div class="text-bold">Make look your own.</div>
        <input-color
          label="1️⃣ Primary color"
          v-model="newMovement.primaryColor"
          :error="this.v$.newMovement.primaryColor.$error"
          :errorMessage="mixin_mergeErrorMessages(this.v$.newMovement.primaryColor.$errors)"
        />
        <input-color
          label="2️⃣ Secondary color"
          v-model="newMovement.secondaryColor"
          :error="this.v$.newMovement.secondaryColor.$error"
          :errorMessage="mixin_mergeErrorMessages(this.v$.newMovement.secondaryColor.$errors)"
        />
      </div>

      <q-stepper-navigation class="q-gutter-sm">

        <!-- IF NOT SIGNED IN, CONTINUE TO NEXT STEP -->
        <q-btn label="Continue" icon-right="mdi-arrow-right" color="primary" no-caps @click="step = 3" v-if="$store.state.auth.user && !$store.state.auth.user.emailVerified"/>

        <!-- IF SIGNED IN, SHOW CREATE BUTTON -->
        <q-btn
          color="primary"
          label="Create movement"
          icon-right="mdi-arrow-right-circle"
          no-caps
          @click="createMovement()"
          :loading="loading"
          :disable="this.v$.newMovement.name.$invalid || this.v$.newMovement.path.$invalid || this.v$.newMovement.primaryColor.$invalid || this.v$.newMovement.secondaryColor.$invalid"
          v-if="$store.state.auth.user && $store.state.auth.user.emailVerified"
        />

      </q-stepper-navigation>
    </q-step>

    <!-- 3️⃣ STEP 3: AUTHENTICATION
    This step is only visible to users that are not signed in.
    -->
    <q-step
      v-if="$store.state.auth.user && !$store.state.auth.user.emailVerified"
      :name="3"
      title="Get started"
      icon="mdi-account"
      active-icon="mdi-account"
      :disable="!newMovement.name || !newMovement.path || !newMovement.primaryColor || !newMovement.secondaryColor"
    >
      <div class="q-gutter-y-sm">
        <div>Almost there! Register or sign in to Rebel Tools to get started.</div>

        <smart-action title="Create movement" :description="'Fill in your email address, and start mobilising people for ' + newMovement.name + '.'"/>

        <div class="text-bold">
          <div class="text-caption">Rebel Tools is built for activists, by activists.</div>
          <q-chip icon="mdi-currency-usd-off" label="Forever free" color="secondary" text-color="white" size="sm"/>
          <q-chip icon="mdi-github" label="Open source" color="secondary" text-color="white" size="sm"/>
          <q-chip icon="mdi-lightning-bolt" label="Powerful tools, easy to use" color="secondary" text-color="white" size="sm"/>
        </div>

      </div>

    </q-step>
  </q-stepper>
</template>
<script>
import { setCssVar } from 'quasar'

import useVuelidate from '@vuelidate/core'

// COMPONENTS
import InputName from '../components/inputs/MovementName'
import InputPath from '../components/inputs/MovementPath'
import InputHeadline from '../components/inputs/MovementHeadline'
import InputDescription from '../components/inputs/MovementDescription'
import InputColor from '../components/inputs/MovementColor'
import SmartAction from '../components/SmartAction'

export default {
  setup () {
    return { v$: useVuelidate() }
  },
  validations () {
    return {
      newMovement: this.$store.state.currentMovement.validations
    }
  },
  components: {
    InputName,
    InputPath,
    InputHeadline,
    InputDescription,
    InputColor,
    SmartAction
  },
  data () {
    return {
      step: 1,
      advanced: false,
      loading: false,
      newMovement: {
        name: '',
        path: '',
        primaryColor: '#0431EA',
        secondaryColor: '#D70057',
        admins: null,
        headline: '',
        description: '',
        primaryAction: {
          title: 'Join us',
          description: "We'd love to get to know you."
        }
      }
    }
  },
  watch: {
    newMovement: {
      handler (newMovement) {
        setCssVar('primary', newMovement.primaryColor)
        setCssVar('secondary', newMovement.secondaryColor)
      },
      deep: true
    }
  },
  methods: {
    blurMovementNameInput () {
      this.newMovement.path = this.newMovement.name.toLowerCase().replace(/[^a-z,.]+/g, '')
    },
    async createMovement () {
      this.loading = true
      this.newMovement.admins = [this.$store.state.auth.user.uid]

      if (!this.newMovement.headline) {
        this.newMovement.headline = "We're awesome rebels"
      }
      if (!this.newMovement.description) {
        this.newMovement.description = "And we're here to change the world. You should most definitely join us."
      }

      await this.$store.dispatch('currentMovement/addToDatabase', this.newMovement).then(() => {
        this.loading = false
        this.$router.push('/' + this.newMovement.path)
      })
    }
  }
}
</script>
