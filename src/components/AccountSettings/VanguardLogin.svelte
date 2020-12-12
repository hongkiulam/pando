<script>
  import Button, { Label } from "@smui/button";
  import TextField from "@smui/textfield";
  import Dialog, { Title, Content, Actions } from "@smui/dialog";
  import { vanguardCredentials, vanguardLoggedIn } from "../../store";
  import { vg } from "../../actions";
  import Loading from "../Loading.svelte";

  let vgLoginDialog;
  let username = "";
  let password = "";
  let validLogin = true;
  let loginLoading = false;

  const login = async () => {
    loginLoading = true;
    validLogin = await vg.authorise(username, password);
    loginLoading = false;
    if (validLogin) {
      $vanguardCredentials = { username, password };
      localStorage.setItem("vgUsername", username);
      localStorage.setItem("vgPassword", password);
      vgLoginDialog.close();
    }
  };

  const logout = () => {
    $vanguardCredentials = { username: null, password: null };
    localStorage.removeItem("vgUsername");
    localStorage.removeItem("vgPassword");
  };
</script>

<style>
  .container {
    padding: var(--padding);
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
  }
  .container span {
    margin-bottom: var(--padding);
  }
  .login_error {
    color: var(--danger);
  }
  .login_footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: var(--padding) 0;
  }
</style>

<div class="container">
  <span>
    (Vanguard)
    {#if $vanguardLoggedIn}Logged in as:{:else}Not Logged In{/if}
  </span>
  {#if $vanguardLoggedIn}
    <span>{$vanguardCredentials.username}</span>
  {/if}
  <Button
    variant="raised"
    on:click={() => {
      if ($vanguardLoggedIn) {
        logout();
      } else {
        vgLoginDialog.open();
      }
    }}>
    Vanguard {$vanguardLoggedIn ? 'Logout' : 'Login'}
  </Button>
</div>
<!-- Modal -->
<Dialog
  bind:this={vgLoginDialog}
  aria-labelledby="vg-login-title"
  aria-describedby="vg-login-content">
  <Title id="vg-login-title">Login to Vanguard</Title>
  <Content id="vg-login-content">
    <TextField label="Username" bind:value={username} style="width:100%" />
    <TextField
      type="password"
      label="Password"
      bind:value={password}
      style="width:100%" />
    <div class="login_footer">

      {#if loginLoading}
        <Loading inline />
      {:else if !validLogin}
        <span class="login_error">Invalid Login</span>
      {:else}&nbsp;{/if}
      <Button on:click={login} variant="unelevated" disabled={loginLoading}>
        <Label>Login</Label>
      </Button>
    </div>
  </Content>
</Dialog>
