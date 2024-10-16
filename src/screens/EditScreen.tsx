import React, { useState, useRef } from 'react';
import { View, Text, Image, Button, StyleSheet } from 'react-native';
import { EditScreenProps } from '../navigation/navigationTypes';
import * as ImagePicker from 'expo-image-picker';
import * as MediaLibrary from 'expo-media-library';
import * as Sharing from 'expo-sharing';
import { PanResponder } from 'react-native';
import { captureRef } from 'react-native-view-shot';

const EditScreen = ({ route }: EditScreenProps) => {
    const { image } = route.params;

    const [logo, setLogo] = useState<string | null>(null);
    const [text, setText] = useState<string>('Drag Me!');
    const [logoPosition, setLogoPosition] = useState({ x: 50, y: 50 });
    const [textPosition, setTextPosition] = useState({ x: 100, y: 100 });
    const viewRef = useRef<View | null>(null);

    const pickLogo = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled && result.assets) {
            setLogo(result.assets[0].uri);
        }
    };

    const logoPanResponder = useRef(
        PanResponder.create({
            onMoveShouldSetPanResponder: (evt, gestureState) => true,
            onPanResponderMove: (evt, gestureState) => {
                setLogoPosition({
                    x: logoPosition.x + gestureState.dx,
                    y: logoPosition.y + gestureState.dy,
                });
            },
            onPanResponderRelease: () => {
                setLogoPosition(logoPosition);
            },
        })
    ).current;

    const textPanResponder = useRef(
        PanResponder.create({
            onMoveShouldSetPanResponder: (evt, gestureState) => true,
            onPanResponderMove: (evt, gestureState) => {
                setTextPosition({
                    x: textPosition.x + gestureState.dx,
                    y: textPosition.y + gestureState.dy,
                });
            },
            onPanResponderRelease: () => {
                setTextPosition(textPosition);
            },
        })
    ).current;

    const saveImage = async () => {
        if (viewRef.current) {
            try {
                const uri = await captureRef(viewRef, {
                    format: 'png',
                    quality: 1,
                });

                const permission = await MediaLibrary.requestPermissionsAsync();
                if (permission.granted) {
                    await MediaLibrary.createAssetAsync(uri);
                    alert('Image saved to gallery!');
                } else {
                    alert('Permission to access gallery is required!');
                }
            } catch (error) {
                console.error("Failed to capture view snapshot", error);
            }
        }
    };

    const shareImage = async () => {
        if (viewRef.current) {
            try {
                const uri = await captureRef(viewRef, {
                    format: 'png',
                    quality: 1,
                });

                await Sharing.shareAsync(uri, {
                    dialogTitle: 'Share your edited image',
                    UTI: 'public.image',
                });
            } catch (error) {
                console.error("Failed to capture view snapshot for sharing", error);
            }
        }
    };

    return (
        <View ref={viewRef} style={styles.container}>
            <Image source={{ uri: image.url }} style={styles.mainImage} />
            {logo && (
                <View style={{ position: 'absolute', left: logoPosition.x, top: logoPosition.y }}>
                    <Image
                        source={{ uri: logo }}
                        style={styles.logo}
                        {...logoPanResponder.panHandlers}
                    />
                </View>
            )}
            <View style={{ position: 'absolute', left: textPosition.x, top: textPosition.y }}>
                <Text
                    style={styles.draggableText}
                    {...textPanResponder.panHandlers}
                >
                    {text}
                </Text>
            </View>
            <View style={styles.buttonContainer}>
                <Button title="Add Logo" onPress={pickLogo} />
                <Button title="Save" onPress={saveImage} />
                <Button title="Share" onPress={shareImage} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    mainImage: {
        width: '100%',
        height: '80%',
    },
    logo: {
        width: 100,
        height: 100,
    },
    draggableText: {
        fontSize: 20,
        color: 'black',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 20,
        width: '100%',
    },
});

export default EditScreen;
