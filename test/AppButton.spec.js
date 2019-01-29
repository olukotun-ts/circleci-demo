const assert = require('assert');
const { mount } = require('@vue/test-utils');
const AppButton = require('../AppButton.js');


describe('AppButton', () => {
    it('generates new name on click', () => {
        const wrapper = mount(AppButton);
        const button = wrapper.find('#btn-main');
        const oldText = button.text();

        button.trigger('click');

        const newText = button.text();

        assert.notEqual(oldText, newText);
    })
})