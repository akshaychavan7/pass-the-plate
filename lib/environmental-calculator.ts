import { FoodItem, EnvironmentalImpact, ImpactCalculationResult, FoodCategory, PackagingType, Unit } from '../types/environmental-impact';

// Unit conversion factors to kg
const UNIT_CONVERSIONS = {
  [Unit.KG]: 1,
  [Unit.G]: 0.001,
  [Unit.LB]: 0.453592,
  [Unit.OZ]: 0.0283495,
  [Unit.L]: 1, // 1 liter of water = 1 kg
  [Unit.ML]: 0.001,
  [Unit.PCS]: 0.1, // Assuming average piece weight of 100g
};

// Constants for impact calculations
const CARBON_FACTORS = {
  [FoodCategory.MEAT]: 27.0, // kg CO2e per kg
  [FoodCategory.DAIRY]: 13.5,
  [FoodCategory.PRODUCE]: 2.0,
  [FoodCategory.GRAINS]: 2.7,
  [FoodCategory.PROCESSED]: 5.0
};

const WATER_FACTORS = {
  [FoodCategory.MEAT]: 15000, // liters per kg
  [FoodCategory.DAIRY]: 1000,
  [FoodCategory.PRODUCE]: 300,
  [FoodCategory.GRAINS]: 1600,
  [FoodCategory.PROCESSED]: 500
};

const PACKAGING_IMPACT = {
  [PackagingType.PLASTIC]: 2.5, // kg CO2e per kg
  [PackagingType.PAPER]: 1.0,
  [PackagingType.GLASS]: 1.2,
  [PackagingType.METAL]: 1.5,
  [PackagingType.NONE]: 0
};

// Convert quantity to kg based on unit
function convertToKg(quantity: number, unit: Unit): number {
  return quantity * UNIT_CONVERSIONS[unit];
}

// Get Gemini API recommendations
async function getGeminiRecommendations(foodItems: FoodItem[], totalImpact: EnvironmentalImpact): Promise<string[]> {
  try {
    const response = await fetch('http://localhost:8000/api/environmental-impact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        foodItems,
        totalImpact,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || 'Failed to get recommendations');
    }

    const data = await response.json();
    return data.recommendations;
  } catch (error) {
    console.error('Error getting Gemini recommendations:', error);
    return generateDefaultRecommendations(totalImpact);
  }
}

// Default recommendations if Gemini API fails
function generateDefaultRecommendations(totalImpact: EnvironmentalImpact): string[] {
  const recommendations: string[] = [];

  if (totalImpact.carbonFootprint > 100) {
    recommendations.push("Consider reducing meat and dairy consumption to lower carbon footprint");
  }
  if (totalImpact.waterUsage > 10000) {
    recommendations.push("Try to include more water-efficient food items in your sharing");
  }
  if (totalImpact.foodMiles > 1000) {
    recommendations.push("Try to source more local ingredients to reduce food miles");
  }

  return recommendations;
}

export async function calculateEnvironmentalImpact(foodItems: FoodItem[]): Promise<ImpactCalculationResult> {
  const totalImpact: EnvironmentalImpact = {
    carbonFootprint: 0,
    waterUsage: 0,
    packagingWaste: 0,
    foodMiles: 0
  };

  const categoryBreakdown: Record<FoodCategory, EnvironmentalImpact> = {
    [FoodCategory.MEAT]: { ...totalImpact },
    [FoodCategory.DAIRY]: { ...totalImpact },
    [FoodCategory.PRODUCE]: { ...totalImpact },
    [FoodCategory.GRAINS]: { ...totalImpact },
    [FoodCategory.PROCESSED]: { ...totalImpact }
  };

  const packagingBreakdown: Record<PackagingType, EnvironmentalImpact> = {
    [PackagingType.PLASTIC]: { ...totalImpact },
    [PackagingType.PAPER]: { ...totalImpact },
    [PackagingType.GLASS]: { ...totalImpact },
    [PackagingType.METAL]: { ...totalImpact },
    [PackagingType.NONE]: { ...totalImpact }
  };

  foodItems.forEach(item => {
    // Convert quantity to kg for calculations
    const weightInKg = convertToKg(item.quantity, item.unit);

    // Calculate impacts
    const carbonImpact = weightInKg * CARBON_FACTORS[item.category];
    const waterImpact = weightInKg * WATER_FACTORS[item.category];
    const packagingImpact = weightInKg * PACKAGING_IMPACT[item.packaging];
    const foodMiles = item.isLocal ? 50 : 1500; // Simplified calculation

    // Update total impact
    totalImpact.carbonFootprint += carbonImpact;
    totalImpact.waterUsage += waterImpact;
    totalImpact.packagingWaste += packagingImpact;
    totalImpact.foodMiles += foodMiles;

    // Update category breakdown
    categoryBreakdown[item.category].carbonFootprint += carbonImpact;
    categoryBreakdown[item.category].waterUsage += waterImpact;
    categoryBreakdown[item.category].packagingWaste += packagingImpact;
    categoryBreakdown[item.category].foodMiles += foodMiles;

    // Update packaging breakdown
    packagingBreakdown[item.packaging].carbonFootprint += carbonImpact;
    packagingBreakdown[item.packaging].waterUsage += waterImpact;
    packagingBreakdown[item.packaging].packagingWaste += packagingImpact;
    packagingBreakdown[item.packaging].foodMiles += foodMiles;
  });

  // Get recommendations from Gemini API
  const recommendations = await getGeminiRecommendations(foodItems, totalImpact);

  return {
    totalImpact,
    breakdown: {
      byCategory: categoryBreakdown,
      byPackaging: packagingBreakdown
    },
    recommendations
  };
} 