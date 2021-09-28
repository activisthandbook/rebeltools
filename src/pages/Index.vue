<template>
  <div class="q-gutter-sm q-mb-lg">
    <h1>Activist Handbook is the Wikipedia for rebels.</h1>
    <p>Activist Handbook is a collaborative platform for rebels to exchange knowledge and experiences. We are inviting you to join our international project!</p>
  </div>

  <q-card class="bg-primary" dark>

    <q-card-section class="q-gutter-sm column">
      <h2>Join us</h2>
      <div>
        We'd love to get to know you. Sign up and join our international community of change-makers.
      </div>
      <q-input label="Email" outlined autofocus bg-color="white">
        <template v-slot:append>
          <q-btn icon="mdi-arrow-right" color="primary" round>
            <q-tooltip>Sign up</q-tooltip>
          </q-btn>
        </template>
      </q-input>
    </q-card-section>
  </q-card>

  <div class="q-gutter-sm q-my-lg">
    <h2>Upcoming events</h2>
    <q-list bordered class="rounded-borders" separator>
      <q-item clickable v-ripple>
        <q-item-section class="q-my-sm">
          <q-item-label><strong>Meetup: Some topic</strong></q-item-label>
          <q-item-label caption >Lorem ipsum dolor sit, amet consectetur adipisicing elit. Natus alias ab, temporibus molestiae beatae, dolor repellat a hic nostrum officiis adipisci facilis mollitia aut distinctio itaque. Dolores, vero dicta. Temporibus?</q-item-label>
          <q-item-label>
            <q-chip label="14 Feb 14:00" color="primary" dark/>
            <q-chip label="You + 22 others" icon="mdi-check-circle" color="primary" text-color="white"/></q-item-label>

        </q-item-section>

        <q-item-section side>
          <q-btn icon="mdi-check" round color="primary" >
            <q-tooltip>Count me in!</q-tooltip>
          </q-btn>
        </q-item-section>
      </q-item>

      <q-item clickable v-ripple>

        <q-item-section class="q-my-sm">
          <q-item-label><strong>Training: Interesting</strong></q-item-label>
          <q-item-label caption>Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus facere doloremque nemo eius porro ab nulla, minima tempore, impedit molestiae molestias laboriosam quia quam. Blanditiis adipisci praesentium id deserunt nulla.</q-item-label>
          <q-item-label><q-chip label="14 Feb 14:00" color="primary" dark/><q-chip label="22 people attending" icon="check"  /></q-item-label>
        </q-item-section>

        <q-item-section side>
          <q-btn round icon="mdi-check" color="primary" outline no-caps>
            <q-tooltip>Count me in!</q-tooltip>
          </q-btn>
        </q-item-section>
      </q-item>
      <q-item clickable v-ripple>

        <q-item-section class="q-my-sm">
          <q-item-label><strong>Protest march</strong></q-item-label>
          <q-item-label caption>Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus facere doloremque nemo eius porro ab nulla, minima tempore, impedit molestiae molestias laboriosam quia quam. Blanditiis adipisci praesentium id deserunt nulla.</q-item-label>
          <q-item-label><q-chip label="14 Feb 14:00" color="primary" dark/><q-chip label="New event!" icon="mdi-star-outline" /></q-item-label>
        </q-item-section>

        <q-item-section side>
          <q-btn round icon="mdi-check" color="primary" outline >
            <q-tooltip>Count me in!</q-tooltip>
          </q-btn>
        </q-item-section>
      </q-item>
      <q-item class="justify-end">
          <q-btn label="See all events" flat color="primary"/>
      </q-item>
    </q-list>
  </div>
  <div class="q-gutter-sm q-my-lg">
    <h2>Become involved</h2>
    <p>We believe that diversity strengthens our organisation. That is why we encourage people of all genders, sexual preferences and ethnic backgrounds, including people with disabilities, to join our cause.</p>
    <q-list bordered class="rounded-borders" separator>
      <!-- <q-item-label header>Vacant roles</q-item-label> -->

      <q-expansion-item switch-toggle-side expand-separator label="Ways to contribute">
          <q-list separator>
            <q-item >

              <q-item-section class="q-my-sm">
                <q-item-label><strong>Become a volunteer</strong></q-item-label>
                <q-item-label class="text-body2">There are many ways in which you can contribute to our project. How about we schedule a video call so we can get to know each other a bit?</q-item-label>
                <q-item-label>
                  <q-btn label="Get started" icon="mdi-arrow-right" color="primary" rounded outline no-caps/>
                </q-item-label>
              </q-item-section>

            </q-item>
            <q-item>

              <q-item-section class="q-my-sm">
                <q-item-label><strong>Partner up</strong></q-item-label>
                <q-item-label class="text-body2">Are you active for a progressive change-making organisation or movement? Let's work together! We would love to talk with you.</q-item-label>
                <q-item-label>
                  <q-btn label="Get started" icon="mdi-arrow-right" color="primary" rounded outline no-caps/>
                </q-item-label>
              </q-item-section>

            </q-item>
          </q-list>
      </q-expansion-item>

      <q-expansion-item switch-toggle-side expand-separator label="Vacant roles">
          <q-list separator>
            <q-item clickable v-ripple>

              <q-item-section class="q-my-sm">
                <q-item-label><strong>Integrator</strong></q-item-label>
                <q-item-label>
                  <q-chip label="8 hours per week" icon="mdi-clock" />
                  <q-chip label="6 months" icon="mdi-calendar"/>
                </q-item-label>
                <q-item-label class="text-body2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus facere doloremque nemo eius porro ab nulla, minima tempore, impedit molestiae molestias laboriosam quia quam. Blanditiis adipisci praesentium id deserunt nulla.</q-item-label>
                <q-item-label>
                  <q-btn label="Get started" icon="mdi-arrow-right" rounded outline color="primary" no-caps/>
                </q-item-label>
              </q-item-section>

            </q-item>
            <q-item clickable v-ripple>

              <q-item-section class="q-my-sm">
                <q-item-label><strong>Communications coordinator</strong></q-item-label>
                <q-item-label>
                  <q-chip label="8 hours per week" icon="mdi-clock"/>
                  <q-chip label="6 months" icon="mdi-calendar"/>
                </q-item-label>

                <q-item-label class="text-body2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus facere doloremque nemo eius porro ab nulla, minima tempore, impedit molestiae molestias laboriosam quia quam. Blanditiis adipisci praesentium id deserunt nulla.</q-item-label>
                <q-item-label>
                  <q-btn label="Get started" icon="mdi-arrow-right" rounded outline color="primary" no-caps/>
                </q-item-label>
              </q-item-section>

            </q-item>
            <q-item class="justify-end">
              <q-btn label="See all vacancies" flat color="primary"/>
            </q-item>
          </q-list>
      </q-expansion-item>
    </q-list>
  </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'PageIndex'
})
</script>
