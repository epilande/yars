import React from 'react';
import { shallow } from 'enzyme';
import ListItem from './ListItem';

describe('ListItem', () => {
  it('should render a ListItem', () => {
    const wrapper = shallow(
      <ListItem
        item={{ id: 1, text: 'Hello' }}
      />
    );

    expect(wrapper).toMatchSnapshot();
  });

  it('should render a li', () => {
    const wrapper = shallow(
      <ListItem
        item={{ id: 1, text: 'Hello' }}
      />
    );

    expect(wrapper.find('li')).toHaveLength(1);
  });

  it('should change to edit mode', () => {
    const wrapper = shallow(
      <ListItem
        item={{ id: 1, text: 'Hello' }}
      />
    );
    const inputSelector = 'input.itemText';
    const divSelector = 'div.itemText';

    expect(wrapper.find(inputSelector)).toHaveLength(0);
    expect(wrapper.find(divSelector)).toHaveLength(1);

    wrapper.find(divSelector).simulate('click');

    expect(wrapper.find(inputSelector)).toHaveLength(1);

    expect(wrapper).toMatchSnapshot();
  });

  it('should update input value', () => {
    const value = 'Hello World';
    const wrapper = shallow(
      <ListItem
        item={{ id: 1, text: 'Hello' }}
      />
    );
    const inputSelector = 'input.itemText';
    const divSelector = 'div.itemText';

    wrapper.find(divSelector).simulate('click');

    wrapper.find(inputSelector).simulate('change', {
      target: { value },
    });

    expect(wrapper.find(inputSelector).node.props.value).toEqual(value);
    expect(wrapper).toMatchSnapshot();
  });
});
