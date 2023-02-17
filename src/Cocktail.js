import { FlatList, Text, View } from "react-native-web";
import { req, wrapPromise } from "./utils";

export function fetchData({ name, ingredients }) {
  const cocktailPromise = fetchCocktails({ name, ingredients });

  return {
    cocktails: wrapPromise(cocktailPromise),
  };
}

const fetchCocktails = async ({ name, ingredients }) =>
  req
    .get("https://api.api-ninjas.com/v1/cocktail", { name, ingredients })
    .then((res) => res)

export const CocktailView = ({ resource }) => {
  const results = resource.cocktails.read();

  return (
    <>
      {results && results.map((value, id) => (
        <View key={`${value.name}${id}`} style={{border: '1px solid black', padding: 8}}>
          <Text>{value.name}</Text>
          <Text>{value.ingredients}</Text>
          <Text>{value.instructions}</Text>
        </View>
      ))}
    </>
  );
};
