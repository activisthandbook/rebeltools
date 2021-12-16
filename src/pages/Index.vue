<template>
  <div class="q-gutter-y-lg">
    <div class="q-mt-xl">
      <h1>Rebel Tools 🦋</h1>
      <h2>The all-in-one toolset for activists</h2>
    </div>
    <p class="text-body1 text-bold">We are building tools for movements. They are 100% free to use for social, progressive and green rebels. And all our code is open source.</p>
    <q-card class="q-mb-md">
        <q-expansion-item icon="mdi-lightning-bolt" label="Get early access">
          <q-card>
            <q-card-section>
              We will start by giving a small number of people access before public release. Do you want to be one of the firsts to use Rebel Tools? Request early access as beta tester: <a href="mailto:contact@activisthandbook.org">contact@activisthandbook.org</a>
            </q-card-section>
          </q-card>
        </q-expansion-item>
        <q-expansion-item icon="mdi-github" label="Contribute as developer">
          <q-card>
            <q-card-section>
              Do you have experience with web development or are you eager to learn? We would love to welcome you on our team! Let us know you are interested: <a href="mailto:contact@activisthandbook.org">contact@activisthandbook.org</a>
            </q-card-section>
          </q-card>
        </q-expansion-item>
    </q-card>

    <div class="q-mt-xl q-gutter-y-sm">
      <h2>The idea</h2>
      <p>All over the globe, people are standing up against the injustices of our system. We want to help these social, progressive, and green rebels by building a toolset specifically designed for grassroots movements.</p>
      <p>Several commercial campaigning tools already exists, but only political parties and other larger nonprofit organisations with big budgets are able to afford those. Smaller activist groups have to rely on for-profit platforms like Facebook to reach out to their community. And the open source alternatives out there require too much technical expertise to set up.</p>
      <p><strong>Rebel Tools is a free, simple to use and open source alternative.</strong> It's build by activists, for activists. It includes all the tools you need as organiser to build a strong movement.</p>
      <q-img src="~assets/screenshots.png" alt="Screenshots of the Rebel Tools app, showing the movement page, events page, community page and the dashboard"/>
    </div>
    <div class="q-mt-xl q-gutter-y-sm">
      <h2>Features</h2>
      <p>With Rebel Tools, organisers get access to powerful movement-building tools, without needing technical experise to set it all up. All the tools are optimised based on real world experiences from <a href="https://activisthandbook.org/about" title="Guides for activists and rebels">activists around the world</a>.</p>
      <p>And the best part: Rebel Tools gets better over time, because anyone can contribute to our open source project. We even provide trainings and guides for those who want to learn how to help us build these tools.</p>
      <q-card>
        <q-list bordered separator>
          <q-item>
            <q-item-section avatar>
              <q-icon name="mdi-link" />
            </q-item-section>
            <q-item-section>
              <q-item-label class="text-bold">Page builder</q-item-label>
              <q-item-label caption>Easy to set up and customisable movement page. Increase engagement with the signup form, upcoming events and vacancies.</q-item-label>
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section avatar>
              <q-icon name="mdi-calendar" />
            </q-item-section>
            <q-item-section>
              <q-item-label class="text-bold">Event signups</q-item-label>
              <q-item-label caption>Allow people to sign up for your events. Send smart automated reminders and follow ups to increase the number of people who actually show up.</q-item-label>
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section avatar>
              <q-icon name="mdi-bullhorn" />
            </q-item-section>
            <q-item-section>
              <q-item-label class="text-bold">Effective petitions</q-item-label>
              <q-item-label caption>Use petitions as a low barrier way for new people to get to know your movement. Send targeted messages to your community based on their interests.</q-item-label>
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section avatar>
              <q-icon name="mdi-lightning-bolt" />
            </q-item-section>
            <q-item-section>
              <q-item-label class="text-bold">Vacancy manager</q-item-label>
              <q-item-label caption>Make more impact by recruiting volunteers for your teams. Manage all roles and teams using the admin dashboard.</q-item-label>
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section avatar>
              <q-icon name="mdi-view-dashboard" />
            </q-item-section>
            <q-item-section>
              <q-item-label class="text-bold">Admin dashboard</q-item-label>
              <q-item-label caption>Make more impact by recruiting volunteers for your teams. Manage all roles and teams using the admin dashboard.</q-item-label>
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section avatar>
              <q-icon name="mdi-puzzle" />
            </q-item-section>
            <q-item-section>
              <q-item-label class="text-bold">Integrations</q-item-label>
              <q-item-label caption>Sync your events with Google Calendar and Facebook, design illustrations using Canva, send notifications in Slack and more.</q-item-label>
            </q-item-section>
          </q-item>
          <q-item class="text-grey-8">
            <q-item-section avatar>
              <q-icon name="mdi-plus" />
            </q-item-section>
            <q-item-section>
              <q-item-label class="text-bold">Your suggestions!</q-item-label>
              <q-item-label caption>Let us know what features you would like to see! This is a collaborative project, and we would love to hear your input.</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-card>
    </div>
  </div>

  <div class="q-mt-xl q-gutter-sm">
    <h2>Join our project</h2>
    <div>Rebel Tools is built by the people behind Activist Handbook, the Wikipedia for activists. We would love to welcome you to our community. Check out our GitHub repository and join our community in Slack:</div>
    <q-btn label="GitHub" icon="mdi-github" outline no-caps type="a" href="https://github.com/activisthandbook/rebeltools"/>
    <q-btn label="Slack" icon="mdi-slack" outline no-caps type="a" href="https://join.slack.com/t/activisthandbook/shared_invite/zt-e1d26qma-nUiopZFKEiXf3lUwll_jhw"/>
    <q-card class="bg-black q-mt-md">
      <q-video class="rounded-borders" :ratio="16/9" src="https://www.youtube.com/embed/G6xxxa-yAco"/>
    </q-card>

  </div>

  <div  class="q-mt-xl q-gutter-y-md">
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
          We have recruited several people who want to help build Rebel Tools. With them, we are currently setting up our developers team.
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
  </div>
</template>
