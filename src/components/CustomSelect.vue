<template>
  <div class="select">
    <span class="value">Cherry</span>

    <ul class="option-list">
        <li class="option">Cherry</li>
        <li class="option">Lemon</li>
        <li class="option">Banana</li>
        <li class="option">Apple</li>
        <li class="option">Strawberry</li>
    </ul>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
    .select{
        position: relative;

        display: inline-block;

    }

    .select.active,
    .select:focus{
        outline: none;
        box-shadow: 0 0 3px 1px #227755;
    }

    .select .option-list{

        position: absolute;
        top: 100%;
        left: 0;
    }

    .select .option-list.hidden{
        max-height: 0;
        visibility: hidden;
    }

    .select{
        border: 2px solid black;
        border-radius: 4px;
    }
</style>