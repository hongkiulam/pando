<script>
  import swipe from "../utils/swipe";
  import swipeTabChange from "../utils/swipeTabChange";
  export let tabs;
  export let selectedTab;
  export let tabsToComponent;
</script>

<style>
  .container {
    padding: var(--padding);
    flex: 1;
  }
  .component_container {
    display: grid;
    grid-auto-flow: row;
    gap: var(--padding);
  }
</style>

<div
  class="container"
  use:swipe
  on:swipeleft={() => {
    selectedTab = swipeTabChange(tabs, selectedTab, 1);
  }}
  on:swiperight={() => {
    selectedTab = swipeTabChange(tabs, selectedTab, -1);
  }}>
  <div class="component_container">
    <svelte:component this={tabsToComponent[selectedTab]} />
  </div>
</div>
