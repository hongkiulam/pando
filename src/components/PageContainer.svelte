<script>
  import swipe from "../utils/swipe";
  import swipeTabChange from "../utils/swipeTabChange";
  export let tabs;
  export let selectedTab;
  export let onTabChange = () => {};
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
    onTabChange(swipeTabChange(tabs, selectedTab, 1));
  }}
  on:swiperight={() => {
    onTabChange(swipeTabChange(tabs, selectedTab, -1));
  }}>
  <slot />
</div>
