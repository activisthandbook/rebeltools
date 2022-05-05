<template>
  <q-avatar style="margin: 1px" :size="size">
    <q-icon name="mdi-account" v-if="!profileImage2x" :size="size" />
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
  props: ["userID", "size"],
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
      if (this.size == "64px") {
        size1 = "_64x64";
        size2 = "_128x128";
      }
      getDownloadURL(ref(storage, "profileImages/" + this.userID + size1))
        .then((url) => {
          this.profileImage1x = url;
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
