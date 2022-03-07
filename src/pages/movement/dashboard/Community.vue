<template>
  <q-header bordered class="bg-primary text-white">
    <q-toolbar>
      <q-toolbar-title>Community</q-toolbar-title>
      <q-btn icon="mdi-plus" label="Add rebel" no-caps color="white" text-color="black" disable/>
    </q-toolbar>
  </q-header>
  <div class="q-gutter-y-md">
    <div class="row q-col-gutter-md q-mt-sm">
      <div class="col-xs-12 col-sm-6 text-center">
        <q-card>
          <q-card-section class="q-pt-lg">
            <h3 class="q-mb-sm">Rebels</h3>
            <div class="text-bold">
              <q-chip size="32px">{{ $store.state.currentMovement.data.signupCount }}</q-chip>
            </div>
            <div>
              <q-chip icon="mdi-account-plus" class="text-bold" color="secondary" dark size="16px" disable>X</q-chip>
              <div class="text-caption">New rebels</div>
            </div>
          </q-card-section>
          <q-separator/>
          <q-card-section>
            <q-btn label="Smart suggestions" icon="mdi-shimmer" class="full-width" no-caps color="secondary" disable/>
          </q-card-section>
        </q-card>
      </div>

      <!-- <div class="col-xs-12 col-sm-6 text-center">
        <q-card class="light-dimmed">
          <q-card-section class="q-pt-lg">
            <h3 class="q-mb-sm">Sign-ups</h3>
            <div class="text-bold">
              <q-chip size="24px">X</q-chip>
          </div>
          </q-card-section>
          <q-separator/>
          <q-card-section class="row justify-around">
            <div>
              <q-chip icon="mdi-history" class="text-bold" color="primary" dark size="16px">X</q-chip>
              <div class="text-caption">Last month</div>
            </div>
            <q-separator vertical/>
            <div>
              <q-chip icon="mdi-calendar-check" class="text-bold" color="primary" dark size="16px">X</q-chip>
              <div class="text-caption">Upcoming events</div>
            </div>
          </q-card-section>
        </q-card>
      </div> -->

      <div class="col-xs-12 col-sm-6 text-center">
        <q-card class="light-dimmed">
          <q-card-section class="q-pt-lg">
            <h3 class="q-mb-sm">Volunteers</h3>
            <div class="text-bold">
              <q-chip size="32px">X</q-chip>
            </div>
            <div>
              <q-chip icon="mdi-plus-circle" class="text-bold" color="secondary" dark size="16px">X</q-chip>
              <div class="text-caption">New applicants</div>
            </div>
          </q-card-section>
          <q-separator/>
          <q-card-section class="row q-col-gutter-sm">
            <div class="col-6"><q-btn label="Teams" icon="mdi-account-supervisor-circle" class="full-width" no-caps color="secondary"/></div>
            <div class="col-6"><q-btn label="Roles" icon="mdi-badge-account" class="full-width" no-caps color="secondary"/></div>
          </q-card-section>
        </q-card>
      </div>

      <!-- <div class="col-xs-12 col-sm-6 text-center">
        <q-card class="light-dimmed">
          <q-card-section class="q-pt-lg">
            <h3 class="q-mb-sm">Partners</h3>
            <div class="text-bold">
              <q-chip size="24px">X</q-chip>
          </div>
          </q-card-section>
          <q-separator/>
          <q-card-section class="row justify-around">
            <div>
              <q-chip icon="mdi-plus-circle" class="text-bold" color="primary" dark size="16px">X</q-chip>
              <div class="text-caption">New applicants</div>
            </div>
          </q-card-section>
        </q-card>
      </div> -->
    </div>
    <div>
      <q-input outlined color="secondary" label="🔍 Search rebels" class="q-mb-sm q-mt-lg"/>
      <q-chip label="All" color="secondary" dark/>
      <q-chip label="Online last month" icon="mdi-check-all"/>
      <q-chip label="High online engagement" icon="mdi-cursor-default-click"/>
      <!-- <q-chip label="Actively involved" icon="mdi-lightning-bolt-circle"/> -->
      <q-chip label="Inactive" icon="mdi-sleep"/>
      <q-chip label="Recently joined"  icon="mdi-star"/>
      <q-chip label="Volunteers"  icon="mdi-badge-account"/>
      <q-chip label="Custom tag"  icon="mdi-tag"/>
    </div>
    <q-card>
      <q-card-section v-if="!members[0]">
        Nobody has signed up for your movement yet!
      </q-card-section>
      <q-list separator>
        <q-item v-for="(member, index) in members" :key="index" class="q-py-md" clickable>
          <q-item-section avatar>
            <q-avatar color="grey-4" text-color="white" icon="mdi-account" />
          </q-item-section>
          <q-item-section>
            <q-item-label>
              {{ member.firstName }}
              {{ member.lastName }}
              <!-- <q-chip icon="mdi-lightning-bolt-circle" size="sm" color="grey" dark>1</q-chip> -->
              <q-chip v-if="member.eventSignups" icon="mdi-cursor-default-click" size="sm" outline color="grey">{{ member.eventSignups.length }}</q-chip>
            </q-item-label>
            <q-item-label caption class="q-gutter-sm">
              <span style="white-space: nowrap"><q-icon name="mdi-email"/> {{ member.emailAddress }}</span>
              <span style="white-space: nowrap"><q-icon name="mdi-phone"/> {{ member.phoneNumber }}</span>
            </q-item-label>
          </q-item-section>
          <!-- <q-item-section side top>
            <q-chip icon="mdi-lightning-bolt-circle" size="sm" color="black" dark>16</q-chip>
            <q-chip v-if="member.eventSignups" icon="mdi-cursor-default-click" size="sm" outline color="black">{{ member.eventSignups.length }}</q-chip>
          </q-item-section> -->
        </q-item>
      </q-list>
    </q-card>
  </div>
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
