<script>
  import { getContext } from "svelte";
  import { snackbarContextKey } from "attractions/snackbar";
  import Button from "attractions/button";

  const showSnackbar = getContext(snackbarContextKey);
</script>

<Button
  on:click={() => {
    showSnackbar({ props: { text: 'from test snackbar context' } });
  }}>
  Show snackbar from test snackbar context
</Button>
