export enum Unit {
  KG = 'kg',
  G = 'g',
  LB = 'lb',
  OZ = 'oz',
  L = 'l',
  ML = 'ml',
  PCS = 'pcs'
}

export interface FoodItem {
  name: string;
  quantity: number;
  unit: Unit;
  category: FoodCategory;
  packaging: PackagingType;
  isLocal: boolean;
}

export enum FoodCategory {
  MEAT = 'meat',
  DAIRY = 'dairy',
  PRODUCE = 'produce',
  GRAINS = 'grains',
  PROCESSED = 'processed'
}

export enum PackagingType {
  PLASTIC = 'plastic',
  PAPER = 'paper',
  GLASS = 'glass',
  METAL = 'metal',
  NONE = 'none'
}

export interface EnvironmentalImpact {
  carbonFootprint: number; // in kg CO2e
  waterUsage: number; // in liters
  packagingWaste: number; // in kg
  foodMiles: number; // in km
}

export interface ImpactCalculationResult {
  totalImpact: EnvironmentalImpact;
  breakdown: {
    byCategory: Record<FoodCategory, EnvironmentalImpact>;
    byPackaging: Record<PackagingType, EnvironmentalImpact>;
  };
  recommendations: string[];
} 