<script lang="ts">
  import { Tabs } from "attractions";
  export let items: string[];
  export let value: string;
  export let name: string;
</script>

<style>
  :global(.pando_tab) {
    flex: 1;
  }
  :global(.pando_tab .content) {
    width: 100%;
    justify-content: center;
  }
</style>

<Tabs tabClass="pando_tab" {name} {items} bind:value />
