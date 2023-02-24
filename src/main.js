import Vue from "vue";
import App from "./App.vue";
import Vuex from "vuex";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-select/dist/css/bootstrap-select.min.css";

Vue.config.productionTip = false;

Vue.use(Vuex);
const store = new Vuex.Store({
  state: {
    title: "Form Matching Demo",
    url: "https://sentencecompare.azurewebsites.net//compare",
    results: {},
    unwrappedResults: {},
    filteredResults: {},
    tabulatedResults: [],
    unmatchedQuestions: [],
    currentPage: "input",
    formOne: {},
    formTwo: {},
  },
  mutations: {
    setResults(state, payload) {
      state.results = payload;
      state.currentPage = "question";
    },
    setUnwrappedResults(state, payload) {
      state.unwrappedResults = payload;
    },
    setTabulatedResults(state, payload) {
      state.tabulatedResults = payload;
    },
    setFormOne(state, payload) {
      state.formOne = payload;
    },
    setFormTwo(state, payload) {
      state.formTwo = payload;
    },
  },
  actions: {
    async setResults(state, payload) {
      const result = await state.dispatch("getComparison", payload);
      const organisedResult = await state.dispatch("organiseResult", result);

      state.commit("setResults", organisedResult);

      
      const unwrappedResults = await state.dispatch("unwrapResults");
      state.commit("setUnwrappedResults", unwrappedResults);

      const array = await state.dispatch("tabulateResults");
      state.commit("setTabulatedResults", array);
    },
    async getComparison(state, dataToSend) {
      state.commit("setFormOne", dataToSend.sentences1);
      state.commit("setFormTwo", dataToSend.sentences2);

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
    organiseResult(state, payload) {
      var dict = {};
      for (let index = 0; index < payload.length; index++) {
        const element = payload[index];
        if (dict[element.sentence1]) {
          dict[element.sentence1].push({
            text: `${element.sentence2}${
              /(\.|\?)/.test(element.sentence2) ? "" : "?"
            } Score: ${element.score}`,
          });
        } else {
          dict[element.sentence1] = [
            {
              text: `${element.sentence2.trim()} Score: ${element.score}`,
            },
          ];
        }
      }
      Object.keys(dict).forEach((question) => {
        dict[question].push({ text: "No match" });
      });

      return dict;
    },
    unwrapResults(state) {
      console.log(JSON.parse(JSON.stringify(state.state.results)));
      let dict = JSON.parse(JSON.stringify(state.state.results));
      let newDict = {};
      Object.keys(dict).forEach((key) => {
        let result = dict[key].map((item) => {
          return item.text;
        });
        newDict[key] = result;
      });
      return newDict;
    },
    tabulateResults(state) {
      let dict = JSON.parse(JSON.stringify(state.state.results));
      let array = [];
      Object.keys(dict).forEach((key) => {
        dict[key].forEach((item, index) => {
          if (index === 0) {
            array.push({ question: key, match: item.text });
          } else {
            array.push({ question: "", match: item.text });
          }
        });
      });
      return array;
    },
    filterResults(state, payload) {
      Object.keys(payload).forEach((key) => {
        let firstResult = payload[key][0];
        let scoreRegex = /Score: (0\.\d*|\d*)/;
        let score = firstResult.match(scoreRegex).match(/(0\.\d*|\d*)/);

        if(parseInt(score) < 0.3){
          firstResult[key] = [{text: "No match"}];
        }

      });

      return payload;
    },
  },
});
new Vue({
  store: store,
  render: (h) => h(App),
}).$mount("#app");
