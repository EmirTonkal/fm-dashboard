<template>
  <b-nav-item-dropdown
    id="dropdown-grouped"
    variant="link"
    class="dropdown-language"
    right
  >
    <template #button-content>
      <b-img
        :src="currentLocale.img"
        height="14px"
        width="22px"
        :alt="currentLocale.locale"
      />
      <span class="ml-50 text-body">{{ t(currentLocale.name) }}</span>
    </template>
    <b-dropdown-item
      v-for="localeObj in locales"
      :key="localeObj.locale"
      @click="$i18n.locale = localeObj.locale"
    >
      <b-img
        :src="localeObj.img"
        height="14px"
        width="22px"
        :alt="localeObj.locale"
      />
      <span class="ml-50">{{ t(localeObj.name) }}</span>
    </b-dropdown-item>
  </b-nav-item-dropdown>
</template>

<script>
import { BNavItemDropdown, BDropdownItem, BImg } from 'bootstrap-vue';
import { useUtils as useI18nUtils } from '@core/libs/i18n';

export default {
  components: {
    BNavItemDropdown,
    BDropdownItem,
    BImg
  },
  // ! Need to move this computed property to comp function once we get to Vue 3
  computed: {
    currentLocale() {
      return this.locales.find((l) => l.locale === this.$i18n.locale);
    }
  },
  setup() {
    /* eslint-disable global-require */
    const { t } = useI18nUtils();
    const locales = [
      {
        locale: 'tr',
        img: require('@/assets/images/flags/tr.png'),
        name: 'languages.turkish'
      },
      {
        locale: 'en',
        img: require('@/assets/images/flags/en.png'),
        name: 'languages.english'
      }
      /*{
        locale: 'fr',
        img: require('@/assets/images/flags/fr.png'),
        name: 'languages.french'
      },
      {
        locale: 'de',
        img: require('@/assets/images/flags/de.png'),
        name: 'languages.german'
      },
      {
        locale: 'pt',
        img: require('@/assets/images/flags/pt.png'),
        name: 'languages.portuguese'
      } */
    ];
    /* eslint-disable global-require */

    return {
      locales,
      t
    };
  }
};
</script>

<style></style>
