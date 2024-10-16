import React from 'react';
import { View, Button } from 'react-native';
import * as Sharing from 'expo-sharing';
import { ShareScreenProps } from '../navigation/navigationTypes';

const ShareScreen = ({ route }: ShareScreenProps) => {
    const { image } = route.params;

    const shareImage = async () => {
        try {
            await Sharing.shareAsync(image.url, {
                dialogTitle: 'Share this image',
                mimeType: 'image/png', // adjust based on your image format
                UTI: 'public.image',     // Universal Type Identifier
            });
        } catch (error) {
            console.log('Error sharing image', error);
        }
    };

    return (
        <View>
            <Button title="Share Image" onPress={shareImage} />
        </View>
    );
};

export default ShareScreen;

