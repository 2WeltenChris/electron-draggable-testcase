

<script>
  import { onMount, onDestroy } from 'svelte'
  import { getStore, deleteStoreInScope } from 'p-red/stores'
  export let frame
  export let msg = undefined
  export let global = undefined
  export let _

  // Stores
  
  onMount(() => {
    msg = client.get(frame + ':msg')
    global = client.get('global')
    
  })
  onDestroy(() => {
    deleteStoreInScope('44ce48075f71ad2c')
  })
  // Imports
  import App from 'avtryck-ui-for-p-red/layouts/App.svelte'
  import Row from 'carbon-components-svelte/src/Grid/Row.svelte'
  import Column from 'carbon-components-svelte/src/Grid/Column.svelte'
  // Custom scripts
  
  // Reactive variables
  
</script>

<style>
  
:global(.bx--header) {
          -webkit-app-region: drag;
      }
      :global(.bx--header *) {
          -webkit-app-region: none;
      }
</style>
{#if msg && global}
   
<App bind:global company_name={"Electron"} app_name={"Draggable Testcase"}>
  
      <Row>
        
      <Column>
        <!-- Define draggable region -->

      </Column>
    
      </Row>
    
</App>

{/if}
