<script>
  import { Button, SnackbarContainer } from "attractions";
  import SignIn from "../components/SignIn.svelte";
  import NavBar from "../components/NavBar.svelte";
  import TopBar from "../components/TopBar.svelte";
</script>

<style>
  .app {
    display: grid;
    grid-template-rows: 80px auto 80px;
    width: 100%;
    height: 100%;
  }
</style>

<SnackbarContainer>
  <div class="app">
    <TopBar />
    <slot />
    <NavBar />
  </div>
</SnackbarContainer>
