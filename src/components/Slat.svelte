<script>
  import Dialog, { Title, Content, Actions } from "@smui/dialog";
  import Button, { Label } from "@smui/button";
  import { onDestroy } from "svelte";
  import { fly } from "svelte/transition";

  export let hideDelete = false;
  export let onEdit = () => {};
  export let onDelete = () => {};

  /**
   * @type number
   * */
  export let index;
  let open = false;
  let slatEl;
  let deleteDialog;

  const handleClickOuside = (e) => {
    if (!slatEl || !open) return;
    if (!slatEl.contains(e.target)) {
      open = false;
    }
  };

  document.addEventListener("click", handleClickOuside);

  onDestroy(() => {
    document.removeEventListener("click", handleClickOuside);
  });
</script>

<style lang="scss">
  .slat {
    background: var(--primary-light);
    border-radius: 20px;
    padding: var(--padding);
    min-height: 80px;
    cursor: pointer;
  }
  .slat_main {
    display: grid;
    grid-template-columns: 1fr auto;
  }
  .icons {
    display: flex;
    justify-content: center;
    align-items: center;
    i {
      cursor: pointer;
    }
  }
</style>

<div class="slat" bind:this={slatEl} in:fly={{ x: -20, delay: index * 100 }}>
  <div
    class="slat_main"
    on:click={() => {
      open = !open;
    }}>
    <div>
      <slot />
    </div>
    <div class="icons">
      <i class="material-icons" on:click|stopPropagation={onEdit}>edit</i>
      {#if !hideDelete}
        <i
          class="material-icons"
          on:click|stopPropagation={() => {
            deleteDialog.open();
          }}>
          delete
        </i>
      {/if}
    </div>
  </div>
  {#if open}
    <slot name="open" />
  {/if}
</div>

<Dialog
  bind:this={deleteDialog}
  aria-labelledby="delete-title"
  aria-describedby="delete-content">
  <Title id="delete-title">Delete item?</Title>
  <Content id="delete-content">
    Are you sure you want to delete this item?
  </Content>
  <Actions>
    <Button>
      <Label>No</Label>
    </Button>
    <Button on:click={onDelete}>
      <Label>Yes</Label>
    </Button>
  </Actions>
</Dialog>
