<!-- Blank example layout -->
<script>
  export let title = ""
</script>

<style>
</style>

<svelte:head>
  <title>{title || "Unnamend page"}</title>
</svelte:head>

{#if title}
  <h1 class="font-bold text-2xl">{title}</h1>
{/if}
<slot></slot>
