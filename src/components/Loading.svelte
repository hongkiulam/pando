<script lang="ts">
  export let full: boolean;
  export let inline: boolean;
</script>

<style>
  .container {
    padding: var(--paddingXL);
    display: grid;
    place-items: center;
  }
  .container img {
    animation: pulse 0.3s ease infinite alternate;
  }
  .full {
    height: 100%;
    width: 100%;
  }
  .inline {
    padding: var(--paddingS);
  }
  @keyframes pulse {
    from {
      opacity: 1;
    }
    to {
      opacity: 0.3;
    }
  }
</style>

<div class="container" class:full class:inline>
  <img src="/assets/logo.svg" alt="..." width="20px" height="20px" />
</div>
