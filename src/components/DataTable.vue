<template>
  <div class="flex flex-col px-10">
    <div class="-m-1.5 overflow-x-auto">
      <div class="p-1.5 min-w-full inline-block align-middle">
        <div class="border rounded-lg overflow-hidden">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <slot name="header"></slot>
            </thead>
            <tbody class="divide-y divide-gray-200">
              <slot name="body"></slot>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
