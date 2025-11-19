// Centralized vehicle data aggregator
// Imports models from all vehicle files and transforms them for use in dropdowns
// Data structure follows boodmo.com format: Maker -> Model -> Year -> Modifications

import { marutiModels } from '../component/Vehicles/Maruti';
import { hyundaiModels } from '../component/Vehicles/Hyundai';
import { tataModels } from '../component/Vehicles/Tata';
import { mahindraModels } from '../component/Vehicles/Mahindra';
import { chevroletModels } from '../component/Vehicles/Chevrolet';
import { hondaModels } from '../component/Vehicles/Honda';
import { fiatModels } from '../component/Vehicles/Fiat';
import { kiaModels } from '../component/Vehicles/Kia';
import { nissanModels } from '../component/Vehicles/Nissan';
import { audiModels } from '../component/Vehicles/Audi';
import { fordModels } from '../component/Vehicles/Ford';
import { toyotaModels } from '../component/Vehicles/Toyota';
import { skodaModels } from '../component/Vehicles/Skoda';
import { renaultModels } from '../component/Vehicles/Renault';
import { vwModels } from '../component/Vehicles/Vw';
import { ashokLaylandModels } from '../component/Vehicles/AshokLayland';
import { transformVehicleData, getVehicleImage } from '../utils/vehicleDataAggregator';

// Map of all vehicle models by maker
const vehicleModelsMap = {
  MARUTI: marutiModels,
  HYUNDAI: hyundaiModels,
  TATA: tataModels,
  MAHINDRA: mahindraModels,
  CHEVROLET: chevroletModels,
  HONDA: hondaModels,
  FIAT: fiatModels,
  KIA: kiaModels,
  NISSAN: nissanModels,
  AUDI: audiModels,
  FORD: fordModels,
  TOYOTA: toyotaModels,
  SKODA: skodaModels,
  RENAULT: renaultModels,
  VW: vwModels,
  'ASHOK LAYLAND': ashokLaylandModels,
};

// Transform all vehicle data to the format needed by BoodmoUi
// Format: { MAKER: { MODEL: { YEAR: [modifications] } } }
export const getVehicleData = () => {
  const transformed = {};
  
  Object.keys(vehicleModelsMap).forEach((makerName) => {
    const models = vehicleModelsMap[makerName];
    if (models && Array.isArray(models)) {
      transformed[makerName] = transformVehicleData(makerName, models);
    }
  });
  
  return transformed;
};

// Get vehicle image for a specific maker and model
export const getVehicleImageUrl = (makerName, modelName) => {
  const models = vehicleModelsMap[makerName];
  if (!models || !Array.isArray(models)) return null;
  
  return getVehicleImage(vehicleModelsMap, makerName, modelName);
};

// Get all available makers
export const getVehicleMakers = () => {
  return Object.keys(vehicleModelsMap).sort();
};

// Get models for a specific maker
export const getModelsForMaker = (makerName) => {
  const data = getVehicleData();
  return makerName && data[makerName] ? Object.keys(data[makerName]).sort() : [];
};

// Get years for a specific maker and model
export const getYearsForModel = (makerName, modelName) => {
  const data = getVehicleData();
  if (!makerName || !modelName || !data[makerName] || !data[makerName][modelName]) {
    return [];
  }
  return Object.keys(data[makerName][modelName])
    .map(year => parseInt(year))
    .sort((a, b) => b - a); // Sort descending (newest first)
};

// Get modifications for a specific maker, model, and year
export const getModificationsForYear = (makerName, modelName, year) => {
  const data = getVehicleData();
  const yearKey = year.toString(); // Convert year to string for object key access
  if (!makerName || !modelName || !year || !data[makerName] || !data[makerName][modelName] || !data[makerName][modelName][yearKey]) {
    return [];
  }
  return data[makerName][modelName][yearKey] || [];
};

