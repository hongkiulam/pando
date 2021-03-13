<script>
  import Logout from "./Logout.svelte";
  import VanguardLogin from "./VanguardLogin.svelte";
  import { user } from "../../store";
</script>

<style>

</style>

<Logout />
{#if !$user.isGuest}
  <VanguardLogin />
{/if}
