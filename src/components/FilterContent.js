import React from 'react';
import { List, Checkbox, Flex, Button} from 'antd-mobile';

const CheckboxItem = Checkbox.CheckboxItem;

class FilterContent extends React.PureComponent {

  constructor(props) {
    super(props);
    console.log('😃 FilterContent', props);
  }

  //过滤条件 highSpeed、time0006，time0612、time1218、time1824
  onSelect = (type, e) => {
    //e.stopPropagation();
    if (e.target.checked) {
      this.props.setFilterType(type, 'add');
    } else {
      this.props.setFilterType(type, 'delete');
    }
  }

  onReset = (e) => {
    //e.stopPropagation();
    this.props.setFilterType(null, 'clear');
    this.props.onClose();
  }

  onOk = (e) => {
    //e.stopPropagation();
    this.props.onClose();
  }

  render() {
    console.log("🔥 FilterContent.render()");
    return (
      <div id="FilterContent">
        <List renderHeader="车次类型">
          <CheckboxItem onChange={(e) => this.onSelect('highSpeed', e)} defaultChecked={this.props.filterType.indexOf('highSpeed') != -1}>
            高铁动车
          </CheckboxItem>
          <CheckboxItem onChange={(e) => this.onSelect('slowSpeed', e)} defaultChecked={this.props.filterType.indexOf('slowSpeed') != -1}>
            普通车次
          </CheckboxItem>
        </List>
        <List renderHeader="发车时段">
          <CheckboxItem onChange={(e) => this.onSelect('time0060', e)} defaultChecked={this.props.filterType.indexOf('time0060') != -1}>
            早上（00：00 - 06：00）
          </CheckboxItem>
          <CheckboxItem onChange={(e) => this.onSelect('time0612', e)} defaultChecked={this.props.filterType.indexOf('time0612') != -1}>
            上午（06：00 - 12：00）
          </CheckboxItem>
          <CheckboxItem onChange={(e) => this.onSelect('time1218', e)} defaultChecked={this.props.filterType.indexOf('time1218') != -1}>
            下午（12：00 - 18：00）
          </CheckboxItem>
          <CheckboxItem onChange={(e) => this.onSelect('time1824', e)} defaultChecked={this.props.filterType.indexOf('time1824') != -1}>
            晚上（18：00 - 24：00）
          </CheckboxItem>
          <List.Item>
            <Flex> 
              <Flex.Item className="filterBtn filterReset" onClick={(e) => this.onReset(e)}>重置</Flex.Item>
              <Flex.Item className="filterBtn filterOk" onClick={(e) => this.onOk(e)}>确定</Flex.Item>
            </Flex>
          </List.Item>
        </List>
      </div>
    );
  }
}

export default FilterContent;