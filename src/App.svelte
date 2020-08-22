<script>
  import { currentRoute } from "./store";
  import Route from "./components/Route.svelte";
  import Link from "./components/Link.svelte";
  import Button from "smelte/src/components/Button";
  import AppBar from "smelte/src/components/AppBar";
  import NavigationDrawer from "smelte/src/components/NavigationDrawer";
  import List from "smelte/src/components/List";
  import ListItem from "smelte/src/components/List/ListItem.svelte";
  const menu = [
    { to: "/button", text: "Button" },
    { to: "/text", text: "Text" },
  ];
  let showDrawer = false;
  $: console.log(showDrawer);
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

Goto
<AppBar>
  <div class="topbar" />
</AppBar>
<NavigationDrawer
  showDesktop={false}
  showMobile={showDrawer}
  persistent={false}>
  <List items={menu}>
    <span slot="item" let:item class="cursor-pointer">
      <Link to={item.to}>
        <ListItem
          selected={$currentRoute === item.to}
          {...item}
          dense
          navigation />
      </Link>
    </span>
  </List>
</NavigationDrawer>
<div class="content">
  <Button
    on:click={() => {
      showDrawer = !showDrawer;
    }}>
    Show Drawer
  </Button>
  <Route route="/button">
    <Button>Click Me!</Button>
    <Button color="secondary">Click Me!</Button>
  </Route>
  <Route route="/text">TEXT</Route>
</div>
