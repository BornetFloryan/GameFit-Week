<template>
  <div v-html="svgContent" @mouseover="highlightZone" @mouseleave="resetZone"/>
</template>

<script>
import {ref, onMounted} from 'vue';

export default {
  name: 'InteractiveMap',
  setup() {
    const svgContent = ref(''); // Variable to store the SVG content

    onMounted(async () => {
      const response = await fetch(require('@/assets/svg/Carte GFW.svg'));
      let svg = await response.text();  // Load the SVG

      // Add event listeners to the SVG elements
      svg = svg.replace(/<rect /g, '<rect @mouseover="highlightZone" @mouseleave="resetZone" ');

      svgContent.value = svg;
    });

    const highlightZone = (event) => {
      if (event.target && event.target.id.toLowerCase().startsWith('stand')) {
        event.target.style.fill = 'red'; // Change the color on hover
      }
    };

    const resetZone = (event) => {
      if (event.target && event.target.id.toLowerCase().startsWith('stand')) {
        event.target.style.fill = 'black'; // Change the color on hover
      }
    };

    return {
      svgContent,
      highlightZone,
      resetZone
    };
  }
};
</script>

<style scoped>
/* You can add specific styles for the SVG here */
</style>