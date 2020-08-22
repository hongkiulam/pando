<script lang="ts">
  import { currentRoute } from "../store";
  export let route;
  $: console.log($currentRoute);
</script>

{#if $currentRoute === route}
  <slot />
{/if}
