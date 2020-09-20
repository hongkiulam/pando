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
  {#if selectedTab}
    <svelte:component this={tabsToComponent[selectedTab]} />
  {/if}
</div>
