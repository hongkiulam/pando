<script lang="ts">
  import { Loading } from "attractions";
  export let full: boolean;
</script>

<style>
  :global(.pando_loading) {
    padding: var(--paddingXL);
  }
  :global(.pando_loading.full) {
    height: 100%;
    width: 100%;
  }
</style>

<Loading class="pando_loading {full && 'full'}" />
