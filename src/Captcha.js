import CaptchaImage from './CaptchaImage';

export default {
  components: {
    CaptchaImage,
  },
  data() {
    return {
      id: null,
      token: null,
      image: null,
      time: null,
      expires: null,
      process: false,
      updated: null,
      timer: null,
      code: '',
      inc: 0,
    };
  },
  mounted() {
    this.start();
  },
  methods: {
    now() {
      return String(new Date().getTime()).slice(0, -3);
    },
    freze() {
      return (this.now() - this.updated) < 3;
    },
    expired() {
      return this.now() > this.expires;
    },
    update() {
      this.image = null;
      this.start();
    },
    refresh() {
      if (!this.process && this.expired()) {
        this.update();
      }
    },
    renew() {
      if (!this.process && !this.freze()) {
        this.update();
      }
    },
    input(code) {
      this.$emit('input', code);
    },
  },
}
