<template>
  <a
    class="article-card"
    :data-sidebar="sidebar"
    :href="href"
  >
    <img v-if="image" :src="image" :alt="imageAlt">
    <div class="copy">
      <Badge v-if="badge">{{ badge }}</Badge>
      <h3>{{ headline }}</h3>
      <p>{{ copy }}</p>
    </div>
  </a>
</template>

<script>
export default {
  props: {
    href: {
      type: String,
      default: ''
    },
    image: {
      type: String,
      default: ''
    },
    imageAlt: {
      type: String,
      default: ''
    },
    badge: {
      type: String,
      default: ''
    },
    headline: {
      type: String,
      default: ''
    },
    copy: {
      type: String,
      default: ''
    },
    sidebar: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss" scoped>
.article-card {
  margin-top: 3em;
  margin-bottom: 1.5em;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  font-weight: normal;
  text-decoration: none !important;

  @media (min-width: 600px) {
    flex-direction: row;
  }

  &[data-sidebar] {
    background-color: #fff;
    padding: 1em;
    border: 1px solid #eee;
    border-radius: 5px;
    max-width: 300px;
    overflow: hidden;

    @media (min-width: 600px) {
      flex-direction: column;
    }
    @media (min-width: 960px) {
      width: 40%;
      float: right;
      margin-top: 0;
      margin-bottom: 0;
      margin-left: 2em;
      margin-right: -2em;
    }
    @media (min-width: 1260px) {
      margin-right: -5em;
      margin-left: 3em;
    }
    @media (min-width: 1440px) {
      margin-right: -10em;
    }
  }

  & /deep/ .badge {
    margin-bottom: 1em;
  }
}

img {
  border: 1px solid #eee;
  max-width: 250px;
  margin-right: 2em;
  border-radius: 5px;
  margin-bottom: 1em;
  display: block;

  @media (min-width: 600px) {
    width: 33%;
    max-width: 200px;
  }

  [data-sidebar] & {
    width: 100%;
    margin-right: 0;
    max-width: 300px;
  }
}

.copy {
  width: 100%;

  [data-sidebar] & {
    font-size: 0.8em;
  }
}

h3 {
  margin-top: 0;
  margin-bottom: 0.25em;

  [data-sidebar] & {
    font-size: 1.5em;
  }
}

small {
  font-size: 0.75em;
  color: #999;
}

p {
  color: #2c3e50;
}
</style>
