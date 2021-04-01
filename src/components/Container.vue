<template>
  <div
    :class="slim ? 'px-0 md:px-6' : 'px-6'"
    class="container max-w-screen-lg mx-auto"
  >
    <slot />
  </div>
</template>

<script>
export default {
  props: {
    slim: Boolean
  }
};
</script>
