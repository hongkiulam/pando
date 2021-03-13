<script>
  import { auth } from "../../firebase";
  import { goto } from "@sveltech/routify";
  import Button from "@smui/button";
  import Loading from "../Loading.svelte";
  let isLoggingOut = false;
</script>

<style>
  .container {
    padding: var(--padding);
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
  }
  .container span {
    margin-bottom: var(--padding);
  }
</style>

<div class="container">
  <span>Logged in as: {auth.currentUser.displayName || 'Guest'}</span>
  {#if isLoggingOut}
    <Loading inline />
  {:else}
    <Button
      variant="raised"
      on:click={() => {
        isLoggingOut = true;
        auth.signOut().then(() => {
          isLoggingOut = false;
          $goto('/');
        });
      }}
    >
      Sign out
    </Button>
  {/if}
</div>
