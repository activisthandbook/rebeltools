<template>
  <q-banner class="bg-grey-3 text-grey-9">
    <template v-slot:avatar>
      <q-icon name="mdi-star-shooting-outline" color="grey"/>
    </template>
    Coming soon
  </q-banner>
  <!-- <div class="row q-col-gutter-sm">
    <div class="col-xs-12 col-sm-6 row items-stretch" v-for="(person, index) in loremIpsum.people" :key="index">
      <q-card flat bordered class="row items-center full-width">
          <q-item>
            <q-item-section avatar>
              <q-avatar rounded size="72px"><img :src="person.picture"/></q-avatar>
            </q-item-section>
            <q-item-section>
              <q-item-label class="text-bold">{{person.name}}</q-item-label>
              <q-item-label caption>Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit repellat numquam odit.</q-item-label>
              <q-item-label caption>
                <q-chip size="sm">{{person.role}}
                  <q-tooltip :delay="1000" :offset="[0, 10]">Quasar Rulz!</q-tooltip>
                </q-chip>
              </q-item-label>
            </q-item-section>
          </q-item>
      </q-card>
    </div>
  </div> -->
</template>
<script>
export default {
  name: 'people-list',
  data () {
    return {
      loremIpsum: {
        people: [
          {
            name: 'Greta Thunberg',
            role: 'Movement mobiliser',
            picture: 'https://randomuser.me/api/portraits/lego/1.jpg'
          },
          {
            name: 'Sophie Rebel',
            role: 'Outreach',
            picture: 'https://randomuser.me/api/portraits/lego/2.jpg'
          },
          {
            name: 'Steve Jobless',
            role: 'Finance & fundraising',
            picture: 'https://randomuser.me/api/portraits/lego/4.jpg'
          },
          {
            name: 'Ray Sunshine',
            role: 'Wellbeing',
            picture: 'https://randomuser.me/api/portraits/lego/5.jpg'
          },
          {
            name: 'Thor Butterfly',
            role: 'Coordinator political circle',
            picture: 'https://randomuser.me/api/portraits/lego/6.jpg'
          }
        ]
      }
    }
  }
}
</script>
