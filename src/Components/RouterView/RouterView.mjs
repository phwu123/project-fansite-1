const template = `
  <test-button test-attribute="a"></test-button>
  <test-component-a></test-component-a>
`

customElements.define('router-view',
  class RouterView extends HTMLElement {
    constructor() {
      super();
      this.innerHTML += template;
    }

    connectedCallback() {
      this.addEventListener('test-button-clicked', this.changeView, false)
      console.log(history)
      console.log(location)
    }

    getInitialUrl() {

    }

    navigateToUrl() {

    }

    changeView(e) {
      this.replaceChild(document.createElement(`test-component-${e.detail}`), this.children[1])
    }
  }
)