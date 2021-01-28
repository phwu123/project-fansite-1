const template = `
  <div style="color:red">test text b</div>
`

customElements.define('test-component-b',
  class TestComponentB extends HTMLElement {
    constructor() {
      super();
    }

    connectedCallback() {
      this.innerHTML = template;
    }
  }
)