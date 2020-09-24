<script>
  import { SnackbarContainer } from "attractions";
  import NavBar from "../components/NavBar.svelte";
  import TopBar from "../components/TopBar.svelte";
  import Loading from "../components/Loading.svelte";
  import { db } from "../firebase";
</script>

<style>
  .app {
    display: grid;
    grid-template-rows: var(--barHeight) calc(100% - (var(--barHeight) * 2)) var(
        --barHeight
      );
    width: 100%;
    height: 100%;
  }
  .body {
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
    overflow-y: auto;
    overflow-x: hidden;
  }
</style>

<SnackbarContainer>
  <div class="app">
    <TopBar />
    <div class="body">
      {#if $db}
        <slot />
      {:else}
        <Loading full />
      {/if}
    </div>
    <NavBar />
  </div>
</SnackbarContainer>
