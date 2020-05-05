<template>
  <div class="subscribe-box-container">
    <div class="subscribe-box">
      <div class="updates-dropdown-nav nav-items-6">
        <a
          class="update-tab update-email active"
          :data-active="activeTab === 'email'"
          @click="activeTab = 'email'"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M502.3 190.8c3.9-3.1 9.7-.2 9.7 4.7V400c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V195.6c0-5 5.7-7.8 9.7-4.7 22.4 17.4 52.1 39.5 154.1 113.6 21.1 15.4 56.7 47.8 92.2 47.6 35.7.3 72-32.8 92.3-47.6 102-74.1 131.6-96.3 154-113.7zM256 320c23.2.4 56.6-29.2 73.4-41.4 132.7-96.3 142.8-104.7 173.4-128.7 5.8-4.5 9.2-11.5 9.2-18.9v-19c0-26.5-21.5-48-48-48H48C21.5 64 0 85.5 0 112v19c0 7.4 3.4 14.3 9.2 18.9 30.6 23.9 40.7 32.4 173.4 128.7 16.8 12.2 50.2 41.8 73.4 41.4z"></path></svg>
        </a>
        <a
          class="update-tab update-twitter"
          :data-active="activeTab === 'twitter'"
          @click="activeTab = 'twitter'"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M400 32H48C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48zm-48.9 158.8c.2 2.8.2 5.7.2 8.5 0 86.7-66 186.6-186.6 186.6-37.2 0-71.7-10.8-100.7-29.4 5.3.6 10.4.8 15.8.8 30.7 0 58.9-10.4 81.4-28-28.8-.6-53-19.5-61.3-45.5 10.1 1.5 19.2 1.5 29.6-1.2-30-6.1-52.5-32.5-52.5-64.4v-.8c8.7 4.9 18.9 7.9 29.6 8.3a65.447 65.447 0 0 1-29.2-54.6c0-12.2 3.2-23.4 8.9-33.1 32.3 39.8 80.8 65.8 135.2 68.6-9.3-44.5 24-80.6 64-80.6 18.9 0 35.9 7.9 47.9 20.7 14.8-2.8 29-8.3 41.6-15.8-4.9 15.2-15.2 28-28.8 36.1 13.2-1.4 26-5.1 37.8-10.2-8.9 13.1-20.1 24.7-32.9 34z"></path></svg>
        </a>
        <a
          class="update-tab update-github"
          :data-active="activeTab === 'github'"
          @click="activeTab = 'github'"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M400 32H48C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48zM277.3 415.7c-8.4 1.5-11.5-3.7-11.5-8 0-5.4.2-33 .2-55.3 0-15.6-5.2-25.5-11.3-30.7 37-4.1 76-9.2 76-73.1 0-18.2-6.5-27.3-17.1-39 1.7-4.3 7.4-22-1.7-45-13.9-4.3-45.7 17.9-45.7 17.9-13.2-3.7-27.5-5.6-41.6-5.6-14.1 0-28.4 1.9-41.6 5.6 0 0-31.8-22.2-45.7-17.9-9.1 22.9-3.5 40.6-1.7 45-10.6 11.7-15.6 20.8-15.6 39 0 63.6 37.3 69 74.3 73.1-4.8 4.3-9.1 11.7-10.6 22.3-9.5 4.3-33.8 11.7-48.3-13.9-9.1-15.8-25.5-17.1-25.5-17.1-16.2-.2-1.1 10.2-1.1 10.2 10.8 5 18.4 24.2 18.4 24.2 9.7 29.7 56.1 19.7 56.1 19.7 0 13.9.2 36.5.2 40.6 0 4.3-3 9.5-11.5 8-66-22.1-112.2-84.9-112.2-158.3 0-91.8 70.2-161.5 162-161.5S388 165.6 388 257.4c.1 73.4-44.7 136.3-110.7 158.3zm-98.1-61.1c-1.9.4-3.7-.4-3.9-1.7-.2-1.5 1.1-2.8 3-3.2 1.9-.2 3.7.6 3.9 1.9.3 1.3-1 2.6-3 3zm-9.5-.9c0 1.3-1.5 2.4-3.5 2.4-2.2.2-3.7-.9-3.7-2.4 0-1.3 1.5-2.4 3.5-2.4 1.9-.2 3.7.9 3.7 2.4zm-13.7-1.1c-.4 1.3-2.4 1.9-4.1 1.3-1.9-.4-3.2-1.9-2.8-3.2.4-1.3 2.4-1.9 4.1-1.5 2 .6 3.3 2.1 2.8 3.4zm-12.3-5.4c-.9 1.1-2.8.9-4.3-.6-1.5-1.3-1.9-3.2-.9-4.1.9-1.1 2.8-.9 4.3.6 1.3 1.3 1.8 3.3.9 4.1zm-9.1-9.1c-.9.6-2.6 0-3.7-1.5s-1.1-3.2 0-3.9c1.1-.9 2.8-.2 3.7 1.3 1.1 1.5 1.1 3.3 0 4.1zm-6.5-9.7c-.9.9-2.4.4-3.5-.6-1.1-1.3-1.3-2.8-.4-3.5.9-.9 2.4-.4 3.5.6 1.1 1.3 1.3 2.8.4 3.5zm-6.7-7.4c-.4.9-1.7 1.1-2.8.4-1.3-.6-1.9-1.7-1.5-2.6.4-.6 1.5-.9 2.8-.4 1.3.7 1.9 1.8 1.5 2.6z"></path></svg>
        </a>
        <a
          class="update-tab updates-close"
          key="close"
          @click="emitClose"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M207.6 256l107.72-107.72c6.23-6.23 6.23-16.34 0-22.58l-25.03-25.03c-6.23-6.23-16.34-6.23-22.58 0L160 208.4 52.28 100.68c-6.23-6.23-16.34-6.23-22.58 0L4.68 125.7c-6.23 6.23-6.23 16.34 0 22.58L112.4 256 4.68 363.72c-6.23 6.23-6.23 16.34 0 22.58l25.03 25.03c6.23 6.23 16.34 6.23 22.58 0L160 303.6l107.72 107.72c6.23 6.23 16.34 6.23 22.58 0l25.03-25.03c6.23-6.23 6.23-16.34 0-22.58L207.6 256z"></path></svg>
        </a>
      </div>
      <div class="updates-dropdown-sections-container">
        <div
          v-show="activeTab === 'email'"
          key='email'
          class="updates-dropdown-section email"
        >
          <p>Get email notifications whenever Vue Formulate releases feature updates.</p>
          <!-- Begin Mailchimp Signup Form -->
          <div id="mc_embed_signup">
            <FormulateForm
              @submit="handleSubmit"
              ref="mailchimpForm"
              action="https://wearebraid.us16.list-manage.com/subscribe/post?u=97649538d11efe562355a58d0&amp;id=e5982191dd"
              method="post"
              id="mc-embedded-subscribe-form"
              name="mc-embedded-subscribe-form"
              class="validate"
              target="_blank"
              novalidate
            >
              <div id="mc_embed_signup_scroll">
                <div class="mc-field-group">
                  <!-- TODO: Need to get name property down to actualy input element -->
                  <FormulateInput
                    type="email"
                    validation="email|required"
                    label="Email Address"
                    class="required email"
                    validation-name="Email Address"
                    placeholder="Your email address..."
                    name="EMAIL"
                    id="mce-EMAIL"
                  />
                </div>
                <div id="mce-responses" class="clear">
                  <div class="response" id="mce-error-response" style="display:none"></div>
                  <div class="response" id="mce-success-response" style="display:none"></div>
                </div>
                <!-- real people should not fill this in and expect good things - do not remove this or risk form bot signups-->
                <div style="position: absolute; left: -5000px;" aria-hidden="true">
                  <input
                    type="text"
                    name="b_97649538d11efe562355a58d0_e5982191dd"
                    tabindex="-1"
                    value
                  />
                </div>
                <div class="clear" style="margin-top: 10px;">
                  <FormulateInput
                    type="submit"
                    value="Subscribe"
                    name="subscribe"
                    id="mc-embedded-subscribe"
                    class="button"
                  />
                </div>
              </div>
            </FormulateForm>
          </div>
          <!--End mc_embed_signup-->
        </div>

        <div
          v-show="activeTab === 'twitter'"
          key="twitter"
          class="updates-dropdown-section"
        >
          <p>Follow Vue Formulate and its authors on Twitter to stay up to date on the latest feature releases.</p>
          <ul class="twitter-profiles">
            <li class="twitter-profile">
              <span>Vue Formulate - Official: </span>
              <a
                href="https://twitter.com/vueformulate?ref_src=twsrc%5Etfw"
                class="twitter-follow-button"
                data-show-count="false"
              />
            </li>
            <li class="twitter-profile">
              <span>Justin Schroeder - Core Author: </span>
              <a
                href="https://twitter.com/jpschroeder?ref_src=twsrc%5Etfw"
                class="twitter-follow-button"
                data-show-count="false"
              />
            </li>
            <li class="twitter-profile">
              <span>Andrew Boyd - Core Maintainer: </span>
              <a
                href="https://twitter.com/BoydDotDev?ref_src=twsrc%5Etfw"
                class="twitter-follow-button"
                data-show-count="false"
              />
            </li>
          </ul>
          <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
        </div>

        <div
          v-show="activeTab === 'github'"
          key="github"
          class="updates-dropdown-section"
        >
          <p>Watch the Vue Formulate Repo on Github to be the first to know about updates.</p>
          <!-- Place this tag where you want the button to render. -->
          <github-button
            href="https://github.com/wearebraid/vue-formulate/subscription"
            data-icon="octicon-eye"
            aria-label="Watch wearebraid/vueformulate on GitHub"
          >Watch</github-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      activeTab: 'email'
    }
  },
  methods: {
    emitClose () {
      this.$emit('close')
    },
    handleSubmit (data) {
      this.$refs.mailchimpForm.$el.submit()
    }
  }
}
</script>

