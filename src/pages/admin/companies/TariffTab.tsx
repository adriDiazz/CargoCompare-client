import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../components/ui/table";
import { GeneralTariffs } from "../../../interfaces/types";
import { CircleCheckBig, CircleXIcon } from "lucide-react";

const TariffTab = ({
  generalTariffs,
}: {
  generalTariffs: GeneralTariffs[] | undefined;
}) => {
  const [isAddingNewRow, setIsAddingNewRow] = useState(false);

  const handleAddRow = () => {
    setIsAddingNewRow(!isAddingNewRow);
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
                  <input
                    type="text"
                    placeholder="Tipo"
                    className="border p-2 rounded w-full"
                  />
                </TableCell>
                <TableCell>
                  <input
                    type="text"
                    placeholder="Parámetro"
                    className="border p-2 rounded w-full"
                  />
                </TableCell>
                <TableCell>
                  <input
                    type="number"
                    placeholder="Precio (€)"
                    className="border p-2 rounded w-full"
                  />
                </TableCell>
                <TableCell>
                  <div className="flex justify-center gap-2">
                    <button>
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
    </div>
  );
};

export default TariffTab;
