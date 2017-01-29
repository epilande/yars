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
});
