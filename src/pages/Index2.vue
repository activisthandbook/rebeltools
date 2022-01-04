<template>
  <div class="q-gutter-y-md">
    <h1>The all-in-one toolset for movements 🦋</h1>
    <div class="text-bold q-mb-md">Rebel Tools is an <span class="bg-primary text-white rounded-borders q-px-xs">open source</span> platform for social, progressive and green activists. We help change-makers organise & mobilise. It's <span class="bg-primary text-white rounded-borders q-px-xs">free</span> for small movements.</div>

    <section class="row q-col-gutter-md">
      <div class="col-sm-6 col-12">
        <q-card>
          <q-card-section class="bg-secondary text-white cursor-pointer" @click="$router.push({name: 'New movement'})" >
            <div class="q-gutter-y-sm">
              <h2>Start organising</h2>
              <div class="text-bold">Create your own movement page to get started.</div>
              <q-chip square class="q-mx-none text-bold" size="sm" color="white" outline>1 minute setup</q-chip>
            </div>
          </q-card-section>
          <q-card-section>
            <div class="q-gutter-y-sm">
              <!-- <h2>Start organising</h2>
              <div class="text-bold">Create your own movement page to get started.</div>
              <q-chip square class="q-mx-none text-bold" size="sm" color="secondary" outline>1 minute setup</q-chip> -->
              <div class="text-body2">📢 Powerful tools, easy to use</div>
              <div class="text-body2">💸 Movements with up to 1K rebels can use Rebel Tools for free.</div>
              <div class="text-body2">❤️ Like it? You decide how much you can afford to contribute.</div>
              <q-btn label="Create free page" icon-right="mdi-arrow-right-circle" no-caps color="secondary" unelevated class="shadow-9" :to="{name: 'New movement'}"/>

            </div>
          </q-card-section>
        </q-card>
      </div>
      <div class="col-sm-6 col-12">
        <q-card flat bordered>
          <q-card-section>
            <div class="q-gutter-y-sm">
              <h2>Open source</h2>
              <div class="text-bold">Host it yourself with a custom domain name</div>
              <q-chip square class="q-mx-none text-bold" size="sm" color="black" outline>Technical skills required</q-chip>
              <div class="text-body2">🌊 Best for large movements with lots of local groups.</div>
              <div class="text-body2">💻 Do you have coding skills? Customise it all you like.</div>
              <div class="text-body2">👩‍💻 Become part of our open source community</div>
              <q-btn label="Documentation" no-caps color="black"/>
              <q-separator class="q-my-md"/>
              <div class="text-body2">Want us to set up a custom website for you? Send us a <a href="mailto:hey@rebel.tools">message</a>.</div>
            </div>
          </q-card-section>
        </q-card>
      </div>
    </section>

    <section class="q-gutter-y-md q-mt-xl">
      <h2>Revolutionary,<br/> literally <span style="font-style:normal">✊</span></h2>
      <div>All over the globe, people are standing up against the injustices of our toxic system. We want to help these rebels by building a toolset specifically designed for grassroots movements.</div>
      <div>Several commercial campaigning tools already exists, but all together they add up to a lot of money. Smaller activist groups have to rely on big evil multinationals like Facebook to reach out to their community.</div>
      <div><strong>Rebel Tools is a non-profit, simple to use and open source alternative.</strong> It's build by activists, for activists. It includes all the tools you need as organiser to build a strong movement.</div>
      <q-img src="~assets/screenshots.png" alt="Screenshots of the Rebel Tools app, showing the movement page, events page, community page and the dashboard"/>
    </section>

    <section class="q-gutter-y-md q-mt-xl">
      <h2>Build by rebels, <br/>for rebels <span style="font-style:normal">⚡️</span></h2>
      <p>With Rebel Tools, organisers get access to powerful movement-building tools, without needing technical experise to set it all up. All the tools are optimised based on real world experiences from <a href="https://activisthandbook.org/about" title="Guides for activists and rebels">activists around the world</a>.</p>
      <p>And the best part: Rebel Tools gets better over time, because anyone can contribute to our <strong>open source project </strong>. We even provide trainings and guides for those who want to learn how to help us build these tools.</p>

      <div class="row q-col-gutter-md text-center">
        <div class="col-sm-4 col-6 flex">
          <q-card class="full-width">
            <q-card-section>
              <q-avatar size="64px" icon="mdi-link" color="primary" text-color="white"/>
              <div class="text-bold q-my-sm">Page builder</div>
              <div class="text-caption">Customisable design, signup form, custom domain for redirects.</div>
            </q-card-section>
          </q-card>
        </div>
        <div class="col-sm-4 col-6 flex">
          <q-card class="full-width">
            <q-card-section>
              <q-avatar size="64px" icon="mdi-calendar" color="primary" text-color="white"/>
              <div class="text-bold q-my-sm">Event calendar</div>
              <div class="text-caption">Action RSVPs, reminder messages, automatic timezone detection.</div>
            </q-card-section>
          </q-card>
        </div>
        <div class="col-sm-4 col-6 flex">
          <q-card class="full-width">
            <q-card-section>
              <q-avatar size="64px" icon="mdi-bullhorn" color="primary" text-color="white"/>
              <div class="text-bold q-my-sm">Petition campaigns</div>
              <div class="text-caption">Storytelling, collecting signatures, strategic action planning</div>
            </q-card-section>
          </q-card>
        </div>
        <div class="col-sm-4 col-6 flex">
          <q-card class="full-width">
            <q-card-section>
              <q-avatar size="64px" icon="mdi-account-group" color="primary" text-color="white"/>
              <div class="text-bold q-my-sm">Community organiser</div>
              <div class="text-caption">Vacancies, roles, teams and projects.</div>
            </q-card-section>
          </q-card>
        </div>
        <div class="col-sm-4 col-6 flex">
          <q-card class="full-width">
            <q-card-section>
              <q-avatar size="64px" icon="mdi-heart" color="primary" text-color="white"/>
              <div class="text-bold q-my-sm">Social media manager</div>
              <div class="text-caption">Share your actions on your socials and publish Facebook events.</div>
            </q-card-section>
          </q-card>
        </div>
        <div class="col-sm-4 col-6 flex">
          <q-card class="full-width">
            <q-card-section>
              <q-avatar size="64px" icon="mdi-puzzle" color="primary" text-color="white"/>
              <div class="text-bold q-my-sm">Integrations</div>
              <div class="text-caption">Sync events with Google Calendar, fetch Pexels photos, get Slack notifications.</div>
            </q-card-section>
          </q-card>
        </div>

      </div>
    </section>

    <section class="q-gutter-y-md q-mt-xl">
      <h2>Radically awesome <span style="font-style:normal">✨</span></h2>
      <p></p>
      <q-card>
        <q-list bordered separator>
          <q-item>
            <q-item-section avatar>
              <q-icon name="mdi-wifi-off" />
            </q-item-section>
            <q-item-section>
              <q-item-label class="text-bold">Optimised for unstable connections</q-item-label>
              <q-item-label caption>Rebel Tools works everywhere, even when you are offline</q-item-label>
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section avatar>
              <q-icon name="mdi-translate" />
            </q-item-section>
            <q-item-section>
              <q-item-label class="text-bold">Multi-language support</q-item-label>
              <q-item-label caption>Translated by our global community</q-item-label>
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section avatar>
              <q-icon name="mdi-palette" />
            </q-item-section>
            <q-item-section>
              <q-item-label class="text-bold">Customisable design</q-item-label>
              <q-item-label caption>Add your own colour scheme</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-card>
    </section>

    <section class="q-gutter-md q-mt-xl ">
      <h2>Join our project</h2>
      <div>Rebel Tools is built by the people behind Activist Handbook, the Wikipedia for activists. We would love to welcome you to our community. Check out our GitHub repository and join our community in Slack:</div>
      <q-btn label="GitHub" icon="mdi-github" outline no-caps type="a" href="https://github.com/activisthandbook/rebeltools"/>
      <q-btn label="Slack" icon="mdi-slack" outline no-caps type="a" href="https://join.slack.com/t/activisthandbook/shared_invite/zt-e1d26qma-nUiopZFKEiXf3lUwll_jhw"/>
      <q-card class="bg-black q-mt-md">
        <q-video class="rounded-borders" :ratio="16/9" src="https://www.youtube.com/embed/G6xxxa-yAco"/>
      </q-card>

    </section>

    <section  class="q-gutter-y-md q-mt-xl">
      <h2>Roadmap</h2>

      <q-timeline color="secondary" class="q-px-sm">
        <q-timeline-entry title="Define project plan ✅">
          <div>
            We have a clear idea of what we want Rebel Tools to look like, what features to include in our first release and what tech stack to use.
          </div>
        </q-timeline-entry>
        <q-timeline-entry title="Start web development course ✅">
          <div>
            We have set up our own training programme, so that everyone can learn how to contribute to our project.
          </div>
        </q-timeline-entry>
        <q-timeline-entry title="Build developers team 🙌" subtitle="Current phase" icon="mdi-calendar-today">
          <div>
            We have recruited several people who want to help build Rebel Tools. With them, we are currently building the first version!
          </div>
        </q-timeline-entry>
        <q-timeline-entry title="Release alpha version 🚀">
          <div>
            We will invite a small group of people to test out Rebel Tools and to give feedback.
          </div>
        </q-timeline-entry>
        <q-timeline-entry title="Organise online meetup 👋">
          <div>
            We will invite our international community to join us during this online meetup. In small groups, we will be brainstorming about what tools activists need the most to become more effective at change-making.
          </div>
        </q-timeline-entry>
        <q-timeline-entry title="Release beta version 🚀">
          <div>
            We will invite a larger group of people to test out Rebel Tools and to give feedback.
          </div>
        </q-timeline-entry>
        <q-timeline-entry title="Release version 1.0 🎯">
          <div>
            Now it's time to start thinking about our next big step.
          </div>
        </q-timeline-entry>
      </q-timeline>
    </section>

  </div>
</template>
