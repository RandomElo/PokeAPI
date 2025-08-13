export function getPokemonId(url: string): number {
    return parseInt(url.split("/").at(-2)!, 10);
}
export function getPokemonArtWork(id: number | string): string {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
}
export function formatWeight(weight?: number): string {
    if (!weight) {
        return "---------";
    }
    return (weight / 10).toString().replace(".", ",") + " kg";
}
export function formatSize(size?: number): string {
    if (!size) {
        return "---------";
    }
    return (size / 10).toString().replace(".", ",") + " m";
}
type PokemonMove = {
    move: {
        name: string;
    };
};
export function formatMoves(moves: PokemonMove[]): string {
    return moves
        .slice(0, 2)
        .map((m) => m.move.name.charAt(0).toUpperCase() + m.move.name.slice(1).replaceAll("-", " "))
        .join("\n");
}

export function formatGender(gender_rate: number | undefined): string {
    if (gender_rate) {
        if (gender_rate === -1) {
            return "Genderless";
        } else if (gender_rate === 0) {
            return "Male";
        } else if (gender_rate === 8) {
            return "Female";
        } else {
            const rateFemale = (gender_rate / 8) * 100;
            return `${(100 - rateFemale).toFixed(1)} % male\n${rateFemale.toFixed(1)} % female`;
        }
    } else {
        return "Genderless";
    }
}

export const basePokemonStats = [
    { base_stat: 0, effort: 0, stat: { name: "hp" } },

    { base_stat: 0, effort: 0, stat: { name: "attack" } },

    { base_stat: 0, effort: 0, stat: { name: "defense" } },

    { base_stat: 0, effort: 1, stat: { name: "special-attack" } },

    { base_stat: 0, effort: 0, stat: { name: "special-defense" } },

    { base_stat: 0, effort: 0, stat: { name: "speed" } },
];
export type propsEvolutionChainLink = {
    species: { name: string; url: string };
    evolves_to: propsEvolutionChainLink[];
};
type Evolution = {
    id: number;
    name: string;
    // autres propriétés si besoin
};
export function recoveryEvolution(chain: propsEvolutionChainLink): Evolution[] {
    const evolutions: Evolution[] = [];

    function traverse(link: propsEvolutionChainLink) {
        // On ajoute le nom du Pokémon
        const split = link.species.url.split("/");
        const idPokemon = split ? split[split.length - 2] : "";
        evolutions.push({ name: link.species.name, id: parseInt(idPokemon ) });

        // On parcourt toutes les évolutions possibles
        link.evolves_to.forEach((evo) => traverse(evo));
    }

    traverse(chain);
    return evolutions;
}
