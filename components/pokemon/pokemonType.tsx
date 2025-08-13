import { Colors } from "@/constants/Colors";
import { View, ViewStyle } from "react-native";
import { ThemeText } from "../ThemeText";

type Props = {
    name: keyof (typeof Colors)["type"];
};
export function PokemonType({ name }: Props) {
    return (
        <View style={[rootStyles, { backgroundColor: Colors.type[name] }]}>
            <ThemeText color="grayWhite" variant="subtitle3" style={{ textTransform: "capitalize" }}>
                {name}
            </ThemeText>
        </View>
    );
}
const rootStyles = {
    flex: 0,
    height: 20,
    paddingHorizontal: 8,
    borderRadius: 8,
    justifyContent: "center",
} satisfies ViewStyle;
