<script>
  import { auth } from "../../firebase";
  import { goto } from "@sveltech/routify";
  import Button from "@smui/button";
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
  <Button
    variant="raised"
    on:click={() => {
      auth.signOut();
      $goto('/');
    }}>
    Sign out
  </Button>
</div>
