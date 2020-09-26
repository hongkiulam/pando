<script lang="ts">
  export let full: boolean;
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
  @keyframes pulse {
    from {
      opacity: 1;
    }
    to {
      opacity: 0.3;
    }
  }
</style>

<div class="container" class:full>
  <img src="/assets/logo.svg" alt="..." width="20px" height="20px" />
</div>
