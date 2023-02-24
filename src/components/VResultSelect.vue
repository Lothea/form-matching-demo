<template>
        <select class="col form-select text-wrap" :value="match.text" @change="$emit('change',$event)">
        <option
          v-for="(item, index) in row"
          v-bind:key="index"
          v-bind:value="item.text"
          v-bind:title="item.text"
          required
        >
            {{item.text}}
        </option>
      </select>
</template>

<script>
    export default {
        props: {
            match: {
                type: Object,
            },
            row: {
                type: Array,
            },
        },
    }
</script>

<style  scoped>

</style>