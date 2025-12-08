import {type GridColDef, GridVisibilityOffIcon} from "@mui/x-data-grid";
import CustomDataGrid from "../../base/component/datagrid/CustomDataGrid";


export const terminalColumns: GridColDef[] = [
    { field: "count", headerName: "تعداد تکرار", width: 100, headerAlign: "center", align: "center" },
    { field: "imsi", headerName: "IMSI", width: 180, headerAlign: "center", align: "center" },
    { field: "tmsi1", headerName: "TMSI-1", width: 120, headerAlign: "center", align: "center" },
    { field: "tmsi2", headerName: "TMSI-2", width: 120, headerAlign: "center", align: "center" },
    { field: "country", headerName: "Country", width: 100, headerAlign: "center", align: "center" },
    { field: "brand", headerName: "Brand", width: 150, headerAlign: "center", align: "center" },
    { field: "operator", headerName: "Operator", width: 250, headerAlign: "center", align: "center" },
    { field: "mcc", headerName: "MCC", width: 80, headerAlign: "center", align: "center" },
    { field: "mnc", headerName: "MNC", width: 80, headerAlign: "center", align: "center" },
    { field: "lac", headerName: "LAC", width: 100, headerAlign: "center", align: "center" },
    { field: "cellId", headerName: "CellId", width: 100, headerAlign: "center", align: "center" },
    { field: "last_seen", headerName: "Timestamp", width: 180, headerAlign: "center", align: "center" },
    {
        field: "actions",
        headerName: "عملیات",
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
                onClick={() => alert(`Viewing record ${params.row.imsi}`)}
            >
                مشاهده
            </button>
        ),
    },
];




export default function TestPage() {



    return (
        <div style={{width:"100%", height: "100%", padding: "5px" }}>
            <CustomDataGrid
                requestConfig={{ url: "http://127.0.0.1:5000/imsi" ,method:"GET"}}
                columns={terminalColumns}
                pageSize={5}

                enableActions={true}
            />
        </div>
    )
}
