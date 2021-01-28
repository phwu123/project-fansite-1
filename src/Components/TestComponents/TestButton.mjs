const template = `
  <button id="test-button">style a</button>
`

customElements.define('test-button',
  class TestButton extends HTMLElement {
    static get observedAttributes() {
      return ['test-attribute'];
    }

    constructor() {
      super();
      this.innerHTML = template;
      this.buttonClick = this.buttonClick.bind(this)
    }

    connectedCallback() {
      document.getElementById('test-button').addEventListener('click', this.buttonClick, false)
    }

    attributeChangedCallback(name, oldValue, newValue) {
      console.log('changed attribute', newValue)
      if (newValue === 'a') {
        document.getElementById('test-button').textContent = 'style a'
      } else {
        document.getElementById('test-button').textContent = 'style b'
      }
    }

    buttonClick() {
      location.pathname = '/aaa'
      // const newAttribute = this.getAttribute('test-attribute') === 'a'
      //   ? 'b'
      //   : 'a'
      //   console.log('click', newAttribute)
      // this.dispatchEvent(new CustomEvent('test-button-clicked', {
      //   detail: newAttribute,
      //   bubbles: true
      // }));
      // this.setAttribute('test-attribute', newAttribute)
    }
  }
)