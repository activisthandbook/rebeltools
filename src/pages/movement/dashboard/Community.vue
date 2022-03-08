<template>
  <q-header bordered class="bg-primary text-white">
    <q-toolbar>
      <q-toolbar-title>Community</q-toolbar-title>
      <q-btn icon="mdi-plus" label="Add rebel" no-caps color="white" text-color="black" disable/>
    </q-toolbar>
  </q-header>
  <div class="q-gutter-y-md">
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
    <transition
      name="slide-fade"
    >
      <div v-if="membersLoaded" class="q-gutter-y-md">
        <!-- GUIDE BASED ON FILTER -->
        <div class="row q-col-gutter-md" v-if="filters[0].model">
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
        </div>
        <div v-for="(filter, index) in filters" :key="index">
          <activist-handbook
            v-if="filter.model && filter.guide"
            :emoji="filter.guide.emoji"
            :title="filter.guide.title"
            :description="filter.guide.description"
            :campaign="filter.guide.campaign"
            :articles="filter.guide.articles"
          />
        </div>

        <q-card>
          <q-card-section v-if="!members[0] && filters[0].model">
            Nobody has signed up for your movement yet
          </q-card-section>
          <q-card-section v-else-if="!members[0]">
            No rebels found.
          </q-card-section>
          <q-list separator v-else>
            <q-item v-for="(member, index) in members" :key="index" class="q-py-md" clickable :to="{name: 'Dashboard Rebel', params: { userID: member.id }}">
              <q-item-section avatar>
                <q-avatar color="grey-4" text-color="white" icon="mdi-account" />
              </q-item-section>
              <q-item-section>
                <q-item-label class="row no-wrap items-center">
                  <span class="ellipsis q-mr-xs">
                    {{ member.firstName }}
                    {{ member.lastName }}
                  </span>
                  <q-icon name="mdi-badge-account" size="xs" color="grey-9" dark class="q-my-none">
                    <q-tooltip :offset="[0, 6]" class="text-body2 bg-grey-9 shadow-7">{{ member.role.name }}</q-tooltip>
                  </q-icon>
                  <q-chip icon="mdi-lightning-bolt-circle" size="sm" color="grey-9" dark class="q-my-none" label="1">
                    <q-tooltip :offset="[0, 6]" class="text-body2 bg-grey-9 shadow-7">Engagement score ⚡️</q-tooltip>
                  </q-chip>
                  <q-chip v-if="member.eventSignups" icon="mdi-cursor-default-click" size="sm" outline color="grey-9" class="q-my-none" :label="member.eventSignups.length">
                    <q-tooltip :offset="[0, 6]" class="text-body2 bg-grey-9 shadow-7">Online activity 🌐</q-tooltip>
                  </q-chip>
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
    </transition>
  </div>
</template>
<script>
import ActivistHandbook from 'components/ActivistHandbook'

import { query, onSnapshot, getFirestore, collection, where, orderBy } from 'firebase/firestore'
const db = getFirestore()

export default {
  components: { ActivistHandbook },
  data () {
    return {
      membersLoaded: false,
      members: [],
      currentDescription: '',
      filters: [
        {
          label: 'All',
          model: true,
          icon: 'mdi-account-group'
        },
        {
          label: 'New rebels',
          model: false,
          icon: 'mdi-account-plus',
          guide: {
            emoji: '🐣',
            title: 'New rebels',
            description: 'These people are new in your movement. Give them a warm welcome and explain the basics. Send a private message to schedule a one-on-one integration meeting.',
            campaign: 'community_new_rebels'
          }
        },
        {
          label: 'Recently active',
          model: false,
          icon: 'mdi-clock',
          guide: {
            emoji: '⏱',
            title: 'Recently active online',
            description: "These people recently signed up. You've got their attention right now. Follow up on signups to turn interest into action.",
            campaign: 'community_recently_active'
          }
        },
        {
          label: 'High engagement',
          model: false,
          icon: 'mdi-cursor-default-click',
          guide: {
            emoji: '📱',
            title: 'High engagement online',
            description: 'These people interact with your page a lot. They might be interested taking up a more active role.',
            campaign: 'community_high_engagement'
          }
        },
        {
          label: 'Actively involved',
          model: false,
          icon: 'mdi-lightning-bolt-circle',
          guide: {
            emoji: '✊',
            title: 'Actively involved rebels',
            description: 'These rebels regularly attend your actions and meetings. Make sure they stay involved. Create a healthy culture to avoid burnout.',
            campaign: 'community_actively_involved',
            articles: [
              { title: 'How to prevent burnout', link: 'https://activisthandbook.org/en/wellbeing' }
            ]
          }
        },
        {
          label: 'Inactive',
          model: false,
          icon: 'mdi-sleep',
          guide: {
            emoji: '😴',
            title: 'Inactive rebels',
            description: 'These rebels have not been active the last 2 months. Those with the highest potential to become active again are shown on top of the list. Send them a private message & invite them to an upcoming event.',
            campaign: 'community_inactive'
          }
        },
        {
          label: 'Volunteers',
          model: false,
          icon: 'mdi-badge-account',
          guide: {
            emoji: '❤️',
            title: 'Volunteers',
            description: 'These people are actively contributing as volunteers. Make sure to give them the right support, so that they can do their roles well.',
            campaign: 'community_volunteers',
            articles: [
              { title: 'Train your volunteers', link: 'https://activisthandbook.org/en/trainings' }
            ]
          }
        },
        {
          label: 'Custom tag',
          model: false,
          icon: 'mdi-tag'
        }
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
      this.currentDescription = this.filters[0].description
      this.fetchMembersFromDatabase('All')

      // Switch between filters, don't allow selecting multiple ones at once.
      for (const watchLoopIndex in this.filters) {
        this.$watch('filters.' + watchLoopIndex, (newFilter) => {
          // Only do something if the newFilter model is true
          if (newFilter.model) {
            this.membersLoaded = false
            this.currentDescription = newFilter.description
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
        case 'New rebels':
          date.setMonth(date.getMonth() - 2)
          q = query(
            this.memberProfilesRef,
            // TO-DO: Should be timestampFirstAction, ordered by timestampFirstAction
            where('timestampLastAction', '>', date),
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
        case 'High engagement':
          q = query(
            this.memberProfilesRef,
            // TO-DO: Should be actionCount > X, sorted by actionCount
            where('timestampLastAction', '>', date),
            orderBy('timestampLastAction', 'desc')
          )
          break
        case 'Inactive':
          date.setMonth(date.getMonth() - 2)
          q = query(
            this.memberProfilesRef,
            // TO-DO: Should be sorted by actionCount (they have higher potential)
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
        this.members = memberList
        this.membersLoaded = true
      })
    }
  }
}
</script>
<style scoped>
.slide-fade-enter-active {
  transition: all 0.1s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-leave-active {
  transition: all 0.1s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(8px);
  opacity: 0;
}
</style>
