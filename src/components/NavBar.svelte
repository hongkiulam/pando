<script>
  import { url } from "../store";
  import IconButton, { Icon } from "@smui/icon-button";
  import Fab from "@smui/fab";

  const items = [
    ["/", "home"],
    ["/stats", "bar_chart"],
    ["/settings", "tune"],
  ];
</script>

<style>
  .nav {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    background: var(--primary);
    border-top-left-radius: 40px;
    border-top-right-radius: 40px;
    padding: 0 20px;
    /* box-shadow: 0px -2px 4px 0px var(--medium); */
  }
  .active {
    color: var(--dark);
  }
  .inactive {
    color: var(--light);
  }
  /* floating action button */
  .fab {
    transform: translate(0, -20px);
  }
</style>

<nav class="nav">
  {#each items as [href, icon]}
    <div class:inactive={$url !== href} class:active={$url === href}>
      <IconButton
        {href}
        on:click={() => {
          $url = href;
        }}>
        <Icon class="material-icons">{icon}</Icon>
      </IconButton>
    </div>
  {/each}
  <!-- Floating Action Button -->
  <div class="fab">
    <a href="/add">
      <Fab
        color="secondary"
        href="/add"
        on:click={() => {
          $url = '/add';
        }}>
        <Icon class="material-icons">add</Icon>
      </Fab>
    </a>
    <!-- <Button
      filled
      href="/add"
      on:click={() => {
        $url = '/add';
      }}>
      <div class="icon-wrapper">
        <PlusIcon size="32" />
      </div>
    </Button> -->
  </div>
</nav>
