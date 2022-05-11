<template>
  <q-header bordered class="bg-primary text-white">
    <q-toolbar>
      <q-toolbar-title>Page</q-toolbar-title>
      <q-btn
        icon="mdi-eye"
        label="View page"
        no-caps
        color="white"
        text-color="black"
        :to="{ name: 'Movement' }"
      />
    </q-toolbar>
  </q-header>
  <q-page-container>
    <q-page padding>
      <div class="q-gutter-y-md">
        <q-card>
          <q-card-section>
            <p class="text-bold">Landing page</p>
            <div class="q-gutter-sm">
              <input-headline
                v-model="headline"
                :error="this.v$.headline.$error"
                :errorMessage="
                  mixin_mergeErrorMessages(this.v$.headline.$errors)
                "
                @blur="save()"
              />

              <input-description
                v-model="description"
                :error="this.v$.description.$error"
                :errorMessage="
                  mixin_mergeErrorMessages(this.v$.description.$errors)
                "
                @blur="save()"
              />

              <input-color
                label="1️⃣ Primary color"
                v-model="primaryColor"
                :error="this.v$.primaryColor.$error"
                :errorMessage="
                  mixin_mergeErrorMessages(this.v$.primaryColor.$errors)
                "
                @blur="save()"
              />
              <input-color
                label="2️⃣ Secondary color"
                v-model="secondaryColor"
                :error="this.v$.secondaryColor.$error"
                :errorMessage="
                  mixin_mergeErrorMessages(this.v$.secondaryColor.$errors)
                "
                @blur="save()"
              />
            </div>
          </q-card-section>
        </q-card>
        <q-card>
          <q-card-section>
            <div class="q-gutter-sm">
              <p class="text-bold">Movement settings</p>
              <input-name
                v-model="name"
                :error="this.v$.name.$error"
                :errorMessage="mixin_mergeErrorMessages(this.v$.name.$errors)"
                @blur="save()"
              />

              <input-path
                v-model="path"
                :error="this.v$.path.$error"
                :errorMessage="mixin_mergeErrorMessages(this.v$.path.$errors)"
                @blur="save()"
                disable
              />
              <div class="text-caption">
                Warning: if you change the URL path, existing links to your page
                will stop working!
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>
    </q-page>
  </q-page-container>
</template>
<script>
import useVuelidate from "@vuelidate/core";

// COMPONENTS
import InputName from "components/inputs/MovementName";
import InputPath from "components/inputs/MovementPath";
import InputHeadline from "components/inputs/MovementHeadline";
import InputDescription from "components/inputs/MovementDescription";
import InputColor from "components/inputs/MovementColor";

export default {
  setup() {
    return { v$: useVuelidate() };
  },
  components: {
    InputName,
    InputPath,
    InputHeadline,
    InputDescription,
    InputColor,
  },
  computed: {
    name: {
      get() {
        return this.$store.state.currentMovement.data.name;
      },
      set(value) {
        this.$store.commit("currentMovement/update", { name: value });
      },
    },
    path: {
      get() {
        return this.$store.state.currentMovement.data.path;
      },
      set(value) {
        this.$store.commit("currentMovement/update", { path: value });
      },
    },
    headline: {
      get() {
        return this.$store.state.currentMovement.data.headline;
      },
      set(value) {
        this.$store.commit("currentMovement/update", { headline: value });
      },
    },
    description: {
      get() {
        return this.$store.state.currentMovement.data.description;
      },
      set(value) {
        this.$store.commit("currentMovement/update", { description: value });
      },
    },
    primaryColor: {
      get() {
        return this.$store.state.currentMovement.data.primaryColor;
      },
      set(value) {
        this.$store.commit("currentMovement/update", { primaryColor: value });
      },
    },
    secondaryColor: {
      get() {
        return this.$store.state.currentMovement.data.secondaryColor;
      },
      set(value) {
        this.$store.commit("currentMovement/update", { secondaryColor: value });
      },
    },
  },
  validations() {
    return this.$store.state.currentMovement.validations;
  },
  methods: {
    save() {
      if (!this.v$.$invalid) {
        this.$store.dispatch("currentMovement/pushToDatabase");
      }
    },
  },
};
</script>
