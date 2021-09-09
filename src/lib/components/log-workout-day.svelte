<script
 lang="ts"
>
import { store as authStore } from '$lib/stores/auth';


$: auth = $authStore

const addWorkoutDay = async(didWorkout: boolean = true) => {
  if(!auth.user){
    return
  }

  const res =  await fetch('/api/db/log-workout-day', {
    method: 'POST',
    body: JSON.stringify({
      issuer: auth.user.issuer,
      didWorkout,
      date: new Date().toISOString()
    })
  })
}

</script>

<div class="mb-3 text-center">
	<label for="price" class="block text-sm font-medium text-gray-200">Did you workout today?</label>
	<div class="mt-1 relative rounded-md shadow-sm">
		<div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none" />
	</div>
</div>

<div>
	<button
  on:click={() => addWorkoutDay(true)}
		class="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow text-xs mb-4"
	>
		YES
	</button>
	<button
		class="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow text-xs mb-4"
    on:click={() => addWorkoutDay(false)}

		>
		NO
	</button>
</div>
