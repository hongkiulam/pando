<script>
  import { url } from "../store";
  import { Button } from "attractions";
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
    padding: 0 20px;
    box-shadow: 0px -2px 4px 0px var(--medium);
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
  /* floating action button */
  .fab {
    transform: translate(0, -20px);
    width: 70px;
    height: 70px;
  }
  .fab :global(.btn.filled),
  .fab :global(.btn.filled:hover),
  .fab :global(.btn.filled:focus) {
    background: var(--secondary);
    height: 100%;
    width: 100%;
    justify-content: center;
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
  <div class="fab">
    <Button
      filled
      href="/add"
      on:click={() => {
        $url = '/add';
      }}>
      <div class="icon-wrapper">
        <PlusIcon size="32" />
      </div>
    </Button>
  </div>
</nav>
