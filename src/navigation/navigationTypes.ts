import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ImageItem } from '../types/imageTypes';

export type RootStackParamList = {
    Home: undefined;
    Detail: { image: ImageItem };
    Edit: { image: ImageItem };
    Share: { image: ImageItem };
};

export type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Home'>;
export type DetailScreenProps = NativeStackScreenProps<RootStackParamList, 'Detail'>;
export type EditScreenProps = NativeStackScreenProps<RootStackParamList, 'Edit'>;
export type ShareScreenProps = NativeStackScreenProps<RootStackParamList, 'Share'>;
