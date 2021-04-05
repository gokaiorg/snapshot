<template>
  <div>
    <div class="text-center mb-6 mx-auto">
      <Container class="flex items-center">
        <div class="flex-auto text-left">
          <UiButton class="pl-3 col-12 col-lg-4">
            <Search v-model="q" :placeholder="$t('searchPlaceholder')" />
          </UiButton>
        </div>
        <div class="ml-3 text-right hide-sm">
          {{ $tc('spaceCount', [_n(spaces.length)]) }}
          <router-link :to="{ name: 'setup' }" class="hide-md ml-3">
            <UiButton>{{ $t('createSpace') }}</UiButton>
          </router-link>
        </div>
      </Container>
    </div>
    <Container :slim="true">
      <div class="grid grid-cols-4 gap-6">
        <router-link
          v-for="space in spaces.slice(0, limit)"
          :key="space.key"
          :to="{ name: 'proposals', params: { key: space.key } }"
        >
          <Block
            class="text-center extra-icon-container"
            style="height: 250px; margin-bottom: 24px !important"
          >
            <span class="position-relative d-inline-block">
              <UiCounter
                v-if="space._activeProposals"
                :counter="space._activeProposals"
                class="absolute top-6 right-0 counter-green"
              />
              <Token
                :space="space.key"
                symbolIndex="space"
                size="98"
                class="my-3"
              />
            </span>
            <StatefulIcon
              :on="space.favorite"
              onName="star"
              offName="star1"
              @click="toggleFavorite(space.key)"
            />
            <div class="">
              <h3 v-text="space.name" />
              <div class="text-gray">{{ space.symbol }}</div>
            </div>
          </Block>
        </router-link>
        <NoResults
          :block="true"
          :length="Object.keys(spaces).length"
          class="pr-md-4"
        />
      </div>
    </Container>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import orderBy from 'lodash/orderBy';
import spotlight from '@snapshot-labs/snapshot-spaces/spaces/spotlight.json';
import { infiniteScroll } from '@/helpers/utils';

export default {
  data() {
    return {
      q: this.$route.query.q || '',
      limit: 16
    };
  },
  computed: {
    spaces() {
      const list = Object.keys(this.app.spaces)
        .map(key => {
          const spotlightIndex = spotlight.indexOf(key);
          return {
            ...this.app.spaces[key],
            favorite: !!this.favoriteSpaces.favorites[key],
            isActive: !!this.app.spaces[key]._activeProposals,
            spotlight: spotlightIndex === -1 ? 1e3 : spotlightIndex
          };
        })
        .filter(space => !space.private);
      return orderBy(
        list,
        ['favorite', 'spotlight'],
        ['desc', 'asc']
      ).filter(space =>
        JSON.stringify(space).toLowerCase().includes(this.q.toLowerCase())
      );
    }
  },
  methods: {
    ...mapActions([
      'loadFavoriteSpaces',
      'addFavoriteSpace',
      'removeFavoriteSpace'
    ]),
    toggleFavorite(spaceId) {
      if (this.favoriteSpaces.favorites[spaceId]) {
        this.removeFavoriteSpace(spaceId);
      } else {
        this.addFavoriteSpace(spaceId);
      }
    },
    scroll: infiniteScroll
  },
  created() {
    this.loadFavoriteSpaces();
  },
  mounted() {
    this.scroll();
    if (window.screen.height > 1200) this.limit += 16;
  }
};
</script>
