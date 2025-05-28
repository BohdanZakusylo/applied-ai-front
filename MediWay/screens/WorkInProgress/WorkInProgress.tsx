import { useNavigation } from '@react-navigation/native';
import styles from './styles';
import { Image, View, ImageSourcePropType, TouchableOpacity, Text } from 'react-native';
import { BASE_HIT_SLOP } from '../../assets/constants';

const WorkInProgress = () => {
    const LOGO: ImageSourcePropType = require('../../assets/images/logo.png');
    const WIP: ImageSourcePropType = require('../../assets/images/work_in_progress.gif');

    const navigation = useNavigation();

    const navigateHome: () => void = () => {
        navigation.navigate('Tabs');
    };

    return (
        <View style={styles.screen}>
            <Image source={LOGO} style={styles.logo} resizeMode="contain" />
            <Image source={WIP} style={styles.work_in_progress} resizeMode="contain" />
            <Text style={styles.error}>Oops! This feature is still under construction. We're working hard to bring it to you soon!</Text>
            <TouchableOpacity onPress={navigateHome} hitSlop={BASE_HIT_SLOP}>
                <Text style={styles.link}>Go back to the home page</Text>
            </TouchableOpacity>
        </View>
    );
};

export default WorkInProgress;
