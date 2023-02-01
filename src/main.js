import Vue from "vue";
import App from "./App.vue";
import Vuex from "vuex";
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-select/dist/css/bootstrap-select.min.css'

Vue.config.productionTip = false;

Vue.use(Vuex);
const store = new Vuex.Store({
  state: {
    title: "Form Matching Demo",
    url:"http://127.0.0.1:8080/compare",
    results: {},
    currentPage: "input"
  },
  mutations: {
    setResults(state, payload) {
      state.results = payload;
      state.currentPage = "question"
    },
  },
  actions: {
    async setResults(state, payload) {
    const result = await state.dispatch("getComparison", payload)
    const organisedResult = await state.dispatch("organiseResult", result);
    state.commit("setResults", organisedResult);    
    },

    async getComparison(state, dataToSend) {
      let dataRecieved = "";
      await fetch(this.state.url, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      })
        .then((response) => {
          if (response.status === 200) {
            return response.json();
          } else {
            return Promise.reject("server");
          }
        })
        .then((dataJson) => {
          dataRecieved = dataJson;
        })
        .catch((error) => {
          if (error === "server") return;
          console.log(error);
        });
    
      return dataRecieved;
    },

    organiseResult(state, payload){
    
      var dict = {}

      for (let index = 0; index < payload.length; index++) {
        const element = payload[index];
        if(dict[element.sentence1]){
          
          dict[element.sentence1].push({
            value: element.sentence1.length,
            text: `${element.sentence2}. Score: ${element.score}`
          })
        }else{
          dict[element.sentence1] = [ {
            value: 0,
            text: `${element.sentence2.trim()} Score: ${element.score}`
          } ]
        }
      }

      return dict
    },
  },
});

new Vue({
  store: store,
  render: (h) => h(App),
}).$mount("#app");
