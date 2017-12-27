/**
* Handle error
* Different types of handling in dev and prod mode
* @flow
*/

import { Alert } from 'react-native';

export default function handleError(error: Error, message: ?string ) {
    if (__DEV__) {
      Alert.alert('ERROR', message || error.message);
      console.log(error);
    } else {
      // hadle error in production
      // sent report to some local or remote service or ....
    }
}
