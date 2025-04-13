import { create } from "zustand";
import { Supplier } from "../../interfaces/types"; // ajusta la ruta según dónde lo tengas

interface SuppliersList {
  suppliers: Supplier[];         
  isLoading: boolean;            
  setLoading: (isLoading: boolean) => void;
  setSuppliers: (suppliers: Supplier[]) => void;
  addNewSupplier: (supplier: Supplier) => void;
}

export const useSuppliersListStore = create<SuppliersList>((set) => ({
  suppliers: [],
  isLoading: true,
  setLoading: (isLoading) => set({ isLoading }),

  setSuppliers: (suppliers) =>
    set({ suppliers }),

  addNewSupplier: (supplier) =>
    set((state) => ({ suppliers: [...state.suppliers, supplier] })),
}));
