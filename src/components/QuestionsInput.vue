<template>
  <form v-on:submit.prevent="handleSubmit">
    <div class="text-container">
      <div class="textarea-container">
        <label for="">Form one</label>
        <textarea v-model="firstForm" id="first_form" required></textarea>
      </div>

      <div class="textarea-container">
        <label>Form two</label>
        <textarea v-model="secondForm" id="second_form" required></textarea>
      </div>
    </div>
    <input type="submit" />
  </form>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  data() {
    return {
      firstForm: `cat \ndog \nweasle`,
      secondForm: `pet \nshot \nbet`,
    };
  },
  methods: {
    handleSubmit() {
      const firstForm = this.firstForm.split("\n");
      const secondForm = this.secondForm.split("\n");

      for(let i = 0; i<firstForm.length; i++){
        firstForm[i] = firstForm[i].trim()
      }

      for (let i = 0; i < secondForm.length; i++) {
        secondForm[i] = secondForm[i].trim();
        
      }
      this.$store.dispatch("setResults", {
        sentences1: firstForm,
        sentences2: secondForm
      })
    },
    ...mapActions(["setResults"])
  },

};
</script>

<style>
form {
  padding: 0 48px;
}

label {
  display: block;
  font-size: 19.2px;
  font-weight: bold;
}

textarea {
  width: 95%;
  padding: 1rem;
  height: 90%;
  resize: none;
  border-radius: 4px;

  margin-top: 1rem;
}

.text-container {
  display: flex;
  margin-top: 76px;
  height: 65vh;
  flex-direction: row;
  justify-content: space-between;
}

#first_form::before {
  content: "first";
}

input[type="submit"] {
  display: inline-block;
  margin-top: 2rem;
  padding: 1rem;
  width: 100%;

  border-radius: 4px;
  background-color: white;

  cursor: pointer;
}

input[type="submit"]:hover {
  background-color: black;
  color: white;
}

.textarea-container {
  width: 48%;
  height: 96%;
}
</style>