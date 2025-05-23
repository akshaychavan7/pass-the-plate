import { FoodItem, EnvironmentalImpact, ImpactCalculationResult, FoodCategory, PackagingType } from '../types/environmental-impact';

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

export function calculateEnvironmentalImpact(foodItems: FoodItem[]): ImpactCalculationResult {
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
    // Calculate impacts
    const carbonImpact = item.weight * CARBON_FACTORS[item.category];
    const waterImpact = item.weight * WATER_FACTORS[item.category];
    const packagingImpact = item.weight * PACKAGING_IMPACT[item.packaging];
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

  // Generate recommendations
  const recommendations = generateRecommendations(totalImpact, categoryBreakdown, packagingBreakdown);

  return {
    totalImpact,
    breakdown: {
      byCategory: categoryBreakdown,
      byPackaging: packagingBreakdown
    },
    recommendations
  };
}

function generateRecommendations(
  totalImpact: EnvironmentalImpact,
  categoryBreakdown: Record<FoodCategory, EnvironmentalImpact>,
  packagingBreakdown: Record<PackagingType, EnvironmentalImpact>
): string[] {
  const recommendations: string[] = [];

  // Carbon footprint recommendations
  if (totalImpact.carbonFootprint > 100) {
    recommendations.push("Consider reducing meat and dairy consumption to lower carbon footprint");
  }

  // Water usage recommendations
  if (totalImpact.waterUsage > 10000) {
    recommendations.push("Try to include more water-efficient food items in your sharing");
  }

  // Packaging recommendations
  if (packagingBreakdown[PackagingType.PLASTIC].packagingWaste > 5) {
    recommendations.push("Consider using less plastic packaging and opt for reusable containers");
  }

  // Food miles recommendations
  if (totalImpact.foodMiles > 1000) {
    recommendations.push("Try to source more local ingredients to reduce food miles");
  }

  return recommendations;
} 