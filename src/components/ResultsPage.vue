<template>
  <!-- <section>
    <div v-for="(row, key) in results" v-bind:key="key">
      <label>{{ key }}</label>
      <select>
        <option
          v-for="(item, index) in row"
          v-bind:key="index"
          v-bind:value="item.sentence2"
        >
            {{ item.sentence2 }}. <b>Score</b> {{ item.score }}
        </option>
      </select>
    </div>
  </section> -->

  <!-- <table>
    <tr>
      <th>Form one</th>
      <th>Mapped Questions</th>
    </tr>
    <tr v-for="(result, key) in results" v-bind:key="key" class="table-body">
      <td class="formquestion">{{ key }}</td>
      <td>

        <vSelect v-bind:options="result" > </vSelect>
      </td>
    </tr>
  </table> -->

  <div class="container mt-5">
    <div class="row">
      <h2 class="col text-primary">Form one</h2>
      <h2 class="col text-primary">Mapped Questions</h2>
    </div>
    <div class="row pb-5 pt-5 border-top" v-for="(row, key) in results" v-bind:key="key" v-key="key">
      <div class="col"><p>{{ key }}</p></div>
      <select class="col form-select text-wrap">
        <option
          v-for="(item, index) in row"
          v-bind:key="index"
          v-bind:value="item.text"
          class="text-wrap text-break"
        >
            {{item.text}}
        </option>
      </select>
    </div>
  </div>
</template>

<script>
// import vSelect from "@alfsnd/vue-bootstrap-select";
// import {ModelSelect} from "vue-search-select";

export default {
  components: {
    // vSelect,
    // ModelSelect,
  },
  computed: {
    results() {
      return this.$store.state.results;
    },
    defaultValues() {
      const result = this.$store.state.results;

      let defaultArray = {};

      for (let key in result) {
        defaultArray[key] = result[key][0].text;
      }

      return defaultArray;
    },
  },
};
</script>

<style scoped>

</style>