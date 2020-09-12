<script>
  import Loading from "../components/Loading.svelte";
  import { db } from "../firebase";
</script>

<pre>{JSON.stringify($db, null, 2)}</pre>
