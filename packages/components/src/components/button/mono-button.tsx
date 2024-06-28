import { Component, Event, type EventEmitter, Prop, h } from '@stencil/core';

@Component({
  tag: 'mono-button',
  styleUrl: 'mono-button.css',
  shadow: false,
})
export class MonoButton {
  /**
   * The text to display on the button.
   */
  @Prop() text: string;

  /**
   * The type of button.
   * @default 'Primary'
   * @values 'Primary', 'Secondary'
   */
  @Prop() type: 'Primary' | 'Secondary' = 'Primary';
  @Event() monoClick: EventEmitter;
  render() {
    return (
      <button
        class={`mono-button__${this.type}`}
        type="button"
        onClick={() => this.monoClick.emit()}
      >
        {this.text}
      </button>
    );
  }
}
