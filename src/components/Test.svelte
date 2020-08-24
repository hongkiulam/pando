<script>
  import { getContext } from "svelte";
  import { snackbarContextKey } from "attractions/snackbar";

  const showSnackbar = getContext(snackbarContextKey);
  showSnackbar({
    props: {
      text: "error",
      action: {
        text: "fix",
        callback: () => {
          console.log("clicked error snackbar");
        },
      },
    },
  });
</script>

<h1>hihihi</h1>
