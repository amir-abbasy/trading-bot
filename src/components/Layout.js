import React,{useRef}from 'react';
import {
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
} from 'react-native';
import { colors } from '../global/Theme';
import {Header, Toast} from '../components'

const Layout = (props) => {
  const [refreshing, setRefreshing] = React.useState(false);
  const scrollViewRef = useRef();

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    props?.onRefresh()
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

 
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollView}
        stickyHeaderIndices={[0]}
        ref={scrollViewRef}
        onContentSizeChange={() => props?.scrollToEnd && scrollViewRef.current.scrollToEnd({ animated: true })}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>
        }>
         {props?.header == false ? null :  <Header title={props?.title} getUserData={props?.getUserData} />}
        {props?.children}
      </ScrollView>
      {props?.toast && <Toast message={props?.toast}/>}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flexGrow: 1,
    backgroundColor: colors.primary,
    paddingBottom: 50

  },
});

export default Layout;