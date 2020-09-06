<script lang="ts">
  import { url } from "../store";

  const prettyTitle = {
    "/": "pando",
    "/stats": "stats",
    "/settings": "settings",
    "/add": "add",
  };
</script>

<style>
  .topbar {
    display: grid;
    grid-template-columns: 40px auto 40px;
    align-items: center;
    padding: 10px;
  }
  .title {
    color: var(--primary);
    text-align: center;
  }
  .logo {
    height: 40px;
  }
</style>

<div class="topbar">
  <div />
  <h1 class="title">{prettyTitle[$url]}</h1>
  <img class="logo" src="/assets/logo.svg" alt="logo" />
</div>
