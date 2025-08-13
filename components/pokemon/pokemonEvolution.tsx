import { propsEvolutionChainLink, recoveryEvolution } from "@/functions/pokemon";
import { ThemeText } from "../ThemeText";
import { PokemonCard } from "./pokemonCard";
import { Image, ScrollView, StyleSheet, View } from "react-native";
import React from "react";

type Props = {
    chain?: propsEvolutionChainLink;
};

export function PokemonEvolution({ chain, colorType }: Props) {
    if (!chain) {
        return <ThemeText>Evolution not available</ThemeText>;
    }

    const evolutions = recoveryEvolution(chain);

    return (
        <View style={styles.view}>
            <ThemeText variant="subtitle1" style={[{ color: colorType }, styles.themeText]}>
                Evolutionary family{evolutions.length > 0 ? " - " + evolutions.length + " Pokemons" : ""}
            </ThemeText>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollView}>
                {evolutions.map((evolution) => (
                    <PokemonCard key={evolution.id} id={evolution.id} name={evolution.name} />
                ))}
            </ScrollView>
        </View>
    );
}
const styles = StyleSheet.create({
    view: {
        height: 155,
    },
    themeText: {
        textAlign: "center",
        marginBottom: 20,
    },
    scrollView: {
        gap: 16,
        height: 108,
    },
});
