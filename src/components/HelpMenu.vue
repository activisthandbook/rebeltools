<template>
  <q-btn
    color="primary"
    class="q-mr-sm"
    label="Help"
    icon="mdi-help-circle"
    no-caps
  >
    <q-menu :offset="[0, 6]">
      <q-list>
        <q-item
          clickable
          v-close-popup
          href="https://guides.rebel.tools/"
          target="_blank"
        >
          <q-item-section avatar>
            <q-icon name="mdi-book-open-page-variant" />
          </q-item-section>
          <q-item-section> Support guides </q-item-section>
        </q-item>
        <q-item
          clickable
          v-close-popup
          href="https://github.com/activisthandbook/rebeltools/issues/new?assignees=&labels=bug&template=bug_report.md"
          target="_blank"
        >
          <q-item-section avatar>
            <q-icon name="mdi-alert" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Report bug</q-item-label>
          </q-item-section>
        </q-item>
        <q-item
          clickable
          v-close-popup
          href="https://github.com/activisthandbook/rebeltools/issues/new?assignees=&labels=bug&template=bug_report.md"
          target="_blank"
        >
          <q-item-section avatar>
            <q-icon name="mdi-shimmer" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Request feature</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-menu>
  </q-btn>
</template>
