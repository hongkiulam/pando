<script>
  import { Button, SnackbarContainer } from "attractions";
  import { User } from "sveltefire";
  import SignIn from "../components/SignIn.svelte";
</script>

<style>
  .signed-out {
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
    <!-- Signed In -->
    <slot />
  </User>
</SnackbarContainer>
