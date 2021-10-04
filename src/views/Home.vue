<template>
  <div>
    <b-card :title="$t('home.startProject')">
      <b-card-text>{{ $t('home.theBest') }}</b-card-text>
      <b-card-text>
        {{ $t('home.pleaseReadMe') }}
      </b-card-text>
    </b-card>

    <b-card :title="$t('home.integrateJWT')">
      <b-card-text>
        {{ $t('home.carefullyJWT') }}
      </b-card-text>
      <b-card-text>
        {{ $t('home.authJWT') }}
      </b-card-text>
    </b-card>
  </div>
</template>

<script>
import { BCard, BCardText } from 'bootstrap-vue';

export default {
  components: {
    BCard,
    BCardText
  }
};
</script>

<style></style>
