<template>
  <div v-if="!dismissed" class="the-formkit-teaser" ref="banner">
    <div class="container">
      <div class="the-teaser-title">
        <a href="https://www.formkit.com">
          <FormKitLogo />
        </a>
      </div>
      <div class="the-cta">
        <p>
          FormKit is the free & open-source successor to Vue Formulate.<br />
          <strong>Vue 3 support, advanced schema, pro inputs, and more!</strong>
        </p>
        <a href="https://www.formkit.com" class="fk-button">
          Try FormKit!
          <svg viewBox="0 0 14 12" fill="none" data-v-21a21f10="">
            <path
              d="M1.66675 6H12.3334"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></path>
            <path
              d="M7.66675 1.33301L12.3334 5.99968L7.66675 10.6663"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></path>
          </svg>
        </a>
        <span @click="handleDismiss" class="dismiss"> dismiss </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dismissed: true,
      height: 0,
    };
  },
  watch: {
    height() {
      if (this.height) {
        this.setHeight();
      }
    },
  },
  methods: {
    handleDismiss() {
      this.hideBanner();
      this.$cookies.set("vf_fk_public_notice_dismissed", true, "7d");
    },
    hideBanner() {
      this.dismissed = true;
      this.height = 0;
      this.setHeight(true);
    },
    getBannerHeight() {
      if (this.$refs && this.$refs.banner) {
        this.height = Math.ceil(
          this.$refs.banner.getBoundingClientRect().height
        );
      }
    },
    setHeight(force) {
      if ((this.height || force) && typeof document !== "undefined") {
        const main = document.querySelectorAll(".theme-container > main")[0];
        const sidebar = document.querySelectorAll(
          ".theme-container > aside"
        )[0];

        main.style.marginTop = `${this.height}px`;
        sidebar.style.marginTop = `${this.height}px`;
      } else {
        setTimeout(() => {
          this.getBannerHeight();
          this.setHeight();
        }, 100);
      }
    },
  },
  mounted() {
    this.dismissed = this.$cookies.get("vf_fk_public_notice_dismissed");
    if (this.dismissed) {
      this.hideBanner();
    } else {
      window.addEventListener("resize", this.getBannerHeight);
      this.setHeight();
    }
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.getBannerHeight);
  },
};
</script>

<style lang="scss" scoped>
.the-formkit-teaser {
  background: linear-gradient(-20deg, #141028 7.73%, #373741 93.88%);
  background-size: cover;
  background-repeat: no-repeat;
  color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 3rem 1.5rem;
  width: 100%;
  box-sizing: border-box;

  .container {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;

    @media (min-width: 600px) {
      flex-direction: row;
    }
  }
}

.the-teaser-title {
  display: flex;
  flex-grow: 1;
  align-items: center;
  flex-direction: row;
  margin-bottom: 1em;
  margin-top: 0.5em;
  margin-right: 3em;

  @media (min-width: 800px) {
    margin-bottom: 0;
    width: auto;
    flex-grow: unset;
  }
  @media (min-width: 1000px) {
  }

  a {
    display: block;
    margin-top: 5px;
  }

  svg {
    width: 100%;
    margin-right: 0.5em;
    max-width: 7.9375em;
    max-height: 1.5em;

    &.pro-badge {
      width: initial;
      max-width: 2.5em;
    }
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
    width: auto;
    flex-grow: unset;
  }

  p {
    margin: 0 2em 0 0;
    font-size: 0.85em;
    margin-bottom: 0.75em;
    width: 100%;

    @media (min-width: 600px) {
      margin-bottom: 0;
    }
    @media (min-width: 800px) {
      width: auto;
    }
    @media (min-width: 1000px) {
      font-size: 0.95em;
      margin-bottom: 0;

      strong::before {
        content: "";
        white-space: initial;
      }
    }
  }
}

.fk-button {
  padding: 0.75em 1.5em;
  background: linear-gradient(90deg, #f6f6f6 7.73%, #ffffff 93.88%);
  color: #111111;
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
  margin-top: 1em;
  margin-bottom: 1em;
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
