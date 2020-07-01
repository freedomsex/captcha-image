<script>
import Captcha from './Captcha';

export default {
  props: ['apiName'],
  mixins: [Captcha],
  methods: {
    start() {
      this.$api.res('captcha/image', this.apiName).load().then(({data}) => {
        this.token = data.token;
        this.expires = data.token.split('.', 3)[1];
        this.$emit('token', this.token);
        this.process = false;
        this.image = `data:image/jpeg;base64,${data.image}`;
        this.updated = this.now();
        this.inc += 1;
      }).catch(() => {
        this.process = false;
      });
    },
  },
};
</script>

<template>
  <CaptchaImage :image="image" @input="input" @renew="renew"/>
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
