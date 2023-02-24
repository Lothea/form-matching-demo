<template>
  <form class="container mt-5" @submit.prevent="onSubmit">
    <div class="row">
      <h2 class="col text-primary">Form one</h2>
      <h2 class="col text-primary">Mapped Questions</h2>
    </div>
    <div class="row pb-5 pt-5 border-top" v-for="(row, key) in results" v-bind:key="key">
      <div class="col"><p>{{ key }}</p></div>
      <v-result-select :row="row" :match="selected[key]" @change="onChange($event, key)"></v-result-select>
    </div>
    <input type="submit" @click="onSubmit"/>
  </form>
</template>

<script>
import { mapState } from 'vuex';
import VResultSelect from './VResultSelect.vue';

export default {
  components: { VResultSelect },
  data(){
    return{
      selected: {},
    }
  },
  computed: {
    ...mapState(['results', 'formTwo'])
  },
  created(){
    for (const key in this.results) {
      if (Object.hasOwnProperty.call(this.results, key)) {
        const element = this.results[key];
        this.selected[key] = element[0];
      }
    }
  },
  methods:{
    onSubmit(){
      let unmatchedInsurerQuestions = []

      let insurerQuestions = Object.keys(this.selected).map((key) => {
        return this.selected[key].text.replace(/Score: (0\.\d*|\d*)/, "").trim();
      });


      this.formTwo.forEach(item => {
        if(insurerQuestions.indexOf(item) === -1){
          unmatchedInsurerQuestions.push(item)
        }
      })

      // get matched:
      let matched = this.selected;

      let unmatchedBrokerQuestions = [];
      
      Object.keys(this.selected).forEach(key=>{
        console.log(this.selected[key].text);
        if(this.selected[key].text === "No match"){
          unmatchedBrokerQuestions.push(key);
          delete matched[key];
        }
      })
  
      let result = {
        matched: matched,
        unmatchedBrokerQuestions:unmatchedBrokerQuestions,
        unmatchedInsurerQuestions: unmatchedInsurerQuestions
      }

      console.log("Results", result);
    },
    onChange(event, key){
      this.selected[key].text = event.target.value
    }
  },
};
</script>

<style scoped>
</style>