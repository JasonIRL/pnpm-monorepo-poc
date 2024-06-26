import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';
import { MonoButton } from './mono-button';

describe('MonoButton', () => {
  it('should render a MonoButton', async () => {
    const page = await newSpecPage({
      components: [MonoButton],
      template: () => <mono-button text="Hello!"></mono-button>,
    });

    expect(page.root).toEqualHtml(/*html*/ `
      <mono-button>
        <button class="mono-button__Primary" type="button">Hello!</button>
      </mono-button>
    `);
  });
});
