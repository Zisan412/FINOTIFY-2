import React, { createContext, useState, useContext, useCallback, useEffect } from 'react';
import axios from 'axios';

const DataContext = createContext(null);

const API_URL = 'http://192.168.43.242:3000/user';

export const DataProvider = ({ children }) => {
  const [dashboardData, setDashboardData] = useState([]);
  const [dueData, setDueData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchDashboard = useCallback(async () => {
    try {
      const res = await axios.get(`${API_URL}/getdashboardentry`);
      if (res.data && res.data.dashboard) {
        setDashboardData(res.data.dashboard);
      }
    } catch (err) {
      console.log('Dash fetch error:', err);
    }
  }, []);

  const fetchDue = useCallback(async () => {
    try {
      const res = await axios.get(`${API_URL}/getdue`);
      if (res.data && res.data.due) {
        setDueData(res.data.due);
      }
    } catch (err) {
      console.log('Due fetch error:', err);
    }
  }, []);

  const refreshAll = useCallback(async () => {
    setLoading(true);
    await Promise.all([fetchDashboard(), fetchDue()]);
    setLoading(false);
  }, [fetchDashboard, fetchDue]);

  // Pre-fetch data as soon as the app starts
  useEffect(() => {
    refreshAll();
  }, [refreshAll]);


  return (
    <DataContext.Provider value={{ 
      dashboardData, 
      setDashboardData, 
      dueData, 
      setDueData, 
      fetchDashboard, 
      fetchDue, 
      refreshAll,
      loading 
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    // This helps us debug if we call useData outside Provider
    return {};
  }
  return context;
};
