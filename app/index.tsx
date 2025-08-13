import { Card } from "@/components/Card";
import { RootView } from "@/components/RootView";
import { Row } from "@/components/Row";
import { SearchBar } from "@/components/SearchBar";
import { SortButton } from "@/components/SortButton";
import { ThemeText } from "@/components/ThemeText";
import { getPokemonId } from "@/functions/pokemon";
import { useInfiniteFetchQuery } from "@/hooks/useFetchQuery";
import { useThemeColors } from "@/hooks/useThemeColors";
import { PokemonCard } from "@/components/pokemon/pokemonCard";
import { useState } from "react";
import { ActivityIndicator, FlatList, Image, StyleSheet, Text, View } from "react-native";

export default function Index() {
    const colors = useThemeColors();
    const { data, isFetching, fetchNextPage } = useInfiniteFetchQuery("/pokemon?limit=21");
    const [search, setSearch] = useState("");
    const [sort, setSort] = useState<"id" | "name">("id");
    const pokemons = data?.pages.flatMap((page) => page.results.map((r) => ({ name: r.name, id: getPokemonId(r.url) }))) ?? [];
    const filteredPokemons = [...(search ? pokemons.filter((p) => p.name.includes(search.toLowerCase()) || p.id.toString() === search) : pokemons)].sort((a, b) => (a[sort] < b[sort] ? -1 : 1));

    return (
        <RootView>
            <Row style={styles.header} gap={12}>
                <Image source={require("@/assets/images/pokeball-logo.png")} width={24} height={24} />
                <ThemeText variant="headline" color="grayWhite">
                    Pokédex
                </ThemeText>
            </Row>
            <Row gap={16}>
                <SearchBar value={search} onChange={setSearch} />
                <SortButton value={sort} onChange={setSort} />
            </Row>
            <Card style={styles.body}>
                <FlatList 
                data={filteredPokemons} 
                numColumns={3} 
                columnWrapperStyle={[styles.gridGap, styles.list]} 
                contentContainerStyle={styles.gridGap} 
                ListFooterComponent={isFetching ? <ActivityIndicator color={colors.tint} style={styles.loader} /> : null} onEndReached={() => fetchNextPage()} 
                renderItem={({ item }) => <PokemonCard id={item.id} name={item.name} 
                style={{ flex: 1 / 3 }} />} 
                keyExtractor={(item) => item.id.toString()} />
            </Card>
        </RootView>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 4,
    },
    header: {
        paddingHorizontal: 12,
        paddingVertical: 8,
    },
    body: {
        flex: 1,
        marginTop: 16,
    },
    gridGap: {
        gap: 8,
    },
    list: {
        padding: 4,
    },
    loader: {
        marginTop: 10,
        marginBottom: 20,
    },
});
