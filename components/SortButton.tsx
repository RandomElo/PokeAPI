import { useThemeColors } from "@/hooks/useThemeColors";
import { useState } from "react";
import { Image, Modal, Pressable, StyleSheet, Text, View } from "react-native";
import { ThemeText } from "./ThemeText";
import { Card } from "./Card";
import { Row } from "./Row";
import { Radio } from "./Radio";

type Props = {
    value: "id" | "name";
    onChange: (v: "id" | "name") => void;
};

const options = [
    { label: "Number", value: "id" },
    { label: "Name", value: "name" },
] as const;

export function SortButton({ value, onChange }: Props) {
    const colors = useThemeColors();
    const [isModalVisible, setIsModalVisibity] = useState(false);
    const onButtonPress = () => {
        setIsModalVisibity(true);
    };
    const onClose = () => {
        setIsModalVisibity(false);
    };
    return (
        <>
            <Pressable onPress={onButtonPress}>
                <View style={[styles.button, { backgroundColor: colors.grayWhite }]}>
                    <Image source={value === "id" ? require("@/assets/images/FiltreId.png") : require("@/assets/images/FiltreName.png")} width={16} height={16} />
                </View>
            </Pressable>
            <Modal transparent visible={isModalVisible} onRequestClose={onClose}>
                <Pressable style={styles.backdrop} onPress={onClose}>
                    <View style={[styles.popup, { backgroundColor: colors.tint }]}>
                        <Row style={styles.rowEnTete}>
                            <ThemeText variant="subtitle2" color="grayWhite" style={styles.title}>
                                Sort by :
                            </ThemeText>
                            <View style={styles.viewCroix}>
                                <Image source={require("@/assets/images/croix.png")} width={8} height={8} />
                            </View>
                        </Row>
                        <Card style={styles.card}>
                            {options.map((o) => (
                                <Pressable key={o.value} onPress={() => onChange(o.value)}>
                                    <Row gap={8}>
                                        <Radio checked={o.value === value} />
                                        <ThemeText>{o.label}</ThemeText>
                                    </Row>
                                </Pressable>
                            ))}
                        </Card>
                    </View>
                </Pressable>
            </Modal>
        </>
    );
}
const styles = StyleSheet.create({
    button: {
        width: 32,
        height: 32,
        borderRadius: 32,
        flex: 0,
        alignItems: "center",
        justifyContent: "center",
    },
    backdrop: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.3)",
        justifyContent: "flex-end",
    },
    popup: {
        padding: 4,
        paddingTop: 16,
        gap: 16,
        borderRadius: 12,
    },
    title: {
        paddingLeft: 20,
    },
    card: {
        paddingVertical: 16,
        paddingHorizontal: 20,
        gap: 16,
    },
    rowEnTete: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    viewCroix: {
        marginRight: 4,
        backgroundColor: "white",
        width: 25,
        height: 25,

        justifyContent: "center",
        alignItems: "center",
        borderRadius: 25,
    },
});
