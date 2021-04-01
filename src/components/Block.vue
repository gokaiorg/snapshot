<template>
  <div
    class="border-color border-t border-b md:border rounded-none md:rounded-lg block-bg overflow-hidden"
  >
    <h4
      v-if="title"
      class="px-6 pt-3 border-b block bg-gray-dark"
      style="padding-bottom: 12px;"
    >
      {{ title }}
      <UiCounter v-if="counter" :counter="counter" class="ml-1" />
      <a
        v-if="icon"
        @click="$emit('submit')"
        class="float-right text-gray"
        style="padding-top: 2px;"
      >
        <Icon :name="icon" size="22" />
      </a>
    </h4>
    <div :class="!slim && 'p-6 h-full'">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  props: ['title', 'counter', 'slim', 'icon'],
  emits: ['submit']
};
</script>
