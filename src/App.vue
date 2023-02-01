<template>
  <div id="app">
    <DemoHeader></DemoHeader>
    <component v-bind:is="currentPage"></component>
  </div>
</template>

<script>
import DemoHeader from "./components/DemoHeader.vue";
import QuestionsInput from "./components/QuestionsInput.vue";
import ResultsPage from "./components/ResultsPage.vue";

export default {
  name: "App",
  components: {
    // eslint-disable-next-line vue/no-unused-components

    DemoHeader,
    // eslint-disable-next-line vue/no-unused-components
    QuestionsInput,
    // eslint-disable-next-line vue/no-unused-components
    ResultsPage,
   
  },
  computed: {
    currentPage() {
      return this.$store.state.currentPage === "input"
        ? QuestionsInput
        : ResultsPage;
    },
  },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  font-family: "Source Sans Pro", sans-serif;
}

h1 {
  font-size: 72px;
  font-weight: normal;
}

.v-select-toggle[data-v-138dff1d]{
    white-space: pre-wrap !important;
    text-align: left !important;
    font-size: 16px !important;
}
</style>