<style lang="scss" scoped>
.subscribe-box-container {
  padding-top: 5px;
  width: 100vw;
  cursor: default;
}

.subscribe-box {
  white-space: normal;
  background-color: #fff;
  border: 1px solid #dfe4ec;
  border-radius: 5px;
  overflow: hidden;
  color: #2c3e50;
  box-shadow: 0 0 4em -0.25em rgba(#444, 0.15);
}

.updates-dropdown-nav {
  display: flex;
  border-bottom: 1px solid #dfe4ec;

  .update-tab {
    flex: 1;
    color: #000;
    padding: 0.5em 1em;
    background-color: #f0f4fa;
    display: flex;
    justify-content: center;
    align-items: center;
    border-right: 1px solid #d8dee9;
    cursor: pointer;

    &:last-child {
      border-right: none;
    }

    &.updates-close {
      svg {
        width: 12px;
      }
    }

    &:hover {
      svg path {
        fill: #3eaf7c;
      }
    }

    &[data-active="true"] {
      background: #dfe4ee;
      svg path {
        fill: #8d99ad;
      }
    }

    svg {
      width: 22px;

      path {
        fill: #8d99ad;
      }
    }
  }
}

.updates-dropdown-section {
  padding: 1em;
}

.twitter-profiles {
  list-style-type: none;
  padding-left: 0;

  .twitter-profile {
    span {
      display: block;
      font-weight: bold;
    }
  }
}
</style>
