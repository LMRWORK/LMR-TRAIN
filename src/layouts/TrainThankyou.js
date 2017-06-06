import React from 'react';
import QueueAnim from 'rc-queue-anim';
import { NavBar, NoticeBar, Result, Icon, Steps, WhiteSpace,WingBlank } from 'antd-mobile';
import { connect } from 'react-redux';

class TrainThankyou extends React.PureComponent {

  constructor(props) {
    super(props);
  }

  render() {
    console.log('%cTrainThankyou.render()', 'background: #222; color: #bada55');
    const Step = Steps.Step;

    return (
      <div>
        <QueueAnim className="date-wrap" type="top">
          <div className="trainPage" key="1">
            <NavBar iconName={null} leftContent={[<img className="chtBack" src={this.props.lang.backIcon}/>,this.props.lang.navibarLeftBack]}>
              <h1 id="TrainIndex-h1">Thank you for your inquiry</h1>
            </NavBar>
            <NoticeBar mode="closable" icon={null}>A better China tour has arrived: No Shops. No Factories. No Detours</NoticeBar>
            <WhiteSpace />
            <WingBlank size="md">
                <Steps direction="horizontal" size="small" className="timeline">
                    <Step title="Search" icon={<span className="fake-icon" />} />
                    <Step title="Book" icon={<span className="fake-icon" />} />
                    <Step title="Pay" icon={<span className="fake-icon" />} />
                </Steps>
            </WingBlank>
            <WhiteSpace />
            <Result
                img={<Icon type="check-circle" className="icon" style={{ fill: '#1F90E6', width: '2.2rem', height: '2.2rem' }} />}
                title="Successful"
                message="Thank You for Your Inquiry with China Highlights"
              />
          </div>
        </QueueAnim>
      </div>
    );
  }
}

const mapStateToProps = (store) => ({
  lang: store.get('lang')
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(TrainThankyou);
