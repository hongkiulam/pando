<script>
  import { getContext } from "svelte";
  import { currentRoute } from "./store";
  import Route from "./components/Route.svelte";
  import Link from "./components/Link.svelte";
  import { Button, SnackbarContainer } from "attractions";
  import Test from "./components/Test.svelte";

  const menu = [
    { to: "/button", text: "Button" },
    { to: "/text", text: "Text" },
  ];
  let showDrawer = false;
</script>

<style>
  .topbar {
    width: 100%;
    height: 100%;
  }
  .content {
    margin-top: 4rem;
  }
</style>

<SnackbarContainer let:showSnackbar>
  <div class="content">
    <Button
      filled
      on:click={() => {
        showDrawer = !showDrawer;
      }}>
      Show Drawer
    </Button>
    <Route route="/button">
      <Button
        on:click={() => {
          showSnackbar({props:{
            
          }});
        }}>
        Click Me!
      </Button>
      <Button>Click Me!</Button>
    </Route>
    <Route route="/text">TEXT</Route>
  </div>
  <Test />
</SnackbarContainer>
