import {type GridColDef, GridVisibilityOffIcon} from "@mui/x-data-grid";
import CustomDataGrid from "../../base/component/datagrid/CustomDataGrid";


export const terminalColumns: GridColDef[] = [
    { field: "nbImsi", headerName: "Nb IMSI", width: 100, headerAlign: "center", align: "center" },
    { field: "tmsi1", headerName: "TMSI-1", width: 120, headerAlign: "center", align: "center" },
    { field: "tmsi2", headerName: "TMSI-2", width: 120, headerAlign: "center", align: "center" },
    { field: "imsi", headerName: "IMSI", width: 180, headerAlign: "center", align: "center" },
    { field: "country", headerName: "Country", width: 100, headerAlign: "center", align: "center" },
    { field: "brand", headerName: "Brand", width: 150, headerAlign: "center", align: "center" },
    { field: "operator", headerName: "Operator", width: 250, headerAlign: "center", align: "center" },
    { field: "mcc", headerName: "MCC", width: 80, headerAlign: "center", align: "center" },
    { field: "mnc", headerName: "MNC", width: 80, headerAlign: "center", align: "center" },
    { field: "lac", headerName: "LAC", width: 100, headerAlign: "center", align: "center" },
    { field: "cellId", headerName: "CellId", width: 100, headerAlign: "center", align: "center" },
    { field: "timestamp", headerName: "Timestamp", width: 180, headerAlign: "center", align: "center" },
    {
        field: "actions",
        headerName: "Actions",
        width: 100,
        headerAlign: "center",
        sortable: false,
        filterable: false,
        renderCell: (params) => (
            <button
                style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    color: "#117fd0"
                }}
                onClick={() => alert(`Viewing record ${params.row.nbImsi}`)}
            >
                مشاهده
            </button>
        ),
    },
];
export const terminalRows = [
    {
        id: 1,               // ← اضافه شد
        nbImsi: 1,
        tmsi1: "0x0c28b914",
        tmsi2: null,
        imsi: "432350462698625",
        country: "Iran",
        brand: "MTN Irancell",
        operator: "MTN Irancell Telecommunications Services Company",
        mcc: 432,
        mnc: 35,
        lac: 12830,
        cellId: 16645,
        timestamp: "2025-11-09T10:48:56.840811",
    },
    {
        id: 2,               // ← اضافه شد
        nbImsi: 2,
        tmsi1: "0x371f3c04",
        tmsi2: "0x56469519",
        imsi: "432350711093172",
        country: "Iran",
        brand: "MTN Irancell",
        operator: "MTN Irancell Telecommunications Services Company",
        mcc: 432,
        mnc: 35,
        lac: 12830,
        cellId: 16645,
        timestamp: "2025-11-09T10:49:04.682151",
    },
    {
        id: 3,               // ← اضافه شد
        nbImsi: 3,
        tmsi1: "0xdb5cea51",
        tmsi2: "0x09043ab9",
        imsi: "432350452597296",
        country: "Iran",
        brand: "MTN Irancell",
        operator: "MTN Irancell Telecommunications Services Company",
        mcc: 432,
        mnc: 35,
        lac: 12830,
        cellId: 16645,
        timestamp: "2025-11-09T10:49:23.419227",
    },
];



export default function TestPage() {



    return (
        <div style={{width:"100%", height: "500px", padding: "20px" }}>
            <CustomDataGrid
                columns={terminalColumns}
                rows={terminalRows}
                pageSize={5}
                enableActions={true}
            />
        </div>
    )
}
