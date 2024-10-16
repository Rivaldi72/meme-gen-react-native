import React from 'react';
import { View, Image, Button } from 'react-native';
import { DetailScreenProps } from '../navigation/navigationTypes';

const DetailScreen = ({ route, navigation }: DetailScreenProps) => {
    const { image } = route.params;

    return (
        <View>
            <Image source={{ uri: image.url }} style={{ width: '100%', height: 300 }} />
            <Button title="Add Logo" onPress={() => navigation.navigate('Edit', { image })} />
            <Button title="Add Text" onPress={() => navigation.navigate('Edit', { image })} />
        </View>
    );
};

export default DetailScreen;
