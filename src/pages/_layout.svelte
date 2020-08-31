<script>
  import { Button, SnackbarContainer } from "attractions";
  import { User } from "sveltefire";
  import SignIn from "../components/SignIn.svelte";
  import NavBar from "../components/NavBar.svelte";
  import TopBar from "../components/TopBar.svelte";
</script>

<style>
  .signed-out {
    width: 100%;
    height: 100%;
  }
  .app {
    display: grid;
    grid-template-rows: 80px auto 80px;
    width: 100%;
    height: 100%;
  }
</style>

<SnackbarContainer>
  <User let:auth>
    <div slot="signed-out" class="signed-out">
      <SignIn
        on:click={() => {
          auth.signInAnonymously();
        }} />
    </div>
    <div class="app">
      <!-- Signed In -->
      <TopBar />
      <slot />
      <NavBar />
    </div>
  </User>
</SnackbarContainer>
