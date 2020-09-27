<script>
  import { onDestroy } from "svelte";
  import Dialog, { Title, Content, Actions } from "@smui/dialog";
  import Button, { Label } from "@smui/button";
  import Ripple from "@smui/ripple";
  import { fly } from "svelte/transition";

  export let hideDelete = false;
  export let onEdit = () => {};
  export let onDelete = () => {};

  let open = false;
  let showActions = false;
  let slatEl;
  let deleteDialog;

  const handleClickOuside = (e) => {
    if (!slatEl || (!open && !showActions)) return;
    if (!slatEl.contains(e.target)) {
      open = false;
      showActions = false;
    }
  };

  document.addEventListener("click", handleClickOuside);

  onDestroy(() => {
    document.removeEventListener("click", handleClickOuside);
  });
</script>

<style lang="scss">
  @mixin staggerAnimation {
    @for $i from 1 through 10 {
      &:nth-of-type(#{$i}) {
        animation-delay: calc(#{$i} * 100ms) !important;
      }
    }
  }
  .slat {
    background: var(--primary-light);
    border-radius: 20px;
    padding: var(--padding);
    width: 100%;
    cursor: pointer;
    @include staggerAnimation();
  }
  .slat_main {
    display: grid;
    grid-template-columns: 1fr auto;
    align-items: center;
    min-height: 60px;
  }
  .action_opener {
    display: flex;
    justify-content: center;
    place-items: center;
    i {
      cursor: pointer;
    }
  }
  .actions {
    display: flex;
    justify-content: space-around;
    i.delete {
      color: var(--danger);
    }
  }
  :global(.delete_dialog_button) {
    background-color: var(--danger) !important;
    color: var(--light) !important;
  }
</style>

<div class="slat" bind:this={slatEl} in:fly={{ x: -20 }}>
  <div
    class="slat_main"
    on:click={() => {
      open = !open;
    }}>

    {#if showActions}
      <div class="actions" in:fly={{ y: 10 }}>
        <i
          class="material-icons"
          on:click|stopPropagation={() => {
            onEdit();
            showActions = false;
          }}>
          edit
        </i>
        {#if !hideDelete}
          <i
            class="material-icons delete"
            on:click|stopPropagation={() => {
              deleteDialog.open();
              showActions = false;
            }}>
            delete
          </i>
        {/if}
      </div>
    {:else}
      <div in:fly={{ y: -10 }}>
        <slot />
      </div>
    {/if}

    <div class="action_opener">
      <i
        class="material-icons"
        on:click|stopPropagation={() => {
          showActions = !showActions;
        }}>
        {#if showActions}close{:else}menu_open{/if}
      </i>
    </div>
  </div>

  {#if open}
    <slot name="open" />
  {/if}

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
      <Button
        on:click={onDelete}
        variant="unelevated"
        class="delete_dialog_button">
        <Label>Yes</Label>
      </Button>
    </Actions>
  </Dialog>

</div>
