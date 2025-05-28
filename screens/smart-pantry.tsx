"use client"

import { useState } from "react"
import { View, Text, StyleSheet, TouchableOpacity, FlatList, TextInput, Alert } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Plus, Search, BarChart2, Camera, Clock, Share2 } from "lucide-react"
import { useTheme } from "../context/theme-context"

// Mock data
const pantryItems = [
  {
    id: "1",
    name: "Milk",
    quantity: "1 gallon",
    expiryDate: "2025-05-22",
    daysLeft: 3,
    category: "Dairy",
  },
  {
    id: "2",
    name: "Apples",
    quantity: "6 pieces",
    expiryDate: "2025-05-25",
    daysLeft: 6,
    category: "Fruits",
  },
  {
    id: "3",
    name: "Bread",
    quantity: "1 loaf",
    expiryDate: "2025-05-21",
    daysLeft: 2,
    category: "Bakery",
  },
  {
    id: "4",
    name: "Chicken Breast",
    quantity: "1 lb",
    expiryDate: "2025-05-20",
    daysLeft: 1,
    category: "Meat",
  },
  {
    id: "5",
    name: "Spinach",
    quantity: "1 bunch",
    expiryDate: "2025-05-21",
    daysLeft: 2,
    category: "Vegetables",
  },
  {
    id: "6",
    name: "Yogurt",
    quantity: "32 oz",
    expiryDate: "2025-05-24",
    daysLeft: 5,
    category: "Dairy",
  },
  {
    id: "7",
    name: "Pasta",
    quantity: "1 box",
    expiryDate: "2025-12-15",
    daysLeft: 210,
    category: "Dry Goods",
  },
  {
    id: "8",
    name: "Tomatoes",
    quantity: "4 pieces",
    expiryDate: "2025-05-23",
    daysLeft: 4,
    category: "Vegetables",
  },
]

const SmartPantry = () => {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("all")
  const { colors } = useTheme()

  const filteredItems = pantryItems
    .filter((item) => {
      if (activeTab === "expiring") {
        return item.daysLeft <= 3
      }
      return true
    })
    .filter(
      (item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase()),
    )

  const handleAddItem = () => {
    // In a real app, navigate to add item screen
    Alert.alert("Add Item", "This would open the add item screen")
  }

  const handleShareItem = (item: any) => {
    Alert.alert("Share Item", `Would you like to share ${item.name} with your community?`, [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Share",
        onPress: () => Alert.alert("Success", "Item shared with community!"),
      },
    ])
  }

  const renderItem = ({ item }: { item: any }) => {
    const isExpiringSoon = item.daysLeft <= 3

    return (
      <View style={[styles.itemCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
        <View style={styles.itemHeader}>
          <View>
            <Text style={[styles.itemName, { color: colors.text }]}>{item.name}</Text>
            <Text style={[styles.itemCategory, { color: colors.text + "80" }]}>{item.category}</Text>
          </View>
          <TouchableOpacity
            style={[styles.shareButton, { backgroundColor: colors.primary + "20" }]}
            onPress={() => handleShareItem(item)}
          >
            <Share2 stroke={colors.primary} width={16} height={16} />
            <Text style={[styles.shareButtonText, { color: colors.primary }]}>Share</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.itemDetails}>
          <View style={styles.detailItem}>
            <Text style={[styles.detailLabel, { color: colors.text + "80" }]}>Quantity</Text>
            <Text style={[styles.detailValue, { color: colors.text }]}>{item.quantity}</Text>
          </View>

          <View style={styles.detailItem}>
            <Text style={[styles.detailLabel, { color: colors.text + "80" }]}>Expires</Text>
            <View style={styles.expiryContainer}>
              <Clock stroke={isExpiringSoon ? colors.danger : colors.text} width={14} height={14} />
              <Text
                style={[
                  styles.expiryText,
                  {
                    color: isExpiringSoon ? colors.danger : colors.text,
                  },
                ]}
              >
                {isExpiringSoon ? `${item.daysLeft} day${item.daysLeft !== 1 ? "s" : ""}` : item.expiryDate}
              </Text>
            </View>
          </View>
        </View>
      </View>
    )
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={["top"]}>
      <View style={styles.header}>
        <Text style={[styles.headerTitle, { color: colors.text }]}>Smart Pantry</Text>
        <TouchableOpacity style={[styles.statsButton, { backgroundColor: colors.card }]}>
          <BarChart2 stroke={colors.text} width={20} height={20} />
        </TouchableOpacity>
      </View>

      <View style={[styles.searchContainer, { backgroundColor: colors.card, borderColor: colors.border }]}>
        <Search stroke={colors.text} width={20} height={20} />
        <TextInput
          style={[styles.searchInput, { color: colors.text }]}
          placeholder="Search pantry items..."
          placeholderTextColor={colors.text + "80"}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <TouchableOpacity style={[styles.scanButton, { backgroundColor: colors.primary }]}>
          <Camera stroke="#FFFFFF" width={18} height={18} />
        </TouchableOpacity>
      </View>

      <View style={styles.tabsContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === "all" && { backgroundColor: colors.primary }]}
          onPress={() => setActiveTab("all")}
        >
          <Text style={[styles.tabText, { color: activeTab === "all" ? "#FFFFFF" : colors.text }]}>All Items</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tab, activeTab === "expiring" && { backgroundColor: colors.primary }]}
          onPress={() => setActiveTab("expiring")}
        >
          <Text style={[styles.tabText, { color: activeTab === "expiring" ? "#FFFFFF" : colors.text }]}>
            Expiring Soon
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={filteredItems}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={[styles.emptyText, { color: colors.text }]}>
              No items found. Add some items to your pantry!
            </Text>
          </View>
        }
      />

      <TouchableOpacity style={[styles.addButton, { backgroundColor: colors.primary }]} onPress={handleAddItem}>
        <Plus stroke="#FFFFFF" width={24} height={24} />
      </TouchableOpacity>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
  },
  statsButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 50,
    marginBottom: 20,
  },
  searchInput: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
  },
  scanButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
  },
  tabsContainer: {
    flexDirection: "row",
    marginBottom: 16,
    gap: 12,
  },
  tab: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  tabText: {
    fontSize: 14,
    fontWeight: "500",
  },
  listContent: {
    paddingBottom: 100,
  },
  itemCard: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  itemHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  itemName: {
    fontSize: 16,
    fontWeight: "600",
  },
  itemCategory: {
    fontSize: 14,
    marginTop: 2,
  },
  shareButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
    gap: 4,
  },
  shareButtonText: {
    fontSize: 12,
    fontWeight: "500",
  },
  itemDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  detailItem: {
    flex: 1,
  },
  detailLabel: {
    fontSize: 12,
    marginBottom: 4,
  },
  detailValue: {
    fontSize: 14,
    fontWeight: "500",
  },
  expiryContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  expiryText: {
    fontSize: 14,
    fontWeight: "500",
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 40,
  },
  emptyText: {
    fontSize: 16,
    textAlign: "center",
  },
  addButton: {
    position: "absolute",
    bottom: 24,
    right: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
})

export default SmartPantry
