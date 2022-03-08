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
      <q-chip
        v-for="(filter, index) in filters"
        :key="index"
        :label="filter.label"
        v-model:selected="filter.model"
        :class="{'bg-secondary': filter.model}"
        :dark="filter.model"
        :icon="filter.icon"
        :icon-selected="filter.icon"
      />
    </div>
    <q-card>
      <q-card-section v-if="!members[0]">
        No rebels found.
      </q-card-section>
      <q-list separator>
        <q-item v-for="(member, index) in members" :key="index" class="q-py-md" clickable>
          <q-item-section avatar>
            <q-avatar color="grey-4" text-color="white" icon="mdi-account" />
          </q-item-section>
          <q-item-section>
            <q-item-label class="row no-wrap items-center">
              <span class="ellipsis q-mr-xs">
                {{ member.firstName }}
                {{ member.lastName }}
              </span>
              <q-icon name="mdi-badge-account" size="xs" color="grey-9" dark class="q-my-none"/>
              <q-chip icon="mdi-lightning-bolt-circle" size="sm" color="grey-9" dark class="q-my-none">1</q-chip>
              <q-chip v-if="member.eventSignups" icon="mdi-cursor-default-click" size="sm" outline color="grey-9" class="q-my-none">{{ member.eventSignups.length }}</q-chip>
              <!-- <q-chip icon="mdi-chat" size="sm" color="grey-9" dark class="q-my-none">Send welcome message!</q-chip> -->
              <!-- <q-chip icon="mdi-heart" label="Help them integrate!" color="secondary" dark size="sm" class="q-my-none"/> -->
            </q-item-label>
            <q-item-label caption class="q-gutter-sm">
              <span style="white-space: nowrap"><q-icon name="mdi-email"/> {{ member.emailAddress }}</span>
              <span style="white-space: nowrap"><q-icon name="mdi-phone"/> {{ member.phoneNumber }}</span>
            </q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-card>
  </div>
</template>
<script>
import { query, onSnapshot, getFirestore, collection, where, orderBy } from 'firebase/firestore'
const db = getFirestore()

export default {
  data () {
    return {
      members: [],
      filters: [
        { label: 'All', model: true, icon: 'mdi-account-group' },
        { label: 'Recently active', model: false, icon: 'mdi-check-all' },
        { label: 'High online engagement', model: false, icon: 'mdi-cursor-default-click' },
        { label: 'Actively involved', model: false, icon: 'mdi-lightning-bolt-circle' },
        { label: 'Inactive', model: false, icon: 'mdi-sleep' },
        { label: 'Recently joined', model: false, icon: 'mdi-star' },
        { label: 'Volunteers', model: false, icon: 'mdi-badge-account' },
        { label: 'Custom tag', model: false, icon: 'mdi-tag' }
      ]
    }
  },
  computed: {
    memberProfilesRef: function () {
      return collection(db, 'movements', this.$store.state.currentMovement.data.id, 'members')
    }
  },
  mounted () {
    this.$nextTick(function () {
      this.fetchMembersFromDatabase('All')

      // Switch between filters, don't allow selecting multiple ones at once.
      for (const watchLoopIndex in this.filters) {
        this.$watch('filters.' + watchLoopIndex, (newFilter) => {
          // Only do something if the newFilter model is true
          if (newFilter.model) {
            // Loop through all filters, to set all others to false
            this.filters.forEach((filterLoop, filterIndex) => {
              if (parseInt(watchLoopIndex) !== filterIndex) {
                // Set all others to false
                filterLoop.model = false
              } else {
                // This one runs once
                this.fetchMembersFromDatabase(newFilter.label)
              }
            })
          }
        }, { deep: true })
      }
    })
  },
  methods: {
    fetchMembersFromDatabase (filter) {
      let q = null
      const date = new Date()

      switch (filter) {
        case 'All':
          q = query(
            this.memberProfilesRef,
            orderBy('timestampLastAction', 'desc')
          )
          break
        case 'Recently active':
          date.setMonth(date.getMonth() - 2)
          q = query(
            this.memberProfilesRef,
            where('timestampLastAction', '>', date),
            orderBy('timestampLastAction', 'desc')
          )
          break
        case 'Inactive':
          date.setMonth(date.getMonth() - 2)
          q = query(
            this.memberProfilesRef,
            where('timestampLastAction', '<', date),
            orderBy('timestampLastAction', 'asc')
          )
          break
        default:
          q = query(
            this.memberProfilesRef,
            orderBy('timestampLastAction', 'desc')
          )
          break
      }

      onSnapshot(q, (querySnapshot) => {
        const memberList = []
        querySnapshot.forEach((doc) => {
          memberList.push(doc.data())
        })
        console.log(memberList)
        this.members = memberList
      })
    }
  }
}
</script>
