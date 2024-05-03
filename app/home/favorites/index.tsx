import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  FlatList,
  TouchableOpacity,
  ScrollView,
  Linking,
} from "react-native";
import { Link } from "expo-router";
import { assets } from "../../../components/assets";
import favoriteRecipes from "../../../components/RecipeCard"; // Assuming this imports recipe data
import { useDataContext } from "../../../utils/UserData";

export default function FavoritesScreen() {
  // const [favorites, setFavorites] = useState(favoriteRecipes);
  const { favoriteRecipes, setFavoriteRecipes } = useDataContext();
  const removeFromFavorites = (recipe) => {
    const updatedFavorites = favoriteRecipes.filter(
      (item) => item !== recipe
    );

    setFavoriteRecipes(updatedFavorites);
  };

  const FavoritesScreen = () => (
    <View style={{ flex: 1 }}>
      <FlatList
        data={favoriteRecipes}
        keyExtractor={(item) => item.id || Math.random().toString()} // Ensure unique key
        renderItem={({ item }) => (
          <View style={styles.favorite_rectangle}>
            <View style={{ flexDirection: "row" }}>
              <View style={{ justifyContent: "flex-start", marginLeft: 5 }}>
                <TouchableOpacity onPress={() => removeFromFavorites(item)}>
                  <Image
                    source={require("../../../assets/OnHeart.png")}
                    style={{ resizeMode: "contain", width: 30, height: 30 }}
                  />
                </TouchableOpacity>
                {/* Check if recipe exists before accessing properties */}
                {item.recipe && (
                  <Image
                    source={{ uri: item.recipe.image }}
                    style={styles.favorite_image}
                  />
                )}
              </View>
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "flex-start",
                  flex: 1,
                  paddingHorizontal: 10,
                  maxWidth: 250,
                }}
              >
                {/* Check if recipe exists before accessing label */}
                {item.recipe && (
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: "bold",
                      marginHorizontal: 5,
                    }}
                  >
                    {item.recipe.label}
                  </Text>
                )}
                <Text style={{ fontSize: 10, fontWeight: "bold" }}>
                  Ingredients:
                </Text>
                <ScrollView style={{ flex: 1, maxWidth: 250 }}>
                  <View>
                    {item.recipe &&
                      item.recipe.ingredients.map((ingredient, index) => (
                        <Text key={index} style={{ fontSize: 10 }}>
                          - {ingredient.text}
                        </Text>
                      ))}
                  </View>
                </ScrollView>
              </View>
            </View>
            <View style={{ justifyContent: "flex-end", flex: 1 }}>
              <TouchableOpacity
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  width: 376,
                  height: 23,
                  backgroundColor: "#F5D491",
                }}
                onPress={() => openRecipeUrl(item.recipe.url)} // Check if recipe exists before accessing url
              >
                <Text
                  style={{ color: "black", fontSize: 11, fontWeight: "500" }}
                >
                  View Recipe
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );

  const openRecipeUrl = (url) => {
    console.log(url);
    Linking.openURL(url);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={assets.gradient} style={{ zIndex: 1 }} />
        <Image
          source={assets["ingredients-bg"]}
          resizeMode="cover"
          style={styles.bgimage}
        />
        <Text style={styles.ingredientsText}>Favorites</Text>
      </View>
      <FavoritesScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
  },
  header: {
    width: "100%",
    position: "relative",
  },
  bgimage: {
    position: "absolute",
    left: 0,
    bottom: 0,
    width: 300,
    height: 200,
  },
  ingredientsText: {
    color: "#333A73",
    fontSize: 30,
    fontWeight: "bold",
    position: "absolute",
    right: 10,
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    justifyContent: "flex-start",
    alignItems: "flex-end",
  },
  gradientimage: {
    width: "100%",
    height: "12%",
  },
  favText: {
    color: "#333A73",
    fontSize: 30,
    fontWeight: "bold",
    opacity: 1,
    position: "absolute",
    marginTop: 40,
    marginRight: 50,
  },
  navigationBar: {
    position: "absolute",
    backgroundColor: "#201E53",
    justifyContent: "flex-end",
    bottom: 0,
    left: 0,
    right: 0,
  },
  icons: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10, // Add some padding for visual appeal
  },
  descriptions: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginBottom: 10,
  },
  icon: {
    width: 30,
    height: 30,
  },
  descriptionText: {
    fontSize: 10,
    color: "white",
  },
});
