<template>
  <div class="bg-white rounded-md md:overflow-auto">
    <div class="flex items-center p-5 border-b border-gray-200">
      <h2 class="font-medium text-base mr-auto">Change Password</h2>
    </div>
    <div class="p-5">
      <div>
        <label>Old Password</label>
        <input
          type="password"
          class="rounded-md w-full border border-gray-300 mt-1"
          placeholder="Old Password"
        />
      </div>
      <div class="mt-3">
        <label>New Password</label>
        <input
          type="password"
          class="rounded-md w-full border border-gray-300 mt-1"
          placeholder="New Password"
        />
      </div>
      <div class="mt-3">
        <label>Confirm New Password</label>
        <input
          type="password"
          class="rounded-md w-full border border-gray-300 mt-1"
          placeholder="Confirm New Password"
        />
      </div>
      <button type="button" class="p-2 rounded-md bg-blue-700 text-white mt-4 focus:outline-none">
        Change Password
      </button>
    </div>
  </div>
</template>