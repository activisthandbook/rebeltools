<template>
  <div class="q-gutter-y-md">
    <h1>How is Rebel Tools different from Action Network?</h1>
    <div class="text-bold"><span class="bg-primary text-white rounded-borders q-px-xs">Action Network</span> is a platform to help progressive movements organise themselves more effectively. It is similar to <span class="bg-primary text-white rounded-borders q-px-xs">Rebel Tools</span>. Both offer tools to manage events, petitions and signup forms.</div>
    <div>While Action Network offers very advanced features, Rebel Tools is easier to use and more accessible for smaller movements. Rebel Tools also has some features that Action Network does not, like a page builder and social media manager.</div>
    <q-banner class="bg-grey-4 rounded-borders q-mb-md" dense>
      <template v-slot:avatar>
        <q-icon name="mdi-check" color="black"/>
      </template>
      Rebel Tools and Action Network are both run by non-profits.
    </q-banner>
  </div>

  <section class="row q-col-gutter-md">
      <div class="col-sm-6 col-12">
        <q-card>
          <q-card-section>
            <div class="q-gutter-y-sm">
              <h2>Rebel Tools</h2>
              <div class="text-bold">Easy to use, all-in-one toolset for green, progressive and social activists.</div>
              <div class="text-body2"><q-icon name="mdi-check-circle" color="secondary" size="sm"/> Powerful tools, easy to use</div>
              <div class="text-body2"><q-icon name="mdi-check-circle" color="secondary" size="sm"/> Includes page builder</div>
              <div class="text-body2"><q-icon name="mdi-check-circle" color="secondary" size="sm"/> Includes social media manager</div>
              <div class="text-body2"><q-icon name="mdi-minus-circle" color="grey" size="sm"/> Less advanced tools for large networks</div>
              <q-separator class="q-my-md"/>
              <div class="text-body2 text-bold">Pricing: Pay what you can afford</div>
              <div class="text-body2">Movements with up to 1K rebels can use Rebel Tools for <span class="bg-secondary text-white rounded-borders q-px-xs">free</span>.</div>
              <div class="text-body2">Like it? You decide how much you can afford to contribute. You always get access to all features.</div>
              <q-btn label="Get started" icon-right="mdi-arrow-right-circle" no-caps color="secondary" unelevated class="shadow-9 q-mt-md" :to="{name: 'Home'}"/>

            </div>
          </q-card-section>
        </q-card>
      </div>
      <div class="col-sm-6 col-12">
        <q-card>
          <q-card-section>
            <div class="q-gutter-y-sm">
              <h2>Action Network</h2>
              <div class="text-bold">Advanced movement-building platform for progressive activists.</div>
              <div class="text-body2"><q-icon name="mdi-check-circle" color="secondary" size="sm"/> Very feature rich</div>
              <div class="text-body2"><q-icon name="mdi-check-circle" color="secondary" size="sm"/> Integrated SMS broadcasting</div>
              <div class="text-body2"><q-icon name="mdi-minus-circle" color="grey" size="sm"/> Complex and slightly outdated user interface</div>
              <div class="text-body2"><q-icon name="mdi-minus-circle" color="grey" size="sm"/> Not open source</div>
              <q-separator class="q-my-md"/>
              <div class="text-body2 text-bold">Pricing: limited free plan, also has $10 and $100 subscriptions</div>
              <div class="text-body2">You only get access to the advanced features like uploading existing mailing lists and creating multiple groups with the paid plans.</div>
            </div>
          </q-card-section>
        </q-card>
      </div>
    </section>

    <section class="q-gutter-y-md q-mt-lg">
      <div>It is not easy to decide what organising toolkit to use for your protest movement. Here are some things to look at:</div>
      <ul>
        <li><strong>Costs:</strong> While large nonprofits may receive huge amounts of funding with which they can buy all sorts of professional tools, most activist movements do not. We built Rebel Tools specifically with smaller local action groups in mind. All you need is an account to get access to our full toolset. With Action Network, you will still need to pay for a domain name and web hosting to set up your website (and a web developer if you want to customise your design). All together, this can get quite costly.</li>
        <li><strong>Ease of use:</strong> The fact that you are doing research into what tools to use for your movement, indicates you are probably quite tech savvy. However, do not forget to think about your fellow rebels! The more people can use your digital tools, the faster you can grow your movement.</li>
        <li><strong>Features:</strong> While Action Network is very much specialised, offering advanced features for large networks, Rebel Tools overs a wider range of tools. For example, Rebel Tools includes a social media manager. With Action Network, this is not the case, so you will also need to pay for an additional service like Buffer or Hootsuite.</li>
      </ul>
      <div>Want to give Rebel Tools a go? It only takes a minute to set up your own free page. And if you are still missing some features, let us know, so we can improve it together:</div>
      <q-btn label="Get started with Rebel Tools" no-caps outline color="secondary" :to="{name: 'Home'}"/>

      <q-img
        alt="Crowd of Black Lives Matter protesters holding signs"
        src="~assets/black-lives-matter-protest.jpg"
        srcset="img/black-lives-matter-protest.jpg 592w,
                img/black-lives-matter-protest-2x.jpg 2x"
      />
    </section>

    <section class="q-gutter-y-md q-mt-lg">
      <h3>About this article</h3>
      <div>As you may have noticed, this article is not really a 'neutral' review. <strong>We are clearly trying to convince you to use Rebel Tools. Why?</strong> Well, we really think Rebel Tools is an awesome platform for activists. We want more people to know about it. And we have noticed these kinds of articles end up high in the Google search results.</div>
      <div>Rebel Tools is developed by the same people who built Activist Handbook, the Wikipedia for activists. Of course, we would love you to start using Rebel Tools. But if you want to look a bit further, feel free to check out our (more objectively written) articles on <a href="https://activisthandbook.org/en/tools">tools for protestors</a>.</div>
    </section>
</template>
