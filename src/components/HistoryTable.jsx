import { useState } from "react";
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { saveHistoryChat } from "../store/chatHistorySlice";

const columns = [
  { id: "time", label: "Time", minWidth: 170 },
  { id: "chats", label: "Chats", minWidth: 100 },
  {
    id: "open",
    label: "Open",
    minWidth: 170,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
];

function createData(time, chats, open) {
  return { time, chats, open };
}

// Define an array to accumulate history items
const newRows = [];

export default function HistoryTable({ history, setShowHistory }) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [rows] = useState([...newRows]);
  const dispatch = useDispatch();

  history.message.forEach((item) => {
    const historyItem = createData(
      `${item.time.replaceAll("T", " ").replaceAll("000Z", "")}`,
      `${JSON.parse(item.chats)[0]?.text}`,
      `${"open"}`
    );

    if (!newRows.find((el) => el.id === item.id)) {
      newRows.push({ id: item.id, item: historyItem, historyData: item });
    } else {
      return;
    }
  });

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleOpenHistory = (history) => {
    setShowHistory(false);
    dispatch(saveHistoryChat(history));
  };

  return (
    <Paper
      sx={{ width: "100%", overflow: "hidden", backgroundColor: "#F8FAFD" }}
    >
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                    {columns.map((column) => {
                      const value = row.item[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.id === "open" ? (
                            <Button
                              variant="contained"
                              style={{
                                backgroundColor: "#05445E",
                                color: "white",
                              }}
                              onClick={() => {
                                handleOpenHistory(row.historyData);
                              }}
                            >
                              {value}
                            </Button>
                          ) : column.format && typeof value === "number" ? (
                            column.format(value)
                          ) : (
                            value
                          )}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
