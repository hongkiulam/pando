<script>
  import Kitchen from "@smui/snackbar/kitchen/index";
  import NavBar from "../components/NavBar.svelte";
  import TopBar from "../components/TopBar.svelte";
  import Loading from "../components/Loading.svelte";
  import Login from "../components/Login.svelte";
  import { db, auth, MY_UID, setDB } from "../firebase";
  import { toast } from "../store";

  let kitchen;

  $: if ($toast && kitchen) {
    kitchen.push($toast);
    $toast = null;
  }

  let user;
  auth.onAuthStateChanged((u) => (user = u));
  $: if (user) {
    if (user.uid === MY_UID) {
      setDB("me");
    } else {
      setDB("guest");
    }
  }
  $: isGuest = user && user.uid !== MY_UID;
</script>

<style>
  .app {
    display: grid;
    grid-template-rows: var(--barHeight) calc(100% - (var(--barHeight) * 2)) var(
        --barHeight
      );
    grid-template-areas: "topbar" "body" "nav";
    width: 100%;
    height: 100%;
  }
  .body {
    grid-area: body;
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
    overflow-y: auto;
    overflow-x: hidden;
  }
  :global(.mdc-snackbar) {
    bottom: calc(var(--barHeight) + 10px) !important;
  }
  .demo_account {
    text-align: center;
    background: var(--medium);
    color: var(--light);
    font-size: 0.7em;
    padding: var(--paddingS);
  }
</style>

<div class="app">
  <TopBar />
  <div class="body">
    {#if isGuest}
      <span class="demo_account">Using demo account</span>
    {/if}
    {#if !user}
      <Login />
    {:else if $db}
      <slot />
    {:else}
      <Loading full />
    {/if}
  </div>
  {#if user}
    <NavBar />
  {/if}
</div>
<Kitchen bind:this={kitchen} />
