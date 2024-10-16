export interface ImageItem {
    id: string;
    name: string;
    url: string;
    width: number;
    height: number;
    [key: string]: any; // untuk menangani properti tambahan dari API jika ada
}
