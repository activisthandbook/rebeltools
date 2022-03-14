<template>
  <q-header bordered class="bg-primary text-white">
    <q-toolbar>
      <q-toolbar-title>Dashboard</q-toolbar-title>
    </q-toolbar>
  </q-header>
  <div class="q-gutter-y-md">
    <div>Here's how to get your day started<span v-if="$store.state.currentUser.data.firstName">, {{ $store.state.currentUser.data.firstName }}</span>:</div>
    <div class="row q-col-gutter-md q-py-md">
      <div class="col-12 col-sm-6" v-for="(suggestion, index) in suggestions" :key="index">
        <q-card class="cursor-pointer">
          <q-item clickable class="q-pa-none" :to="suggestion.to">
            <div class="full-width">

              <!-- Load in illustration, with dynamically changing colors -->
              <component v-bind:is="suggestion.illustration"/>

              <q-item class="q-py-md">
                <q-item-section>
                  <q-item-label class="text-bold">{{ suggestion.title }}</q-item-label>
                  <q-item-label caption>{{ suggestion.description }}</q-item-label>
                </q-item-section>
              </q-item>
            </div>
          </q-item>
        </q-card>
      </div>
    </div>
  </div>

  <q-card class="text-bold">

    <!--
    RECOMMENDATION LIST
    Show a maximum of 4 recommendations at a time, not to overwhelm people. Order them based on priority.
     -->
    <!-- <q-list separator>

      <q-item clickable v-ripple class="q-py-md" @click="$router.push({name: 'Dashboard Page'})">
        <q-item-section avatar>
          <q-icon name="mdi-file-document" />
        </q-item-section>
        <q-item-section>
          Customise page
        </q-item-section>
        <q-item-section side>
          <q-icon name="mdi-arrow-right" />
        </q-item-section>
      </q-item>

      <q-item clickable v-ripple class="q-py-md" @click="$router.push({name: 'Dashboard Calendar'})">
        <q-item-section avatar>
          <q-icon name="mdi-calendar" />
        </q-item-section>
        <q-item-section>
          Add events
        </q-item-section>
        <q-item-section side>
          <q-icon name="mdi-arrow-right" />
        </q-item-section>
      </q-item>

      <q-item clickable v-ripple class="q-py-md" @click="$router.push({name: 'Dashboard Community'})">
        <q-item-section avatar>
          <q-icon name="mdi-account-group" />
        </q-item-section>
        <q-item-section>
          View community
        </q-item-section>
        <q-item-section side>
          <q-icon name="mdi-arrow-right" />
        </q-item-section>
      </q-item> -->

      <!-- When people send a message, show this recommendation (priority: super high) -->
      <!-- <q-item clickable v-ripple class="q-py-md">
        <q-item-section avatar>
          <q-icon name="mdi-forum" />
        </q-item-section>
        <q-item-section>
          Respond to messages
        </q-item-section>
        <q-item-section side>
          <q-badge label="1" />
        </q-item-section>
        <q-item-section side>
          <q-icon name="mdi-arrow-right" />
        </q-item-section>
      </q-item> -->

      <!-- When people apply for a role, show this recommendation (priority: super high) -->
      <!-- <q-item clickable v-ripple class="q-py-md">
        <q-item-section avatar>
          <q-icon name="mdi-lightning-bolt" />
        </q-item-section>
        <q-item-section>
          Respond to applicants
        </q-item-section>
        <q-item-section side>
          <q-badge label="3" />
        </q-item-section>
        <q-item-section side>
          <q-icon name="mdi-arrow-right" />
        </q-item-section>
      </q-item> -->

      <!-- When new people sign up for your movement, show this recommendation (priority: high) -->
      <!-- <q-item clickable v-ripple class="q-py-md">
        <q-item-section avatar>
          <q-icon name="mdi-account-plus" />
        </q-item-section>
        <q-item-section>
          Contact new members
        </q-item-section>
        <q-item-section side>
          <q-badge label="5" />
        </q-item-section>
        <q-item-section side>
          <q-icon name="mdi-arrow-right" />
        </q-item-section>
      </q-item> -->

      <!-- When less than 20% of your members is active, show this recommendation (priority: medium) -->
      <!-- <q-item clickable v-ripple class="q-py-md">
        <q-item-section avatar>
          <q-icon name="mdi-phone" />
        </q-item-section>
        <q-item-section>
          Call inactive members
        </q-item-section>
        <q-item-section side>
          <q-icon name="mdi-arrow-right" />
        </q-item-section>
      </q-item> -->

      <!-- When new organisations apply for a partnership, show this recommendation (priority: super high) -->
      <!-- <q-item clickable v-ripple class="q-py-md">
        <q-item-section avatar>
          <q-icon name="mdi-heart" />
        </q-item-section>
        <q-item-section>
          Review new partners
        </q-item-section>
        <q-item-section side>
          <q-badge label="2" />
        </q-item-section>
        <q-item-section side>
          <q-icon name="mdi-arrow-right" />
        </q-item-section>
      </q-item> -->

      <!-- When there are no upcoming events in the calendar, show this recommendation (priority: medium) -->
      <!-- <q-item clickable v-ripple class="q-py-md">
        <q-item-section avatar>
          <q-icon name="mdi-calendar" />
        </q-item-section>
        <q-item-section>
          Organise an event
        </q-item-section>
        <q-item-section side>
          <q-icon name="mdi-arrow-right" />
        </q-item-section>
      </q-item> -->

      <!-- When event reminders are not yet set up to be automated, show this recommendation (priority: low) -->
      <!-- <q-item clickable v-ripple class="q-py-md">
        <q-item-section avatar>
          <q-icon name="mdi-calendar-clock" />
        </q-item-section>
        <q-item-section>
          Set up event reminders
        </q-item-section>
        <q-item-section side>
          <q-icon name="mdi-arrow-right" />
        </q-item-section>
      </q-item> -->

      <!-- When the movement has fewer than 20 members, show this recommendation (priority: low) -->
      <!-- <q-item clickable v-ripple class="q-py-md">
        <q-item-section avatar>
          <q-icon name="mdi-account-heart" />
        </q-item-section>
        <q-item-section>
          Invite your friends
        </q-item-section>
        <q-item-section side>
          <q-icon name="mdi-arrow-right" />
        </q-item-section>
      </q-item> -->

      <!-- When an event has less than 50% of the average event signups, show this recommendation (priority: medium) -->
      <!-- <q-item clickable v-ripple class="q-py-md">
        <q-item-section avatar>
          <q-icon name="mdi-calendar-star" />
        </q-item-section>
        <q-item-section>
          Promote your events
        </q-item-section>
        <q-item-section side>
          <q-icon name="mdi-arrow-right" />
        </q-item-section>
      </q-item> -->

      <!-- When the last newsletter was more than 30 days ago, show this recommendation (priority: low) -->
      <!-- <q-item clickable v-ripple class="q-py-md">
        <q-item-section avatar>
          <q-icon name="mdi-bell-ring" />
        </q-item-section>
        <q-item-section>
          Send a newsletter
        </q-item-section>
        <q-item-section side>
          <q-icon name="mdi-arrow-right" />
        </q-item-section>
      </q-item> -->

      <!-- When there are 2 or less vacancies, show this recommendation (priority: low) -->
      <!-- <q-item clickable v-ripple class="q-py-md">
        <q-item-section avatar>
          <q-icon name="mdi-lightning-bolt" />
        </q-item-section>
        <q-item-section>
          Add your vacancies
        </q-item-section>
        <q-item-section side>
          <q-icon name="mdi-arrow-right" />
        </q-item-section>
      </q-item> -->

    <!-- </q-list> -->
  </q-card>
</template>
<script>
import IllustrationDraw from '../../../illustrations/draw'
import IllustrationCalendar from '../../../illustrations/calendar'
import IllustrationGroup from '../../../illustrations/group'
import IllustrationOrganise from '../../../illustrations/organise'

export default {
  components: { IllustrationDraw, IllustrationCalendar },
  computed: {
    // We're  not changing these, so we can make them computed instead of reactive data, to improve performance
    suggestions: function () {
      return [
        { title: '🎨 Customise page', description: 'Make it look your own', illustration: IllustrationDraw, to: { name: 'Dashboard Page' } },
        { title: '📆 Add events', description: 'Promote your actions', illustration: IllustrationCalendar, to: { name: 'Dashboard Calendar' } },
        { title: '📢 Start campaign', description: 'Create a collection of events', illustration: IllustrationGroup, to: { name: 'Dashboard Community' } },
        { title: '⚡️ Organise community', description: 'List of all rebels', illustration: IllustrationOrganise, to: { name: 'Dashboard Community' } }
      ]
    }
  }
}
</script>
