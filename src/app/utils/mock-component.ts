import { Component } from '@angular/core';

/**
 * @description MockComponent class built to mock child-components for running NG test
 * Examples of use:
 * MockComponent({ select: 'app-header', template: '<div></div>' });
 * MockComponent({ select: 'app-form-select', outputs: ['side'] });
 */

export function MockComponent(options: Component): Component {
  const metaData: Component = {
    selector: options.selector,
    template: options.template || '',
    inputs: options.inputs,
    outputs: options.outputs,
  };
  // @ts-ignore
  // tslint:disable-next-line:class-name
  return Component(metaData)(class _ {});
}
