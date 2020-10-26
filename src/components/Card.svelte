<script lang="ts">
  import { fly } from "svelte/transition";

  export let data: { title: string; content: string }[] = [];
  export let small: boolean = false;
  export let fancy: boolean = false;

  const cardAnimationOptions = {
    x: -20,
    duration: 5000, // we will override this duration, setting to to 10 seconds so that svelte wont remove the animation too soon
  };
</script>

<style lang="scss">
  @mixin staggerAnimation {
    @for $i from 1 through 10 {
      &:nth-of-type(#{$i}) {
        animation-delay: calc(#{$i - 2} * 100ms) !important;
      }
    }
  }
  .card {
    background: var(--primary-light);
    box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.15);
    border-radius: 20px;
    padding: var(--padding);
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    animation-duration: 400ms !important;
    @include staggerAnimation();
  }
  .card_title {
    color: var(--medium);
  }
  .small {
    width: calc(50% - (var(--padding) / 2));
  }
  .fancy {
    color: var(--primary-light);
    background: var(--primary);
    // box-shadow: 0 4px 12px var(--primary);
    position: relative;
    overflow: hidden;
    // background: linear-gradient(90deg, var(--primary) 0%, var(--dark) 500%);

    &::after {
      content: "";
      display: block;
      width: 150%;
      height: 150%;
      background: linear-gradient(338deg, white, transparent);
      opacity: 0.6;
      right: -103px;
      top: -9px;
      position: absolute;
      transform: rotate(-27deg);
      transform-origin: top right;
    }
    .card_title {
      color: inherit;
    }
  }
</style>

<div class="card" class:small class:fancy in:fly={cardAnimationOptions}>
  {#each data as { title, content }}
    <span class="card_title">{title}</span>
    {#if fancy}
      <h1>{content}</h1>
    {:else}
      <h2>{content}</h2>
    {/if}
  {/each}
</div>
