<script>
export default {
  props: ['image'],
  data() {
    return { };
  },
  methods: {
    renew() {
      this.$emit('renew');
    },
    input() {
      this.$emit('input', this.code);
    },
  },
};
</script>

<template>
  <div class="simple-captcha"  style="max-width: 270px;">
    <div class="activity-section__tile">
      <div class="image-field" @click="renew()">
        <div class="image-field__addon">
          <i class="material-icons">arrow_downward</i>
        </div>
        <div class="image-field__image">
          <img :src="image" v-if="image"  width="100" height="50">
          <span class="image-field__loader" v-else>•••</span>
        </div>
      </div>
    </div>
    <div class="activity-section__tile">
      <div class="control">
        <input class="input" type="tel"
         placeholder="Введите код"
         inputmode="numeric" autocomplete="off"
         v-model="code"
         @change="input">
      </div>
    </div>
  </div>
</template>

<style lang="less">
.simple-captcha {
  .image-field {
    border: 1px solid @gray-light;
    border-radius: 4px;
    display: flex;
    align-items: stretch;
    min-height: 55px;
    &__addon {
      display: flex;
      align-items: center;
      padding: @indent-sm;
      background: @smoke;
      span {
        color: @carbon;
        font-size: 18px;
      }
    }
    &__image {
      flex: 1 0 auto;
      display: flex;
      align-items: center;
      justify-content: space-around;
      img {
        margin: 0;
      }
    }
    &__loader {
      color: @gray-light;
      font-size: 38px;
      line-height: 1;
    }
  }

}
</style>
