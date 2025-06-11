
import { createContext, useContext, ReactNode } from 'react'

interface DataProviderProps {
  children: ReactNode
  useMockData?: boolean // Flag to switch between mock and real API
}

interface DataContextType {
  useMockData: boolean
}

const DataContext = createContext<DataContextType | undefined>(undefined)

export function DataProvider({ children, useMockData = true }: DataProviderProps) {
  return (
    <DataContext.Provider value={{ useMockData }}>
      {children}
    </DataContext.Provider>
  )
}

export function useDataProvider() {
  const context = useContext(DataContext)
  if (context === undefined) {
    throw new Error('useDataProvider must be used within a DataProvider')
  }
  return context
}
