import { CompanieForTable, LogisticCompany, UserForTable, UserFullData } from "../common/interfaces/types";
import { Column } from "../pages/ui/GeneralTable";

export const companiesKeys = [
    "Id",
    "Logo",
    "Nombre",
    "CodigoPostal",
    "Ciudad",
    "Provincia",
];

export const userKeys = [
    "Id",
    "Nombre",
    "Email",
    "Rol",
    "Empresa"
]


export const getTablesColumns = (keys: string[]): Column[] => {
    const columnKeys = keys;
    
    return columnKeys.map((key) => {
        return {
            id: key,
            label: key,
            minWidth: 150,
            align: "left",
        }
    });
};

export const getTablesCompaniesRows = (companies: LogisticCompany[]): CompanieForTable[] => {
    return companies.map((company) => {
        return {
            Id: company.id,
            Logo: company.logo,
            Nombre: company.name,
            CodigoPostal: company.postalCode,
            Ciudad: company.city,
            Provincia: company.province,
        }
    });
}

export const getTablesUserRows = (users: UserFullData[]): UserForTable[] => {

    return users.map(
        (user) => {
            return {
                Id: user.id,
                Nombre: user.name,
                Email: user.email,
                Rol: user.role,
                Empresa: user.logisticCompany?.name || "",
            }
        }
    )
}

