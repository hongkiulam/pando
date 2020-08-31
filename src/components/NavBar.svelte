<script>
  import { isActive, url } from "@sveltech/routify";
  import Button from "attractions/button";
  import { HomeIcon, SlidersIcon, BarChartIcon } from "svelte-feather-icons";
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
  /* override button styles */
  :global(.nav .btn.filled) {
    box-shadow: none;
    background-image: none;
  }
  :global(.nav .btn.filled:focus:not([disabled])) {
    box-shadow: none;
    background-image: none;
  }
  :global(.nav .btn.filled:hover:not([disabled])) {
    box-shadow: none;
    background-image: none;
  }
</style>

<nav class="nav">
  <Button round filled href={$url('/')}>
    <HomeIcon size="32" />
  </Button>
  <Button round filled href={$url('/stats')}>
    <BarChartIcon size="32" />
  </Button>
  <Button round filled href={$url('/settings')}>
    <SlidersIcon size="32" />
  </Button>
</nav>
