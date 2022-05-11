<template>
  <q-avatar style="margin: 1px" :size="size + 'px'" color="grey-2">
    <q-icon
      name="mdi-account"
      v-if="!profileImage1x || !profileImage2x"
      :size="iconSize + 'px'"
      color="grey-8"
    />
    <img
      :src="profileImage2x"
      :srcset="profileImage1x + ' 1x,' + profileImage2x + ' 2x'"
      no-spinner
      v-else
    />
  </q-avatar>
</template>
<script>
import { getStorage, ref, getDownloadURL } from "firebase/storage";
const storage = getStorage();

export default {
  props: {
    userID: {
      type: String,
    },
    size: {
      type: Number,
      default: 32,
    },
  },
  computed: {
    iconSize: function () {
      return this.size - this.size / 3;
    },
  },
  data() {
    return {
      profileImage1x: "",
      profileImage2x: "",
    };
  },
  mounted() {
    this.$nextTick(function () {
      let size1 = "_32x32";
      let size2 = "_64x64";
      if (this.size == 64) {
        size1 = "_64x64";
        size2 = "_128x128";
      }
      getDownloadURL(ref(storage, "profileImages/" + this.userID + size1))
        .then((url) => {
          this.profileImage1x = url;
          console.log("profileImage1x", url);
        })
        .catch((error) => {
          console.log(error);
        });

      getDownloadURL(ref(storage, "profileImages/" + this.userID + size2))
        .then((url) => {
          this.profileImage2x = url;
        })
        .catch((error) => {
          console.log(error);
        });
    });
  },
};
</script>
