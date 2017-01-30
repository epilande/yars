import React from 'react';
import { shallow } from 'enzyme';
import ListItem from './ListItem';

describe('ListItem', () => {
  let component;
  const item = { id: 1, text: 'Hello' };

  beforeEach(() => {
    component = shallow(
      <ListItem
        item={item}
      />,
    );
  });

  it('should render a ListItem', () => {
    expect(component).toMatchSnapshot();
  });

  it('should render a li', () => {
    expect(component.find('li')).toHaveLength(1);
  });

  it('should change to edit mode', () => {
    const inputSelector = 'input.itemText';
    const divSelector = 'div.itemText';

    expect(component.find(inputSelector)).toHaveLength(0);
    expect(component.find(divSelector)).toHaveLength(1);

    component.find(divSelector).simulate('click');

    expect(component.find(inputSelector)).toHaveLength(1);
    expect(component).toMatchSnapshot();
  });

  it('should update input value', () => {
    const value = 'Hello World';
    const inputSelector = 'input.itemText';
    const divSelector = 'div.itemText';

    component.find(divSelector).simulate('click');
    component.find(inputSelector).simulate('change', {
      target: { value },
    });

    expect(component.find(inputSelector).node.props.value).toEqual(value);
    expect(component).toMatchSnapshot();
  });

  it('should render a checkbox when onComplete prop is passed', () => {
    const checkboxSelector = '.checkbox';
    const onComplete = jest.fn();
    component.setProps({ onComplete });

    expect(component).toMatchSnapshot();
    expect(component.find(checkboxSelector)).toHaveLength(1);

    component.find(checkboxSelector).simulate('click');

    expect(onComplete).toBeCalledWith(item);
  });

  it('should call `onEdit` prop function', () => {
    const value = 'Hello World';
    const inputSelector = 'input.itemText';
    const divSelector = 'div.itemText';
    const onEdit = jest.fn();
    component.setProps({ onEdit });

    component.find(divSelector).simulate('click');
    component.find(inputSelector).simulate('change', {
      target: { value },
    });
    component.find(inputSelector).simulate('keyDown', {
      keyCode: 13,
    });
    component.find(inputSelector).simulate('blur');

    expect(onEdit).toBeCalledWith({ ...item, text: value });
  });

  it('should return to previous state', () => {
    const inputSelector = 'input.itemText';
    const divSelector = 'div.itemText';

    component.find(divSelector).simulate('click');
    component.find(inputSelector).simulate('change', {
      target: { value: '' },
    });
    component.find(inputSelector).simulate('blur');

    expect(component.state()).toEqual({
      editing: false,
      text: item.text,
    });
  });

  it('should call `onRemove` prop function', () => {
    const removeSelector = '.remove';
    const onRemove = jest.fn();
    component.setProps({ onRemove });

    component.find(removeSelector).simulate('click');

    expect(component).toMatchSnapshot();
    expect(component.find(removeSelector)).toHaveLength(1);
    expect(onRemove).toBeCalledWith(item);
  });
});
