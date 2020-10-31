<script>
  import { auth, googleProvider } from "../firebase";
  import Button from "@smui/button";
</script>

<style>
  .container {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
</style>

<div class="container">

  <Button
    on:click={() => {
      auth.signInWithPopup(googleProvider);
    }}>
    Sign in with google
  </Button>
  <Button
    on:click={() => {
      auth.signInAnonymously();
    }}>
    Sign in as guest
  </Button>

</div>
