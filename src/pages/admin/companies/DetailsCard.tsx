import { LogisticCompany, Supplier } from "../../../common/interfaces/types";
import { Info } from "../../../common/components/info";

interface DetailsCardProps {
  company: LogisticCompany | Supplier;
}

const DetailsCard: React.FC<DetailsCardProps> = ({ company }) => {
  return (
    //
    <div className="p-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
        {/* Logo */}
        <div className="col-span-full flex justify-start">
          <img
            src={company?.logo}
            alt={company?.name}
            className="w-48 h-48 object-contain rounded-md shadow"
          />
        </div>

        <Info label="Nombre" value={company?.name} />
        <Info label="Razón Social" value={company?.socialReason} />
        <Info label="CIF" value={company?.cif} />
        <Info label="Descripción" value={company?.description} />
        <Info label="Teléfono" value={company?.phone} />
        <Info label="Email" value={company?.email} />
        <Info label="Web" value={company?.webSite} />
        <Info label="Persona de Contacto" value={company?.contactPerson} />
        <Info label="Teléfono de Contacto" value={company?.contactPhone} />
        <Info label="Email de Contacto" value={company?.contactEmail} />
        <Info label="Dirección" value={company?.address} />
        <Info label="Código Postal" value={company?.postalCode} />
        <Info label="Ciudad" value={company?.city} />
        <Info label="Provincia" value={company?.province} />
        <Info label="País" value={company?.country} />
      </div>
    </div>
  );
};

export default DetailsCard;
