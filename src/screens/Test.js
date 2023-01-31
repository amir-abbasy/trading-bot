import React, {useEffect, useState, useRef} from 'react';
import {View, Text, Image, Alert, TouchableOpacity} from 'react-native';
const axios = require('axios');
import BTButton from '../components/Button';
import {Input, Layout} from '../components';
import {colors} from '../global/Theme';
import {default_url} from '../global/Config';

const Test = props => {
  const [loading, setLoading] = useState(false);
  const [logs, setLogs] = useState();

  useEffect(() => {
    if (!logs) _getLogs();
  }, []);

  const _getLogs = async () => {
    setLoading(true);
    axios
      .get('http://43.205.15.170:4001/logs')
      .then(function (response) {
        console.log();
        setLogs(response.data);
        setLoading(false);
      })
      .catch(function (error) {
        console.error(error);
        setLoading(false);
      });
  };

  return (
    <Layout onRefresh={() => _getLogs()} scrollToEnd={true}>
      <Text
        style={styles.logs}
        onPress={() => null}>
        {logs}
      </Text>
      <BTButton text="Reload" onPress={() => _getLogs()} loading={loading} />
    </Layout>
  );
};

const styles = {
  logs: {
    color: colors.light,
    fontSize: 8,
    marginTop: 10,
    padding: 5,
  },
};

export default Test;
