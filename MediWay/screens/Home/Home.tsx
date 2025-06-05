import styles from './styles';
import { Text, Image, View, ImageSourcePropType, ImageURISource, FlatList } from 'react-native';
import HomeNavigationTile, { HomeNavigationTileProps } from '../../components/HomeNavigationTile/HomeNavigationTile';
import { COLORS } from '../../assets/constants';
import Button from '../../components/Button/Button';
import { useNavigation } from '@react-navigation/native';
import { useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';

const Home = () => {
    const navigation = useNavigation();

    const LOGO: ImageSourcePropType = require('../../assets/images/logo.png');
    const INSURANCE_POLICY: ImageURISource = require('../../assets/images/home_insurance_policy.png');
    const COVERAGE: ImageURISource = require('../../assets/images/home_coverage.png');
    const CLINICS: ImageURISource = require('../../assets/images/home_clinics.png');
    const SUBMIT: ImageURISource = require('../../assets/images/home_submit.png');

    const { state: user } = useContext(UserContext);

    const navigatePolicy: () => void = () => {
        (navigation as any).navigate('WorkInProgress');
    };

    const navigateChat: () => void = () => {
        (navigation as any).navigate('WorkInProgress');
    };

    const TILES: HomeNavigationTileProps[] = [
        {
            imageSource: INSURANCE_POLICY,
            label: 'View My Insurance Policy',
            onPress: navigatePolicy,
            color: COLORS.HOME_BUTTON_SECONDARY,
            borderColor: COLORS.SECONDARY_DARK,
        },
        {
            imageSource: COVERAGE,
            label: 'Understand What’s Covered',
            onPress: navigatePolicy,
        },
        {
            imageSource: CLINICS,
            label: 'Find Clinics My Insurance Covers',
            onPress: navigatePolicy,
        },
        {
            imageSource: SUBMIT,
            label: 'Submit a Claim or Get Help',
            onPress: navigatePolicy,
            color: COLORS.HOME_BUTTON_SECONDARY,
            borderColor: COLORS.SECONDARY_DARK,
        },
    ];

    return (
        <View style={styles.screen}>
            <Image source={LOGO} style={styles.logo} resizeMode="contain" />
            <Text style={styles.intro}>Hi {user.name}, how can I help you today?</Text>
            <View style={styles.tiles}>
                <FlatList
                    data={TILES}
                    renderItem={(tile) =>
                        <HomeNavigationTile
                            key={'NavigationButton' + tile.index}
                            imageSource={tile.item.imageSource}
                            label={tile.item.label}
                            onPress={tile.item.onPress}
                            color={tile.item.color}
                            borderColor={tile.item.borderColor}
                        />
                    }
                    numColumns={2}
                    columnWrapperStyle={styles.row}
                />
            </View>
            <Button buttonProps={{ onPress: navigateChat }} label="Chat with me for more help" />
        </View>
    );
};

export default Home;
