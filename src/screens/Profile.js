import {
  View,
  Text,
  Image,
} from 'react-native';
import { colors } from '../global/Theme';


const Profile = (props) => {
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image style={styles.logo} />
        <Text style={styles.logoText}>Profile</Text>
      </View>
    </View>
  );
};

const styles = {
  container: {
    flex: 1,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 50,
  },
  logo: {
    width: 100,
    height: 100,
  },
  logoText: {
    color: colors.light,
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
  },
  formContainer: {
    width: '80%',
  },
};

export default Profile;
