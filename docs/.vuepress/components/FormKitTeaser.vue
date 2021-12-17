<template>
  <div
    v-if="!dismissed"
    class="the-formkit-teaser"
    ref="banner"
    :style="`background-image: url('/assets/img/fk-background.png');`"
  >
    <div class="the-teaser-title">
      <FormKitLogo />
      <h4>is now in private beta.</h4>
    </div>
    <div class="the-cta">
      <p>Vue 3 support, better everything, and PRO inputs.</p>
      <a target="_blank" href="https://www.formkit.com" class="fk-button">
        Sign up now!
        <svg viewBox="0 0 14 12" fill="none" data-v-21a21f10=""><path d="M1.66675 6H12.3334" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M7.66675 1.33301L12.3334 5.99968L7.66675 10.6663" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>
      </a>
      <span
        @click="handleDismiss"
        class="dismiss"
      >
        dismiss
      </span>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      dismissed: false,
      height: 0
    }
  },
  watch: {
    height () {
      if (this.height) {
        this.setHeight()
      }
    }
  },
  methods: {
    handleDismiss () {
      this.hideBanner()
      this.$cookies.set('vf_fk_notice_dismissed', true, '7d')
    },
    hideBanner () {
      this.dismissed = true
      this.height = 0
      this.setHeight(true)
    },
    getBannerHeight () {
      if (this.$refs && this.$refs.banner) {
        this.height = Math.ceil(this.$refs.banner.getBoundingClientRect().height)
      }
    },
    setHeight (force) {
      if ((this.height || force) && typeof document !== 'undefined') {
        const main = document.querySelectorAll('.theme-container > main')[0]
        const sidebar = document.querySelectorAll('.theme-container > aside')[0]

        main.style.marginTop = `${this.height}px`
        sidebar.style.marginTop = `${this.height}px`
      } else {
        setTimeout(() => {
          this.getBannerHeight()
          this.setHeight()
        }, 100)
      }
    }
  },
  created () {
    if (typeof document !== 'undefined') {
      this.dismissed = this.$cookies.get('vf_fk_notice_dismissed')
      if (this.dismissed) {
        this.hideBanner()
      }
    }
  },
  mounted () {
    this.dismissed = this.$cookies.get('vf_fk_notice_dismissed')
    if (this.dismissed) {
      this.hideBanner()
    } else {
      window.addEventListener('resize', this.getBannerHeight)
      this.setHeight()
    }
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.getBannerHeight)
  }
}
</script>

<style lang="scss" scoped>
.the-formkit-teaser {
  background-color: #000;
  background-size: cover;
  background-repeat: no-repeat;
  color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 1.5rem;
  flex-direction: column;
  width: 100%;
  box-sizing: border-box;

  @media (min-width: 800px) {
    flex-direction: row;
  }
}

.the-teaser-title {
  display: flex;
  flex-grow: 1;
  align-items: flex-end;
  flex-direction: row;
  width: 100%;
  margin-bottom: 1em;

  @media (min-width: 800px) {
    margin-bottom: 0;
  }
  @media (min-width: 1000px) {
    width: 40%;
  }

  svg {
    width: 100%;
    margin-right: 0.5em;
    max-width: 7.9375em;
    max-height: 1.5em;
  }
  h4 {
    margin: 0;
    position: relative;
    top: -0.05em;
    font-size: 0.85em;

    @media (min-width: 500px) {
      font-size: 1em;
    }
  }
}

.the-cta {
  display: flex;
  flex-grow: 1;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
  width: 100%;

  @media (min-width: 600px) {
    flex-wrap: nowrap;
  }
  @media (min-width: 800px) {
    flex-wrap: wrap;
    justify-content: flex-end;
  }
  @media (min-width: 1000px) {
    flex-wrap: nowrap;
    width: 60%;
  }

  p {
    margin: 0;
    font-size: 0.85em;
    margin-bottom: 0.75em;
    width: 100%;

    @media (min-width: 600px) {
      margin-bottom: 0;
    }
    @media (min-width: 800px) {
      width: auto;
      margin-bottom: 0.75em;
    }
    @media (min-width: 1000px) {
      margin-right: 2em;
      margin-bottom: 0;
    }
  }
}

.fk-button {
  padding: 0.75em 1.5em;
  background: linear-gradient(90deg, #ff985d 7.73%, #f3742b 93.88%);
  color: #fff;
  font-weight: bold;
  display: flex;
  border-radius: 0.33em;
  white-space: nowrap;

  svg {
    margin-left: 0.5em;
    width: 1em;
    height: 1em;
    position: relative;
    top: 0.15em;
  }
}

.dismiss {
  margin-left: 2rem;
  font-size: 0.85em;
  opacity: 0.66;
  text-decoration: underline;
  color: #eee;
  cursor: pointer;

  &:hover {
    opacity: 1;
  }
}
</style>
