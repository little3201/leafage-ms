<template>
  <div>
    <div class="shadow overflow-hidden sm:rounded-md">
      <div class="px-4 py-5 bg-white space-y-6 sm:p-6 divide-y">
        <fieldset>
          <legend class="text-base font-medium text-gray-900">Privileges</legend>
          <div class="mt-4 space-y-4">
            <div class="flex items-start justify-between">
              <div class="text-sm">
                <label for="comments" class="font-medium text-gray-700">Password</label>
                <input
                  id="comments"
                  name="comments"
                  type="text"
                  class="border-gray-300 rounded cursor-pointer sr-only"
                />
                <p class="text-gray-500">187****3090</p>
              </div>
              <button type="button" class="text-gray-500 hover:text-blue-600">edit</button>
            </div>
          </div>
        </fieldset>
        <fieldset>
          <legend class="text-base font-medium text-gray-900 pr-4">OAuth2</legend>
          <div class="mt-4 space-y-4">
            <div class="flex items-start">
              <div class="flex items-center h-5">
                <input
                  id="comments"
                  name="comments"
                  type="checkbox"
                  class="border-gray-300 rounded cursor-pointer"
                />
              </div>
              <div class="ml-3 text-sm">
                <label for="comments" class="font-medium text-gray-700">Github</label>
                <p class="text-gray-500">{{ new Date().toString() }}</p>
              </div>
            </div>
          </div>
        </fieldset>
      </div>
    </div>
  </div>
</template>


<script lang="ts" setup>

</script>