<script lang="ts">
  import Slat from "./Slat.svelte";
  import { db } from "../firebase";
  $: incomeTypes = $db?.incomeTypes || [];
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

{#each incomeTypes as iT}
  <Slat>
    <div class="main_display">
      <div class="column">
        <small>Type</small>
        <h2 class="property">{iT.name}</h2>
      </div>
      <div class="column">
        <small>Frequency</small>
        <h2 class="property">{iT.frequency}</h2>
      </div>
      <div class="column">
        <small>Default</small>
        <h2 class="property">£{iT.default}</h2>
      </div>
    </div>
  </Slat>
{/each}
