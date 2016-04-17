import React, { Component, PropTypes } from 'react';
import classNames from 'classnames/bind';
import Input from 'components/Input';
import styles from './ListItem.css';

const cx = classNames.bind(styles);

class ListItem extends Component {
  static propTypes = {
    item: PropTypes.object.isRequired,
    onRemove: PropTypes.func,
    onEdit: PropTypes.func,
    onComplete: PropTypes.func,
  };

  constructor(props) {
    super();
    this._onTextClick = this._onTextClick.bind(this);
    this._onChange = this._onChange.bind(this);
    this._onCheck = this._onCheck.bind(this);
    this._onRemove = this._onRemove.bind(this);
    this._onBlur = this._onBlur.bind(this);
    this._onFocus = this._onFocus.bind(this);
    this.state = {
      editing: false,
      text: props.item.text || '',
    };
  }

  _onTextClick() {
    this.setState({ editing: true });
  }

  _onChange(event) {
    this.setState({ text: event.target.value });
  }

  _onCheck(event) {
    const { item, onComplete } = this.props;

    onComplete(item);
  }

  _onRemove() {
    const { item, onRemove } = this.props;
    onRemove(item);
  }

  _onBlur() {
    const { item, onEdit } = this.props;
    const text = this.state.text.trim();

    this.setState({ editing: false });

    if (!text || text === item.text) {
      this.setState({ text: this.props.item.text });
      return;
    }
    onEdit({ ...item, text });
  }

  _onFocus(event) {
    event.target.select();
  }

  render() {
    const { item, onRemove, onComplete } = this.props;
    const { editing } = this.state;

    let checkBox;
    if (onComplete) {
      checkBox = (
        <div
          className={styles.checkbox}
          onClick={this._onCheck}
        >
          <Input
            defaultChecked={item.completed}
            type="checkbox"
          />
        </div>
      );
    }

    let removeButton;
    if (onRemove) {
      removeButton = <button className={styles.remove} onClick={this._onRemove}>X</button>;
    }

    let text;
    if (editing) {
      text = (
        <Input
          className={styles.itemText}
          onBlur={this._onBlur}
          onChange={this._onChange}
          onFocus={this._onFocus}
          value={this.state.text}
          autoFocus
        />
      );
    } else {
      text = (
        <div className={styles.itemText} onClick={this._onTextClick}>
          { this.state.text }
        </div>
      );
    }

    const classes = cx({
      item: true,
      completed: item.completed,
    });

    return (
      <li className={classes}>
        {checkBox}{text}{removeButton}
      </li>
    );
  }
}

export default ListItem;
