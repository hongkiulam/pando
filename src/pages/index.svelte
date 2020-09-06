<script>
  import { db, firestore } from "../firebase";
  $: console.log($db);
</script>

<div>
  Home
  <pre>{JSON.stringify($db, null, 2)}</pre>
</div>
