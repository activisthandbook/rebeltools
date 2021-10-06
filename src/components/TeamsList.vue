<template>
  <div class="row q-col-gutter-sm">
    <div class="col-xs-12 col-sm-6 row items-stretch" v-for="(team, index) in loremIpsum.teams" :key="index">
      <q-card flat bordered class="row items-center full-width cursor-pointer" clickable v-ripple>
          <q-img :src="team.image" :ratio="16/9"/>
          <q-item>
            <q-item-section>
              <q-item-label class="text-bold">{{team.title}}</q-item-label>
              <q-item-label caption>{{ team.description }}</q-item-label>
              <q-item-label caption >
                <q-avatar v-for="(memberPicture, index) in team.memberPictures" :key="index" style="margin-right:-8px;" size="32px">
                  <img :src="memberPicture">
                </q-avatar>
              </q-item-label>
            </q-item-section>
          </q-item>
      </q-card>
    </div>
  </div>
</template>
<script>
export default {
  name: 'people-list',
  props: ['filter'],
  data () {
    return {
      loremIpsum: {
        teams: [
          {
            image: 'https://source.unsplash.com/random?group',
            title: 'Finance circle',
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit repellat numquam odit.',
            memberPictures: ['https://randomuser.me/api/portraits/men/1.jpg', 'https://randomuser.me/api/portraits/women/1.jpg', 'https://randomuser.me/api/portraits/women/3.jpg']
          },
          {
            title: 'Core circle',
            image: 'https://source.unsplash.com/random?community',
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit repellat numquam odit.',
            memberPictures: ['https://randomuser.me/api/portraits/women/2.jpg', 'https://randomuser.me/api/portraits/men/2.jpg']
          }
        ]
      }
    }
  }
}
</script>
