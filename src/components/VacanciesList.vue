<template>
  <q-banner class="bg-grey-3 text-grey-9">
    <template v-slot:avatar>
      <q-icon name="mdi-star-shooting-outline" color="grey"/>
    </template>
    Coming soon
  </q-banner>
  <!-- <div class="row q-col-gutter-sm">
    <div class="col-xs-12 col-sm-6 row items-stretch" v-for="(role, index) in loremIpsum.roles" :key="index">
      <q-card flat bordered class="row items-center full-width cursor-pointer" clickable v-ripple>
          <q-img :src="role.image" :ratio="16/9"/>
          <q-item>
            <q-item-section>
              <q-item-label class="text-bold">{{role.title}}</q-item-label>
              <q-item-label caption class="text-italic">{{ role.time }} - {{ role.location }}</q-item-label>
              <q-item-label caption>{{ role.description }}</q-item-label>
              <q-item-label caption><q-chip size="sm" v-for="(team, index) in role.teams" :key="index">{{team}}</q-chip></q-item-label>
            </q-item-section>
          </q-item>
      </q-card>
    </div>
  </div> -->
</template>
<script>
export default {
  name: 'people-list',
  props: ['filter'],
  data () {
    return {
      loremIpsum: {
        roles: [
          {
            image: 'https://source.unsplash.com/random?group',
            title: 'Finance coordinator',
            time: '8 hours per week',
            location: 'Online',
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit repellat numquam odit.',
            teams: ['Finance circle', 'Core circle']
          },
          {
            title: 'Communications coordinator',
            image: 'https://source.unsplash.com/random?community',
            time: '8 hours per week',
            location: 'Online',
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit repellat numquam odit.',
            teams: ['Communications circle', 'Core circle']
          }
        ]
      }
    }
  }
}
</script>
