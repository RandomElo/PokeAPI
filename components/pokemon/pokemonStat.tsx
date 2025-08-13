import { StyleSheet, View, ViewProps } from "react-native";
import { Row } from "../Row";
import { ThemeText } from "../ThemeText";
import { useThemeColors } from "@/hooks/useThemeColors";
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";
import { useEffect } from "react";

type Props = ViewProps & {
    color: string;
    name: string;
    value: number;
};

function statShortName(name: string): string {
    return name.replaceAll("special", "S").replaceAll("-", "").replaceAll("attack", "ATK").replaceAll("defense", "DEF").replaceAll("speed", "SPD").toUpperCase();
}

export function PokemonStat({ style, color, name, value, ...resst }: Props) {
    const colors = useThemeColors();
    const sharedValue = useSharedValue(value);

    const barreInnerStyle = useAnimatedStyle(() => {
        return {
            flex: sharedValue.value,
        };
    });
    const barreBackgroundStyle = useAnimatedStyle(() => {
        return {
            flex: 255 - sharedValue.value,
        };
    });

    useEffect(() => {
        sharedValue.value = withSpring(value);
    }, [value]);

    return (
        <Row gap={8} style={[style, styles.root]}>
            <View style={[styles.name, { borderColor: colors.grayLight }]}>
                <ThemeText variant="subtitle3" style={{ color: color }}>
                    {statShortName(name)}
                </ThemeText>
            </View>
            <View style={styles.number}>
                <ThemeText>{value.toString().padStart(3, "0")}</ThemeText>
            </View>
            <Row style={styles.bar}>
                <Animated.View style={[styles.barInner, { backgroundColor: color }, barreInnerStyle]} />
                <Animated.View style={[styles.barBackground, { backgroundColor: color }, barreBackgroundStyle]} />
            </Row>
        </Row>
    );
}

const styles = StyleSheet.create({
    root: {},
    name: {
        width: 40,
        paddingRight: 8,
        borderRightWidth: 1,
        borderStyle: "solid",
    },
    number: {
        width: 23,
    },
    bar: {
        flex: 1,
        height: 4,
        borderRadius: 20,
        overflow: "hidden",
    },
    barInner: {
        height: 4,
    },
    barBackground: {
        height: 4,
        opacity: 0.24,
    },
});
