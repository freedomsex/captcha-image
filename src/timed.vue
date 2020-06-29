<script>
import hasher from '@freedomsex/simple-hash';

export default {
  props: ['apiName'],
  methods: {
    wait(time) {
      this.time = time;
      this.timer = setTimeout(this.getToken, time * 1000);
      this.updated = this.now();
    },
    start() {
      this.process = true;
      this.$api.res('time', this.apiName).load({hash: hasher.random()}).then(({data}) => {
        this.id = data.id;
        this.wait(data.time);
      }).catch(() => {
        this.process = false;
      });
    },
    getToken() {
      this.$api.res('token', this.apiName).post({id: this.id}).then(({data}) => {
        if (data.token) {
          this.token = data.token;
          this.expires = data.token.split('.', 3)[1];
          this.$emit('token', this.token);
          this.draw();
        } else {
          this.wait(data.retry);
        }
      }).catch(() => {
        this.process = false;
      });
    },
    draw() {
      this.$api.res(`image/${this.token}`, this.apiName).load().then(({data}) => {
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
  <Image :image="image" @input="input" @renew="renew"/>
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
