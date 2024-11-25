<template>
  <div>
    <NavView />
    <BracketsDisplay />
  </div>
</template>


<script>

import {defineComponent} from "vue";
import NavView from "@/components/NavBar.vue";
import BracketsDisplay from "@/components/BracketsDisplay.vue";


export default defineComponent({
  components: {NavView,BracketsDisplay}
})
</script>

<style scoped>

</style>