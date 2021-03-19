<template>
  <main class="grid place-items-center min-h-screen">
    <label class="flex items-center relative cursor-pointer select-none">
      <span class="text-lg font-bold mr-3">Toggle</span>
      <input
        type="checkbox"
        class="appearance-none transition-colors cursor-pointer w-14 h-7 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-4 focus:ring-offset-gray-800 focus:ring-blue-500"
      />
      <span class="absolute font-medium text-xs uppercase right-1"> OFF </span>
      <span class="absolute font-medium text-xs uppercase right-8"> ON </span>
      <span class="w-7 h-7 absolute rounded-full transition-all bg-gray-200" />
    </label>
  </main>
</template>


<style>
body {
  background-color: rgba(
    31,
    41,
    55
  ); /* cool gray 800 =>  bg-gray-800 (default config) */
  color: white;
}

input {
  background-color: #ef4444; /* bg-red-500 */
}

input:checked {
  background-color: #22c55e; /* bg-green-500 */
}

input ~ span:last-child {
  right: 1.75rem; /* right-7 */
}

input:checked ~ span:last-child {
  right: 0; /* right-0 */
}
</style>