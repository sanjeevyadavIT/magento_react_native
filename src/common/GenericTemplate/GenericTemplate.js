import React, { useContext } from 'react';
import { View, StyleSheet, ScrollView, ViewPropTypes } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import PropTypes from 'prop-types';
import LoadingView from '../LoadingView/LoadingView';
import MessageView from '../MessageView/MessageView';
import Status from '../../magento/Status';
import { ThemeContext } from '../../theme';

const propTypes = {
  /**
   * If status === Status.DEFAULT || status === Status.LOADING => render loader
   * If status === Status.SUCCESS                              => render children
   * If status === Status.ERROR                                => show error message
   */
  status: PropTypes.oneOf(Object.values(Status)),
  /**
   * Element to be render when status === Status.SUCCESS
   */
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
  ]).isRequired,
  /**
   * Add children in ScrollView component
   */
  scrollable: PropTypes.bool,
  /**
   * Add sticky Footer at bottom
   */
  footer: PropTypes.element,
  /**
   * in case of status === Status.ERROR, the error message to be shown
   */
  errorMessage: PropTypes.string,
  /**
   * Container style
   */
  style: ViewPropTypes.style,
  /**
   * If scrollable is true, and you want to include pull to refresh,
   * pass RefreshControl here
   */
  refreshControl: PropTypes.element,
  onLayout: PropTypes.func,
  assignRef: PropTypes.func,
};

const defaultProps = {
  status: Status.SUCCESS,
  scrollable: false,
  errorMessage: '',
  style: {},
  footer: <></>,
  refreshControl: undefined,
  onLayout: undefined,
  assignRef: undefined,
};

const GenericTemplate = ({
  children,
  footer,
  scrollable,
  status,
  errorMessage,
  style,
  refreshControl,
  onLayout,
  assignRef,
}) => {
  const { theme } = useContext(ThemeContext);
  const ViewGroup = scrollable ? ScrollView : View;
  const props = {};

  if (scrollable) {
    props.contentContainerStyle = style;
    if (refreshControl) {
      props.refreshControl = refreshControl;
    }
  } else {
    props.style = [styles.content, style];
  }

  return (
    <SafeAreaView
      {...(onLayout && { onLayout })}
      style={styles.container(theme)}
    >
      <ViewGroup
        ref={component => assignRef && assignRef(component)}
        {...props}
      >
        {!refreshControl &&
          (status === Status.DEFAULT || status === Status.LOADING) && (
            <LoadingView />
          )}
        {status === Status.ERROR && (
          <MessageView type="error" message={errorMessage} />
        )}
        {status === Status.SUCCESS && children}
      </ViewGroup>
      {footer}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: theme => ({
    flex: 1,
    backgroundColor: theme.backgroundColor,
  }),
  content: {
    flex: 1,
  },
  stickyFooter: {},
});

GenericTemplate.propTypes = propTypes;

GenericTemplate.defaultProps = defaultProps;

export default GenericTemplate;
