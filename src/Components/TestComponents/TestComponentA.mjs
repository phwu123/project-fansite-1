const template = `
  <div style="color:blue">test text a</div>
`

customElements.define('test-component-a',
  class TestComponentA extends HTMLElement {
    constructor() {
      super();
    }

    connectedCallback() {
      this.innerHTML = template;
    }
  }
)