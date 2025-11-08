import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import { text } from '../utils/text_placeholder';

interface ArticleMeta {
    id: string;
    title: string;
    author: string;
}

interface FavoriteArticle {
    id: string;
    title: string;
    author: string;
}

interface FavoriteContextType {
    favoriteArticles: FavoriteArticle[];
    toggleFavorite: (articleMeta: ArticleMeta) => Promise<void>;
}

interface FavoriteProviderProps {
    children: ReactNode;
}

const FavoriteContext = createContext<FavoriteContextType | undefined>(undefined);

export const FavoriteProvider: React.FC<FavoriteProviderProps> = ({ children }) => {
    const [favoriteArticles, setFavoriteArticles] = useState<FavoriteArticle[]>([]);
    const FAVORITES_KEY = 'favoriteArticles';

    useEffect(() => {
        const loadFavorites = async (): Promise<void> => {
            try {
                const storedFavorites = await AsyncStorage.getItem(FAVORITES_KEY);
                const favorites: FavoriteArticle[] = storedFavorites ? JSON.parse(storedFavorites) : [];
                setFavoriteArticles(favorites);
            } catch (e) {
                console.error("Failed to load favorites from AsyncStorage", e);
            }
        };
        loadFavorites();
    }, []);

    const toggleFavorite = async (articleMeta: ArticleMeta): Promise<void> => {
        try {
            const isCurrentlyFavorite = favoriteArticles.some(article => article.id === articleMeta.id);
            let updatedFavorites: FavoriteArticle[];

            if (isCurrentlyFavorite) {
                updatedFavorites = favoriteArticles.filter(article => article.id !== articleMeta.id);
                Toast.show({ type: 'info', text1: text.favoriteRemoved });
            } else {
                updatedFavorites = [
                    ...favoriteArticles,
                    {
                        id: articleMeta.id,
                        title: articleMeta.title,
                        author: articleMeta.author,
                    },
                ];
                Toast.show({ type: 'success', text1: text.favoriteAdded });
            }

            setFavoriteArticles(updatedFavorites);
            await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(updatedFavorites));
        } catch (e) {
            console.error("Failed to toggle favorite", e);
        }
    };

    return (
        <FavoriteContext.Provider value={{ favoriteArticles, toggleFavorite }}>
            {children}
        </FavoriteContext.Provider>
    );
};

export const useFavorites = (): FavoriteContextType => {
    const context = useContext(FavoriteContext);
    if (context === undefined) {
        throw new Error('useFavorites must be used within a FavoriteProvider');
    }
    return context;
};

