import React from 'react';
import { View } from 'react-native';
import { Snackbar } from 'react-native-paper';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { hideMessage, showMessage } from '../stores/actions';

const Message = (props) => {
  return (
    <View>
      <Snackbar
        visible={props.message.visible}
        onDismiss={props.hideMessage}
        duration={Snackbar.DURATION_SHORT}
        action={{
          label: 'Đóng',
          onPress: () => props.hideMessage()
        }}
      >
        {props.message.message}
      </Snackbar>
    </View>
  );
};

const mapStateToProps = (state) => {
  return {
    message: state.message
  };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      showMessage: showMessage,
      hideMessage: hideMessage
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Message);
