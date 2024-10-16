import React from 'react';
import { View, FlatList, RefreshControl, TouchableOpacity, Image, ListRenderItem, Text } from 'react-native';
import useFetchImages from '../hooks/useFetchImages';
import { HomeScreenProps } from '../navigation/navigationTypes';
import { ImageItem } from '../types/imageTypes';

const HomeScreen = ({ navigation }: HomeScreenProps) => {
    const { images, loading, fetchImages, error } = useFetchImages();

    const renderItem: ListRenderItem<ImageItem> = ({ item }) => (
        <TouchableOpacity onPress={() => navigation.navigate('Detail', { image: item })}>
            <Image source={{ uri: item.url }} style={{ width: 100, height: 100, margin: 5 }} />
        </TouchableOpacity>
    );

    return (
        <View style={{ flex: 1 }}>
            {error && <Text style={{ color: 'red', textAlign: 'center' }}>{error}</Text>}
            <FlatList
                data={images}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
                numColumns={3}
                refreshControl={
                    <RefreshControl refreshing={loading} onRefresh={fetchImages} />
                }
            />
        </View>
    );
};

export default HomeScreen;
