<template>
  <h1>Apps</h1>
  <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Impedit alias maxime sint iure inventore corporis quis perferendis fugiat nisi. Sunt esse quod corporis enim magni molestias animi, eum ut. Aliquam!</p>
  <div class="row q-col-gutter-sm">
    <div class="col-4">
      <q-card class="cursor-pointer text-primary text-center q-pt-lg q-pb-md" v-ripple flat bordered>
        <q-icon name="mdi-calendar" size="lg"/>
        <div class="text-bold text-caption">Calendar</div>
      </q-card>
    </div>
    <div class="col-4">
      <q-card class="cursor-pointer text-primary text-center q-pt-lg q-pb-md" v-ripple flat bordered>
          <q-icon name="mdi-account-group" size="lg"/>
          <div class="text-bold text-caption">Community</div>
      </q-card>
    </div>
    <div class="col-4">
      <q-card class="cursor-pointer text-primary text-center q-pt-lg q-pb-md" v-ripple flat bordered>
          <q-icon name="mdi-file-document" size="lg"/>
          <div class="text-bold text-caption">Page</div>
      </q-card>
    </div>
    <div class="col-4">
      <q-card class="cursor-pointer text-primary text-center q-pt-lg q-pb-md" v-ripple flat bordered>
          <q-icon name="mdi-bullhorn-outline" size="lg"/>
          <div class="text-bold text-caption">Campaigns</div>
      </q-card>
    </div>
    <div class="col-4">
      <q-card class="cursor-pointer text-primary text-center q-pt-lg q-pb-md" v-ripple flat bordered>
          <q-icon name="mdi-forum" size="lg">
            <q-badge  color="secondary" text-color="white" floating>4</q-badge>
          </q-icon>
          <div class="text-bold text-caption">Inbox</div>
      </q-card>
    </div>
    <div class="col-4">
      <q-card class="cursor-pointer text-primary text-center q-pt-lg q-pb-md" v-ripple flat bordered>
          <q-icon name="mdi-shield-account" size="lg"/>
          <div class="text-bold text-caption">Admin</div>
      </q-card>
    </div>
  </div>
  <q-card class="cursor-pointer text-primary text-center q-pt-lg q-pb-md q-mt-lg" v-ripple flat bordered>
    <q-icon name="mdi-book-open-page-variant" size="lg"/>
    <div class="text-bold text-caption">Activist Handbook</div>
  </q-card>
</template>
