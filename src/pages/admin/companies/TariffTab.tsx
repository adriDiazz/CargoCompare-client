import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../common/components/ui/table";
import { GeneralTariffs } from "../../../common/interfaces/types";
import { CircleCheckBig, CircleXIcon } from "lucide-react";
import { createTariffByCompanyAndProvider } from "../../../services/tariffService";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../common/components/ui/select";
import { TariffTypes } from "../../../common/interfaces/TariffTypes";
import {
  Toast,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "../../../common/components/ui/toast";

const TariffTab = ({
  generalTariffs,
  companyId,
  providerId,
  updateProvider,
}: {
  generalTariffs: GeneralTariffs[] | undefined;
  companyId: string | undefined;
  providerId: string | undefined;
  updateProvider: () => Promise<void>;
}) => {
  const [isAddingNewRow, setIsAddingNewRow] = useState(false);
  const [toastOpen, setToastOpen] = useState(false);
  const [tariffFormData, setTariffFormData] = useState({
    parameter: "",
    price: 0,
    tariffType: TariffTypes.TRUCK,
  });

  const handleAddRow = () => {
    setIsAddingNewRow(!isAddingNewRow);
    setTariffFormData({
      parameter: "",
      price: 0,
      tariffType: TariffTypes.TRUCK,
    });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setTariffFormData((prev) => ({
      ...prev,
      [name]: name === "price" ? parseFloat(value) : value,
    }));
  };

  const handleSaveRow = async () => {
    try {
      if (!companyId || !providerId) throw new Error("IDs no definidos");

      await createTariffByCompanyAndProvider({
        logisticCompanyId: companyId,
        supplierId: providerId,
        tariffType: tariffFormData.tariffType,
        parameter: tariffFormData.parameter,
        price: tariffFormData.price,
      });
      setToastOpen(true);

      setTimeout(() => {
        updateProvider();
      }, 500);
    } catch (error) {
      console.error("Error al crear tarifa:", error);
    }

    setIsAddingNewRow(false);
  };

  return (
    <div className="mt-4">
      {/* Botón para añadir fila */}
      <div className="flex justify-end mb-4">
        <button
          className="px-4 py-2 bg-primary text-white rounded hover:bg-[#064877]"
          onClick={handleAddRow}
        >
          Añadir tarifa
        </button>
      </div>
      {generalTariffs && generalTariffs?.length > 0 ? (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Tipo</TableHead>
              <TableHead>Parámetro</TableHead>
              <TableHead>Precio (€)</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {generalTariffs?.map((tariff: GeneralTariffs) => (
              <TableRow key={tariff.id}>
                <TableCell>{tariff.tariffType}</TableCell>
                <TableCell>{tariff.parameter}</TableCell>
                <TableCell>{tariff.price}</TableCell>
              </TableRow>
            ))}
            {isAddingNewRow && (
              <TableRow>
                <TableCell>
                  <Select
                    value={tariffFormData.tariffType}
                    onValueChange={(value) =>
                      setTariffFormData((prev) => ({
                        ...prev,
                        tariffType: value as TariffTypes,
                      }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.values(TariffTypes).map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </TableCell>
                <TableCell>
                  <input
                    type="text"
                    name="parameter"
                    value={tariffFormData.parameter}
                    onChange={handleChange}
                    placeholder="Parámetro"
                    className="border p-2 rounded w-full"
                  />
                </TableCell>
                <TableCell>
                  <input
                    type="number"
                    name="price"
                    value={tariffFormData.price}
                    onChange={handleChange}
                    placeholder="Precio (€)"
                    className="border p-2 rounded w-full"
                  />
                </TableCell>
                <TableCell>
                  <div className="flex justify-center gap-2">
                    <button onClick={handleSaveRow}>
                      <CircleCheckBig className="text-green-600" />
                    </button>
                    <button onClick={handleAddRow}>
                      <CircleXIcon className="text-red-600" />
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      ) : (
        <p className="text-sm text-muted-foreground">
          No hay tarifas disponibles.
        </p>
      )}
      <ToastProvider>
        <Toast open={toastOpen} onOpenChange={setToastOpen}>
          <div className="grid gap-1">
            <ToastTitle>Éxito</ToastTitle>
            <ToastDescription>Tarifa guardada correctamente.</ToastDescription>
          </div>
        </Toast>
        <ToastViewport />
      </ToastProvider>
    </div>
  );
};

export default TariffTab;
