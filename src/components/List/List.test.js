import React from 'react';
import { shallow } from 'enzyme';
import List from './List';

describe('<List />', () => {
  let component;
  const item = { id: 1, text: 'Hello' };

  beforeEach(() => {
    component = shallow(
      <List items={[item]} />,
    );
  });

  it('should render', () => {
    expect(component).toHaveLength(1);
    expect(component).toMatchSnapshot();
  });
});
