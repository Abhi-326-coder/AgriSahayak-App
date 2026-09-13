import { useState, useEffect } from 'react';
import { useFarmerStore } from '../../../store/farmerStore';
import { cropService } from '../../../services/api/marketplace';

export interface FarmMetrics {
  soilMoisture: number;
  temperature: number;
  expectedYield: string;
  marketPrice: number;
  activeAlertsCount: number;
}

export const useDashboard = () => {
  const { farmer } = useFarmerStore();
  const [metrics, setMetrics] = useState<FarmMetrics>({
    soilMoisture: 68,
    temperature: 28,
    expectedYield: '180 Quintals',
    marketPrice: 3100,
    activeAlertsCount: 1,
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // In Phase 1, dashboard combines farmer store + mock farm state
  }, [farmer]);

  return {
    farmer,
    metrics,
    loading,
  };
};
