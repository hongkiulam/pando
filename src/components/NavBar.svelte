<script>
  import { url } from "../store";
  import Button from "attractions/button";
  import {
    HomeIcon,
    SlidersIcon,
    BarChartIcon,
    PlusIcon,
  } from "svelte-feather-icons";

  const items = [
    ["/", HomeIcon],
    ["/stats", BarChartIcon],
    ["/settings", SlidersIcon],
  ];
</script>

<style>
  .nav {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    background: var(--primary);
    border-top-left-radius: 40px;
    border-top-right-radius: 40px;
  }
  .active {
    color: var(--dark);
  }
  .icon-wrapper :global(svg) {
    display: block;
  }
  /* override button styles */
  .nav :global(.btn.filled) {
    box-shadow: none;
    background-image: none;
  }
  .nav :global(.btn.filled:focus:not([disabled])) {
    box-shadow: none;
    background-image: none;
  }
  .nav :global(.btn.filled:hover:not([disabled])) {
    box-shadow: none;
    background-image: none;
  }
</style>

<nav class="nav">
  {#each items as [href, Icon]}
    <Button
      round
      filled
      {href}
      on:click={() => {
        $url = href;
      }}>
      <div class:active={href === $url} class="icon-wrapper">
        <Icon size="32" />
      </div>
    </Button>
  {/each}
  <!-- Floating Action Button -->
  <Button
    round
    filled
    href="/add"
    on:click={() => {
      $url = '/add';
    }}>
    <div class:active={'/add' === $url} class="icon-wrapper">
      <PlusIcon size="32" />
    </div>
  </Button>
</nav>
