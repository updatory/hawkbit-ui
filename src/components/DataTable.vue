<template>
  <div class="flex flex-col">
    <div class="overflow-x-auto">
      <div class="min-w-full inline-block align-middle">
        <div class="flex-grow">
          <table class="relative min-w-full divide-y divide-gray-200 dark:divide-gray-700 border-t">
            <thead>
              <slot name="header"></slot>
            </thead>
            <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
              <slot name="body"></slot>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts"></script>
