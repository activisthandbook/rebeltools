<template>
  <q-header bordered class="bg-primary text-white">
    <q-toolbar>
      <q-toolbar-title>Community</q-toolbar-title>
    </q-toolbar>
  </q-header>
  <q-card>
    <q-card-section v-if="!members[0]">
      Nobody has signed up for your movement yet!
    </q-card-section>
    <q-list separator>
      <q-item v-for="(member, index) in members" :key="index">
        <q-item-section>
          <q-item-label>{{ member.firstName }} {{ member.lastName }}</q-item-label>
          <q-item-label caption>{{ member.emailAddress }}</q-item-label>
          <q-item-label caption>{{ member.phoneNumber }}</q-item-label>
          <q-item-label caption>{{ member }}</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
  </q-card>
  <!-- <q-card class="text-bold">
    <q-list>
      <q-item clickable v-ripple :to="{name:'Vacant roles'}">
        <q-item-section avatar>
          <q-icon name="mdi-account-group" />
        </q-item-section>
        <q-item-section>
          People
        </q-item-section>
        <q-item-section side>
          <q-icon name="mdi-arrow-right" />
        </q-item-section>
      </q-item>
      <q-item clickable v-ripple :to="{name:'Vacant roles'}">
        <q-item-section avatar>
          <q-icon name="mdi-lightning-bolt" />
        </q-item-section>
        <q-item-section>
          Roles
        </q-item-section>
        <q-item-section side>
          <q-icon name="mdi-arrow-right" />
        </q-item-section>
      </q-item>
      <q-item clickable v-ripple :to="{name:'Our teams'}">
        <q-item-section avatar>
          <q-icon name="mdi-account-supervisor-circle" />
        </q-item-section>
        <q-item-section>
          Teams
        </q-item-section>
        <q-item-section side>
          <q-icon name="mdi-arrow-right" />
        </q-item-section>
      </q-item>
      <q-item clickable v-ripple :to="{name:'Partners'}">
        <q-item-section avatar>
          <q-icon name="mdi-heart" />
        </q-item-section>
        <q-item-section>
          Partners
        </q-item-section>
        <q-item-section side>
          <q-icon name="mdi-arrow-right" />
        </q-item-section>
      </q-item>
    </q-list>
  </q-card>

  <div class="row q-col-gutter-md q-mt-sm">
    <h2 class="col-12">Statistics</h2>
    <div class="col-xs-12 col-sm-6 text-center">
      <q-card>
        <q-card-section class="q-pt-lg">
          <h3 class="q-mb-sm">Members</h3>
          <div class="text-bold">
            <q-chip size="24px">345</q-chip>
         </div>
        </q-card-section>
        <q-separator/>
        <q-card-section class="row justify-around">
          <div>
            <q-chip icon="mdi-account-plus" class="text-bold" color="primary" dark size="16px">12</q-chip>
            <div class="text-caption">New this month</div>
          </div>
          <q-separator vertical/>
          <div>
            <q-chip icon="mdi-check-all" class="text-bold" color="primary" dark size="16px">187</q-chip>
            <div class="text-caption">Active</div>
          </div>
        </q-card-section>
      </q-card>
    </div>

    <div class="col-xs-12 col-sm-6 text-center">
      <q-card>
        <q-card-section class="q-pt-lg">
          <h3 class="q-mb-sm">Event signups</h3>
          <div class="text-bold">
            <q-chip size="24px">422</q-chip>
         </div>
        </q-card-section>
        <q-separator/>
        <q-card-section class="row justify-around">
          <div>
            <q-chip icon="mdi-history" class="text-bold" color="primary" dark size="16px">24</q-chip>
            <div class="text-caption">Last month</div>
          </div>
          <q-separator vertical/>
          <div>
            <q-chip icon="mdi-calendar-check" class="text-bold" color="primary" dark size="16px">32</q-chip>
            <div class="text-caption">Upcoming events</div>
          </div>
        </q-card-section>
      </q-card>
    </div>

    <div class="col-xs-12 col-sm-6 text-center">
      <q-card>
        <q-card-section class="q-pt-lg">
          <h3 class="q-mb-sm">Volunteers</h3>
          <div class="text-bold">
            <q-chip size="24px">32</q-chip>
         </div>
        </q-card-section>
        <q-separator/>
        <q-card-section class="row justify-around">
          <div>
            <q-chip icon="mdi-plus-circle" class="text-bold" color="primary" dark size="16px">24</q-chip>
            <div class="text-caption">New applicants</div>
          </div>
        </q-card-section>
      </q-card>
    </div>

    <div class="col-xs-12 col-sm-6 text-center">
      <q-card>
        <q-card-section class="q-pt-lg">
          <h3 class="q-mb-sm">Partners</h3>
          <div class="text-bold">
            <q-chip size="24px">3</q-chip>
         </div>
        </q-card-section>
        <q-separator/>
        <q-card-section class="row justify-around">
          <div>
            <q-chip icon="mdi-plus-circle" class="text-bold" color="primary" dark size="16px">1</q-chip>
            <div class="text-caption">New applicants</div>
          </div>
        </q-card-section>
      </q-card>
    </div>

  </div> -->

</template>
<script>
import { query, onSnapshot, getFirestore, collection } from 'firebase/firestore'
const db = getFirestore()

export default {
  data () {
    return {
      members: []
    }
  },
  mounted () {
    this.$nextTick(function () {
      this.fetchMembersFromDatabase()
    })
  },
  methods: {
    fetchMembersFromDatabase () {
      const memberProfilesRef = collection(db, 'movements', this.$store.state.currentMovement.data.id, 'members')
      const q = query(memberProfilesRef)

      const memberList = []

      onSnapshot(q, (querySnapshot) => {
        querySnapshot.forEach((doc) => {
          memberList.push(doc.data())
        })
        this.members = memberList
      })
    }
  }
}
</script>
