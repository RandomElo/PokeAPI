import { router, useLocalSearchParams } from "expo-router";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { RootView } from "../../components/RootView";
import { Row } from "../../components/Row";
import { ThemeText } from "../../components/ThemeText";
import { useFetchQuery } from "@/hooks/useFetchQuery";
import { Colors } from "@/constants/Colors";
import { useThemeColors } from "@/hooks/useThemeColors";
import { basePokemonStats, formatGender, formatMoves, formatSize, formatWeight, getPokemonArtWork } from "@/functions/pokemon";
import { Card } from "@/components/Card";
import { PokemonType } from "@/components/pokemon/pokemonType";
import { PokemonSpec } from "@/components/pokemon/pokemonSpec";
import { PokemonStat } from "@/components/pokemon/pokemonStat";

import { useAudioPlayer } from "expo-audio";
import { PokemonEvolution } from "@/components/pokemon/pokemonEvolution";

export default function Pokemon() {
    const colors = useThemeColors();
    const params = useLocalSearchParams() as { id: string };

    const { data: pokemon } = useFetchQuery("/pokemon/[id]", { id: params.id });
    const { data: species } = useFetchQuery("/pokemon-species/[id]", { id: params.id });

    const splitEvolutionChainUrl = species?.evolution_chain.url.split("/");
    const idEvolutionChain = splitEvolutionChainUrl ? splitEvolutionChainUrl[splitEvolutionChainUrl.length - 2] : "";

    const gender_rate = species?.gender_rate;

    const { data: evolution } = useFetchQuery("/evolution-chain/[id]", { id: idEvolutionChain });

    const mainType = pokemon?.types?.[0].type.name;
    const colorMainType = mainType ? Colors.type[mainType] : colors.tint;

    const types = pokemon?.types ?? [];

    const bio = species?.flavor_text_entries
        ?.find(({ language }) => language.name === "en")
        ?.flavor_text?.replace(/\n/g, " ")
        ?.replaceAll("POKéMON", "Pokémon");

    const stats = pokemon?.stats ?? basePokemonStats;

    const player = useAudioPlayer({ uri: pokemon?.cries.latest });

    const onImagePress = () => {
        if (!pokemon?.cries.latest) return;
        player.seekTo(0); // facultatif : remet au début
        player.play();
    };

    return (
        <RootView backgroundColor={colorMainType}>
            <View>
                <Image source={require("@/assets/images/artWorkPokeball.png")} style={styles.pokeball} width={208} height={208} />
                <Row style={styles.header}>
                    <Pressable onPress={() => router.replace("/")}>
                        <Row gap={8}>
                            <Image source={require("@/assets/images/flecheRetour.png")} width={32} height={32} />
                            <ThemeText color="grayWhite" variant="headline" style={{ textTransform: "capitalize" }}>
                                {pokemon?.name}
                            </ThemeText>
                        </Row>
                    </Pressable>
                    <ThemeText color="grayWhite" variant="subtitle2">
                        #{params.id.padStart(3, "0")}
                    </ThemeText>
                </Row>
                <View style={styles.body}>
                    <Pressable style={styles.pressableArtWork} onPress={onImagePress}>
                        <Image source={{ uri: getPokemonArtWork(params.id) }} width={200} height={200} />
                    </Pressable>
                    <Card style={styles.card}>
                        <Row gap={16} style={{ height: 20 }}>
                            {types.map((type) => (
                                <PokemonType name={type.type.name} key={type.type.name} />
                            ))}
                        </Row>
                        <ThemeText variant="subtitle1" style={{ color: colorMainType }}>
                            About
                        </ThemeText>
                        <Row>
                            <PokemonSpec style={{ borderStyle: "solid", borderRightWidth: 1, borderColor: colors.grayLight }} title={formatWeight(pokemon?.weight)} description="Weight" image={require("@/assets/images/weight.png")} />

                            <PokemonSpec style={{ borderStyle: "solid", borderRightWidth: 1, borderColor: colors.grayLight }} title={formatSize(pokemon?.height)} description="Size" image={require("@/assets/images/height.png")} />

                            <PokemonSpec styleText={{ textAlign: "center" }} style={{ borderStyle: "solid", borderRightWidth: 1, borderColor: colors.grayLight }} title={formatGender(species?.gender_rate)} description="Gender" />

                            <PokemonSpec styleText={{ textAlign: "center" }} title={pokemon?.moves ? formatMoves(pokemon?.moves) : "None move"} description="Moves" />
                        </Row>
                        <ThemeText style={styles.bio}>{bio ?? ""}</ThemeText>
                        <ThemeText variant="subtitle1" style={{ color: colorMainType }}>
                            Base stats
                        </ThemeText>
                        <View style={{ alignSelf: "stretch" }}>
                            {stats.map((stat) => (
                                <PokemonStat key={stat.stat.name} name={stat.stat.name} value={stat.base_stat} color={colorMainType} />
                            ))}
                        </View>
                        <View style={styles.viewPokemonEvolution}>
                            <PokemonEvolution chain={evolution?.chain} colorType={colorMainType} />
                        </View>
                    </Card>
                </View>
            </View>
        </RootView>
    );
}

const styles = StyleSheet.create({
    header: {
        margin: 20,
        justifyContent: "space-between",
    },
    pokeball: {
        opacity: 0.2,
        position: "absolute",
        right: 12,
        top: 8,
    },
    pressableArtWork: {
        position: "absolute",
        alignSelf: "center",
        width: 200,
        height: 200,
        zIndex: 2,
        top: -140,
    },
    body: {
        marginTop: 144,
    },
    card: {
        paddingHorizontal: 20,
        paddingTop: 60,
        paddingBottom: 20,
        gap: 16,
        alignItems: "center",
    },
    bio: {
        height: 32,
    },
    viewPokemonEvolution: {
        height: 155,
    },
});
