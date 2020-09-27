<script lang="ts">
  import { billSettings } from "../actions";

  import { db } from "../firebase";
  import Slat from "./Slat.svelte";
  $: billTypes = $db?.billTypes || [];
</script>

<style>
  .main_display {
    display: grid;
    grid-template-columns: minmax(100px, 1fr) 1fr 1fr;
    gap: var(--paddingS);
  }
  .column {
    text-align: center;
    display: flex;
    flex-direction: column;
  }
  .property {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
</style>

{#each billTypes as bT}
  <Slat onEdit={() => {}}>
    <div class="main_display">
      <div class="column">
        <small>Type</small>
        <h2 class="property">{bT.name}</h2>
      </div>
      <div class="column">
        <small>Frequency</small>
        <h2 class="property">{bT.frequency}</h2>
      </div>
      <div class="column">
        <small>Default</small>
        <h2 class="property">£{bT.default}</h2>
      </div>
    </div>
  </Slat>
{/each}
