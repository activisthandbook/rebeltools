<template>
  <div class="q-gutter-lg">
    <hgroup class="q-mt-xl">
      <h1>Rebel Tools 🦋</h1>
      <h2>The all-in-one toolset for activists</h2>
    </hgroup>
    <p class="text-body1 text-bold">We are building tools for movements. They will be 100% free to use for social, progressive and green rebels. All our code is open source.</p>
    <q-card class="q-mb-md">
        <q-expansion-item icon="mdi-lightning-bolt" label="Get early access">
          <q-card>
            <q-card-section class="text-body2">
              We will start by giving a small number of people access before public release. Do you want to be one of the firsts to use Rebel Tools? Request early access as beta tester: <a href="mailto:contact@activisthandbook.org">contact@activisthandbook.org</a>
            </q-card-section>
          </q-card>
        </q-expansion-item>
        <q-expansion-item icon="mdi-github" label="Contribute as developer">
          <q-card>
            <q-card-section class="text-body2">
              Do you have experience with web development or are you eager to learn? We would love to welcome you on our team! Let us know you are interested: <a href="mailto:contact@activisthandbook.org">contact@activisthandbook.org</a>
            </q-card-section>
          </q-card>
        </q-expansion-item>
    </q-card>
    <div class="text-body2">
      <p>Rebel Tools is being developed by the people behind <a href="https://activisthandbook.org" title="Activist Handbook, manual for rebels">Activist Handbook</a>, the Wikipedia for rebels. While developing Activist Handbook, we realised we needed a toolset to grow our movement, engage existing members, host events, schedule events, etc. As we are on a tight budget (we are all volunteers and pay everything out of pocket), we didn't like using the commercially available services.</p>
      <p>So we are developing our own tools! Everything we do, is to help people organise for positive change. That is why we made these tools available for free. In addition, we share our code publicly, so that movements can adapt the platform to their own needs.</p>
    </div>
    <q-card class="bg-black">
      <q-video class="rounded-borders" :ratio="16/9" src="https://www.youtube.com/embed/G6xxxa-yAco"/>
    </q-card>
  </div>

  <footer class="q-pt-xl q-gutter-sm">
    <h2>An open source project</h2>
    <div class="text-body2">Rebel Tools is built by activists, for activists. Check out our GitHub repository and join our community in Slack:</div>
    <q-btn label="GitHub" icon="mdi-github" outline no-caps type="a" href="https://github.com/activisthandbook/rebeltools"/>
    <q-btn label="Slack" icon="mdi-slack" outline no-caps type="a" href="https://join.slack.com/t/activisthandbook/shared_invite/zt-e1d26qma-nUiopZFKEiXf3lUwll_jhw"/>
  </footer>
</template>
<style>
.q-page{
  max-width: 640px;
}
</style>
