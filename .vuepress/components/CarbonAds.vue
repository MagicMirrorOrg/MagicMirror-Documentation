<script>
import {h} from 'vue';

export default {
  watch: {
    '$route'(to, from) {
      if (
          to.path !== from.path
          // Only reload if the ad has been loaded
          // otherwise it's possible that the script is appended but
          // the ads are not loaded yet. This would result in duplicated ads.
          && this.$el.querySelector('#carbonads')
      ) {
        this.$el.innerHTML = '';
        this.load();
      }
    },
  },
  mounted() {
    this.load();
  },
  methods: {
    load() {
      const s = document.createElement('script');
      s.id = '_carbonads_js';
      s.src = `//cdn.carbonads.com/carbon.js?serve=CK7IC23N&placement=magicmirror`;
      this.$el.appendChild(s);
    },
  },
  render() {
    return h('div', {class: 'carbon-ads'});
  },
};
</script>

<style lang="scss">
.sidebar {
  .carbon-ads {
    a {
      display: block;
    }
  }
}
.carbon-ads {
  min-height: 130px;
  padding: 1.5rem 1.5rem 0;
  margin-bottom: -0.5rem;
  font-size: 0.75rem;
  border-bottom: 1px solid var(--c-border);
  a {
    color: #444;
    font-weight: normal;
    display: inline;
  }
  .carbon-img {
    float: left;
    margin-right: 1rem;
    border: 1px solid var(--c-border);
    img {
      display: block;
    }
  }
  .carbon-poweredby {
    color: #999;
    display: block;
    margin-top: 0.5em;
  }
}
.dark {
  a.carbon-text {
    color: var(--c-text-light);
  }
}
@media (max-width: 719px) {
  .carbon-ads .carbon-img img {
    width: 100px;
    height: 77px;
  }
}
</style>
