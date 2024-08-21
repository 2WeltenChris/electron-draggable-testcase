<script>
  import { onMount } from 'svelte'
  import { init } from 'p-red/client.js'

  let page
  let global
  let _

  onMount(() => {
    [page, global, _] = init()
  })
</script>

<style>
</style>

{#if $page && $global && _}
  <svelte:component this={$page} frame={'page'} bind:global {_} />
{/if}