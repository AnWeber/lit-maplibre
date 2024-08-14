
/**
 * Class decorator factory that defines the decorated class as a custom element.
 *
 * ```js
 * @customElement('my-element')
 * class MyElement extends LitElement {
 *   render() {
 *     return html``;
 *   }
 * }
 * ```
 * @category Decorator
 * @param tagName The tag name of the custom element to define.
 */
export const customElementIfNotExists =
  (tagName: string) =>
    (clazz: {
      new (...params: unknown[]): HTMLElement;
    }) => {
      if (!customElements.get(tagName)) {
        customElements.define(tagName, clazz);
      }
  }
