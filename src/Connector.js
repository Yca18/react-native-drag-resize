import React, {Component} from 'react';
import {
  PanResponder,
  View,
} from 'react-native';
import PropTypes from 'prop-types';

export const CONNECTOR_TOP_LEFT = 'tl';
export const CONNECTOR_TOP_MIDDLE = 'tm';
export const CONNECTOR_TOP_RIGHT = 'tr';
export const CONNECTOR_MIDDLE_RIGHT = 'mr';
export const CONNECTOR_BOTTOM_RIGHT = 'br';
export const CONNECTOR_BOTTOM_MIDDLE = 'bm';
export const CONNECTOR_BOTTOM_LEFT = 'bl';
export const CONNECTOR_MIDDLE_LEFT = 'ml';
export const CONNECTOR_CENTER = 'c';

/**
 * Connector component for handle touch events.
 */
export class Connector extends Component {

  constructor(props) {
    super(props);

    this.position = {
      x: 0,
      y: 0,
    };

    this._panResponder = PanResponder.create({
      // Ask to be the responder:
      onStartShouldSetPanResponder: (event, gestureState) => true,
      onStartShouldSetPanResponderCapture: (event, gestureState) => true,
      onMoveShouldSetPanResponder: (event, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (event, gestureState) => true,

      onPanResponderGrant: (event, gestureState) => {
        // The gesture has started. Show visual feedback so the user knows
        // what is happening!
        // gestureState.d{x,y} will be set to zero now
        const {
          onStart
        } = this.props;

        this.position = {
          x: 0,
          y: 0,
        };

        onStart([
          0,
          0,
        ]);
      },
      onPanResponderMove: (event, gestureState) => {
        const {
          onMove
        } = this.props;

        onMove([
          gestureState.dx - this.position.x,
          gestureState.dy - this.position.y,
        ]);

        this.position = {
          x: gestureState.dx,
          y: gestureState.dy,
        };
      },
      onPanResponderTerminationRequest: (event, gestureState) => true,
      onPanResponderRelease: (event, gestureState) => {
        // The user has released all touches while this view is the
        // responder. This typically means a gesture has succeeded
        const {
          onEnd
        } = this.props;

        onEnd([
          gestureState.moveX,
          gestureState.moveY,
        ]);
      },
      onPanResponderTerminate: (event, gestureState) => {
        // Another component has become the responder, so this gesture
        // should be cancelled
      },
      onShouldBlockNativeResponder: (event, gestureState) => {
        // Returns whether this component should block native components from becoming the JS
        // responder. Returns true by default. Is currently only supported on android.
        return true;
      },
    });
  }

  render() {
    const {
      x,
      y,
      size,
    } = this.props;

    const commonStyles = {
      position: 'absolute',
      left: x,
      top: y,
      width: size,
      height: size,
      borderRadius: 3,
      borderTopWidth: 0,
      borderRightWidth: 0,
      borderBottomWidth: 0,
      borderLeftWidth: 0,
      borderColor: '#4cc38a',
    }

    switch(this.props.type){
      case CONNECTOR_TOP_LEFT:
        commonStyles.borderTopWidth = 5
        commonStyles.borderLeftWidth = 5
        break;
      case CONNECTOR_TOP_RIGHT:
        commonStyles.borderTopWidth = 5
        commonStyles.borderRightWidth = 5
        break;
      case CONNECTOR_BOTTOM_RIGHT:
        commonStyles.borderBottomWidth = 5
        commonStyles.borderRightWidth = 5
        break;
      case CONNECTOR_BOTTOM_LEFT:
        commonStyles.borderBottomWidth = 5
        commonStyles.borderLeftWidth = 5
        break;
      case CONNECTOR_CENTER:
        commonStyles.top = 20
        commonStyles.left = 20
        commonStyles.width = "95%"
        commonStyles.height = "95%"
        commonStyles.backgroundColor = 'rgba(0, 0, 0, 0)'
        break;
      default:
        break;
    }

    return (
      <View
        style={{
          ...commonStyles,
        }}
        {...this._panResponder.panHandlers}
      />
    );
  }
}

Connector.propTypes = {
  x: PropTypes.number,
  y: PropTypes.number,
  size: PropTypes.number,
  onStart: PropTypes.func.isRequired,
  onMove: PropTypes.func.isRequired,
  onEnd: PropTypes.func.isRequired,
};
