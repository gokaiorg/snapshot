<template>
  <Layout>
    <template #content-left>
      <div class="px-6 md:px-0 mb-4">
        <router-link :to="{ name: 'home' }" class="text-gray">
          <Icon name="back" size="22" class="align-middle" />
          {{ $t('backToHome') }}
        </router-link>
      </div>
      <div class="px-4 px-md-0">
        <h1 v-text="$t('setup.createASpace')" class="mb-6" />
      </div>
      <Block>
        <div class="mb-3">
          {{ $t('setup.useExistingEns') }}
        </div>
        <UiButton class="text-left w-full mb-4 flex px-3">
          <input
            v-model="id"
            class="input flex-auto"
            :placeholder="$t('setup.example')"
          />
          <a
            class="block py-1 mr-n2"
            target="_blank"
            href="https://docs.snapshot.org/spaces/create"
          >
            <Icon name="info" size="24" class="text-gray p-1" />
          </a>
        </UiButton>
        <UiButton
          :disabled="!id.includes('.eth') && !id.includes('.xyz')"
          @click="handleSubmit"
          class="button--submit w-full"
        >
          {{ $t('next') }}
        </UiButton>
      </Block>
    </template>
  </Layout>
</template>

<script>
export default {
  data() {
    return {
      id: ''
    };
  },
  methods: {
    handleSubmit() {
      this.$router.push({
        name: 'settings',
        params: { key: this.id.toLowerCase() }
      });
    }
  }
};
</script>
