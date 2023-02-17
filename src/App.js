import logo from "./logo.svg";
import "./App.css";
import { Suspense, useState } from "react";
import { View, Text, TextInput, Button } from "react-native-web";
import { ErrorBoundary } from "./ErrorBoundary";
import { fetchData, CocktailView } from "./Cocktail";

const initialResource = fetchData({ name: "Paloma" });

const App = () => {
  const [resource, setResource] = useState(initialResource);
  const [formData, setFormData] = useState({});

  const updateForm = (k, v) => setFormData(prevState => ({...prevState, [k]: v}));

  const handleSearch = () => {
    setResource(fetchData(formData));
  };
  return (
    <View style={{ flex: 1 }}>
      <Text>Find Cocktail</Text>
      {['name', 'ingredients'].map((field) => (
          <>
          <Text>{field}</Text>
          <TextInput style={{border: '1px solid black'}} onChangeText={(v) => updateForm(field, v)}></TextInput>
          </>
        ))
      }
      <Button onPress={handleSearch} title="Search"/>
      <ErrorBoundary fallback={<Text>Could not show cocktails</Text>}>
        <Suspense
          fallback={<img src={logo} className="App-logo" alt="logo" />}
        >
          <CocktailView resource={resource} />
        </Suspense>
      </ErrorBoundary>
    </View>
  );
};

export default App;
