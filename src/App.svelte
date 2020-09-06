<script>
  import { Router } from "@sveltech/routify";
  import { routes } from "@sveltech/routify/tmp/routes";
  import { FirebaseApp } from "sveltefire";
  import { firebase } from "./firebase.ts";
</script>

<FirebaseApp {firebase}>
  <Router {routes} />
</FirebaseApp>
