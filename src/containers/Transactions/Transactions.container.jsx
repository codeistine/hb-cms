import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import Filter from "../../components/Filter/Filter.component";
import { Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import {
  FormControl,
  FormControlLabel,
  InputLabel,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableFooter,
  TablePagination,
  IconButton,
  makeStyles,
  useTheme,
  Snackbar,
  Grid,
  Checkbox,
} from "@material-ui/core";
import Alert from "@mui/material/Alert";
import * as actions from "../../redux/actions/index";
import { format } from "date-fns";
import PageLoading from "../../components/PageLoading/PageLoading.component";
import PageLoading1 from "../../components/PageLoading/PageLoading.component";
import LastPageIcon from "@material-ui/icons/LastPage";
import FirstPageIcon from "@material-ui/icons/FirstPage";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import ImageZoom from "../../components/ImageZoom/ImageZoom";
import Tupad from "../Tupad/Tupad.container";
const useStyles1 = makeStyles((theme) => ({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5),
  }
}));

function TablePaginationActions(props) {
  const classes = useStyles1();
  const theme = useTheme();
  const dispatch = useDispatch();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 1);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <div className={classes.root}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton onClick={handleNextButtonClick} aria-label="next page">
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
    </div>
  );
}

const images = [""]; // IMAGE ZOOM
const Transactions = () => {
  const transactions = useSelector((state) => state.hanepbuhayTransactions.transactions || []);
  const loading = useSelector((state) => state.hanepbuhayTransactions.fetchTransactionsLoading);
  const actionLoading = useSelector(state => state.hanepbuhayTransactions.actionLoading);
  const [sortedTransactions, setSortedTransactions] = useState([]);
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(-1);
  const emptyRows =
    rowsPerPage -
    Math.min(rowsPerPage, transactions.length - page * rowsPerPage);
  const hanepbuhayAuth = useSelector(
    (state) => state.hanepbuhayAuthenticator.hanepbuhayAuth || ""
  );

  const { control, setValue, handleSubmit } = useForm();
  const [rejectModal, setRejectModal] = useState(false);
  const [viewFormModal, setViewFormModal] = useState(false);
  const [componentsForm, setComponentsForm] = useState(null)
  const rejectRemarks = useSelector((state) => state.hanepbuhayTransactions.rejectRemarks);
  const actionSuccessMessage = useSelector((state) => state.hanepbuhayTransactions.actionMessageSuccess);
  const actionErrorMessage = useSelector((state) => state.hanepbuhayTransactions.actionMessageFailed);
  console.log(actionSuccessMessage)

  const [openError, setOpenError] = useState(false);
  const [openSuccess, setOpenSuccess] = useState(false);
  const [remarks, setRemarks] = useState("");
  const [errorMsg, setErrorMsg] = useState(null)

  // GET ALL INPUT FORM DATA
  const [full_name, set_full_name] = useState(null);
  const [address, set_address] = useState(null);
  const [id_number, set_id_number] = useState(null);
  const [birth_date, set_birth_date] = useState(null);
  const [expiry_date, set_expiry_date] = useState(null);
  const [mobile_number, set_mobile_number] = useState(null);

  //#region USE EFFECT
  useEffect(() => {
    if (actionErrorMessage && actionErrorMessage.length > 0) {
      showErrorMsg(actionErrorMessage)
    } else {
      setOpenError(false);
    }
  }, [actionErrorMessage])

  useEffect(() => {
    if (actionSuccessMessage) {
      setOpenSuccess(true);
    } else {
      setOpenSuccess(false);
    }
  }, [actionSuccessMessage])

  useEffect(() => {
    dispatch(actions.onFetchTransactions(1));
  }, [dispatch]);

  useEffect(() => {
    if (transactions) {
      setRemarks(transactions.remarks);
    }
  }, [transactions]);
  //#endregion

  //#region HANDLE CHANGE
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    dispatch(actions.onFetchTransactions(newPage));
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  //#endregion

  //#region FORMAT FOR BIRTHDATE
  function formatDate(date) {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  }
  //#endregion

  //#region APPROVE TRANSACTION
  const onApproveTransaction = (id, f_full_name, f_address, f_id_number, f_birth_date, f_expiry_date, f_mobile_number) => {

    // if state data is changed
    var formatBirthDate = birth_date !== null ? formatDate(birth_date) : formatDate(f_birth_date);

    const idData = JSON.stringify({
      id: id,
      id_number: id_number !== null ? id_number : f_id_number,
      name: full_name !== null ? full_name : f_full_name,
      address: address !== null ? address : f_address,
      birth_date: formatBirthDate,
      expiry_date: expiry_date !== null ? expiry_date : f_expiry_date,
      mobile_number: mobile_number !== null ? mobile_number : f_mobile_number
    });
    dispatch(actions.onApproveId(id, idData));

    //Clear all data after submit
    set_full_name(null);
    set_address(null);
    set_id_number(null);
    set_birth_date(null);
    set_expiry_date(null);
    set_mobile_number(null);

  };
  //#endregion

  //#region REJECT TRANSACTION
  const [proceedID, setProceedID] = useState(null);
  const [proceed_name, setProceed_name] = useState(null);
  const [proceed_address, setProceed_address] = useState(null);
  const [proceed_id_number, setProceed_id_number] = useState(null);
  const [proceed_birth_date, setProceed_birth_date] = useState(null);
  const [proceed_expiry_date, setProceed_expiry_date] = useState(null);
  const [proceed_mobile_number, setProceed_mobile_number] = useState(null);
  const [proceed_remarks, setProceed_remarks] = useState(null);

  const rejectProceed = (
    id,
    name,
    address,
    id_number,
    birth_date,
    expiry_date,
    mobile_number,
    remarks
  ) => {
    setRejectModal(true);
    setProceedID(id);
    setProceed_name(name);
    setProceed_address(address);
    setProceed_id_number(id_number);
    setProceed_birth_date(birth_date);
    setProceed_expiry_date(expiry_date);
    setProceed_mobile_number(mobile_number);
    setProceed_remarks(remarks);
  };

  const onRejectTransaction = async (
    id,
    name,
    address,
    id_number,
    birth_date,
    expiry_date,
    mobile_number,
    remarks
  ) => {
    var formatBirthDate = formatDate(birth_date);

    const idData = JSON.stringify({
      id: id,
      name: name,
      address: address,
      id_number: id_number,
      birth_date: formatBirthDate,
      expiry_date: expiry_date,
      mobile_number: mobile_number,
      remarks: remarks,
    });
    await dispatch(actions.onRejectId(id, idData));

    setRejectModal(false)
  };
  //#endregion

  // #region VIEW TUPAD FORM
  const showErrorMsg = (msg) => {
    setErrorMsg(msg)
    setOpenError(true)
  }
  const viewTupadForm = (id) => {
    if (!id) return showErrorMsg("Form ID undefined");

    setComponentsForm(id)
    setViewFormModal(true)
  }

  const test = () => {
    window.location.reload(false);
    setViewFormModal(false);
  }
  //#endregion

  //#region SNACKBAR CLOSE
  const handleClose = (event, reason) => {
  // window.location.reload(false);
    if (reason === "clickaway") {
      return;
    }
    setOpenSuccess(false);
    setOpenError(false);
  };
  //#endregion

  const adminRestrict =
    hanepbuhayAuth.role === "ADMIN" ? <Redirect to="/transaction" /> : null;
  return (
    <React.Fragment>
      {adminRestrict}
      <PageLoading loading={actionLoading} />
      <PageLoading1 loading={loading} />
      <Filter page="transactions" />
      <div className="Transactions">
        <TableContainer>
          <Table>
            <TableHead className="Transactions__head">
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>ID File</TableCell>
                <TableCell>ID Number</TableCell>
                <TableCell>ID Type</TableCell>
                <TableCell>HB Username</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Address</TableCell>
                <TableCell>Date of Birth</TableCell>
                <TableCell>Mobile Number</TableCell>
                <TableCell>Registered Date</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Remarks</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>

            <TableBody className="Transactions__body">
              {hanepbuhayAuth.role !== "COLLABORATOR_ADMIN" &&
                transactions.map((transaction, i) => {
                  const transactionBirthDateFormatted = transaction.birth_date
                    ? format(new Date(transaction.birth_date), "MM/dd/yyyy")
                    : null;
                  const transactionRegisteredDateFormatted =
                    transaction.registered_date
                      ? format(
                        new Date(transaction.registered_date),
                        "MM/dd/yyyy HH:mm"
                      )
                      : null;
                  return (
                    <TableRow key={i} hover>
                      <TableCell>{transaction.id}</TableCell>
                      <TableCell>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            width: "70px",
                          }}
                        >
                          {images.map((image) => (
                            <ImageZoom
                              key={transaction.id_file}
                              src={transaction.id_file}
                            />
                          ))}
                        </div>
                      </TableCell>

                      <TableCell
                        contentEditable={true}
                        suppressContentEditableWarning={true}
                        onInput={(e) => set_id_number(e.target.innerText)}
                      >
                        {transaction.id_number}
                      </TableCell>

                      <TableCell>{transaction.id_type}</TableCell>

                      <TableCell>{transaction.hb_username}</TableCell>

                      <TableCell
                        contentEditable={true}
                        suppressContentEditableWarning={true}
                        onInput={(e) => set_full_name(e.target.innerText)}
                      >
                        {transaction.full_name}
                      </TableCell>

                      <TableCell
                        contentEditable
                        suppressContentEditableWarning={true}
                        onInput={(e) => set_address(e.target.innerText)}
                      >
                        {transaction.address}
                      </TableCell>

                      <TableCell
                        contentEditable
                        suppressContentEditableWarning={true}
                        onInput={(e) => set_birth_date(e.target.innerText)}
                      >
                        {transactionBirthDateFormatted}
                      </TableCell>

                      <TableCell
                        contentEditable
                        suppressContentEditableWarning={true}
                        onInput={(e) => set_mobile_number(e.target.innerText)}
                      >
                        {transaction.mobile_number}
                      </TableCell>

                      <TableCell>
                        {transactionRegisteredDateFormatted}
                      </TableCell>

                      <TableCell>{transaction.status}</TableCell>

                      <TableCell>{transaction.remarks}</TableCell>

                      {transaction.status === "PENDING" &&
                        hanepbuhayAuth.role !== "ADMIN" &&
                        hanepbuhayAuth.role !== "AUDITOR" && (
                          <TableCell className="actionButton">
                            {transaction.id_type === "TUPAD" && (
                              <Button
                                variant="outlined"
                                className="view-form"
                                onClick={() => viewTupadForm(
                                  transaction.components.form
                                )}
                              >
                                VIEW FORM
                              </Button>
                            )}

                            <Button
                              variant="contained"
                              className="approved"
                              onClick={() =>
                                onApproveTransaction(
                                  transaction.id,
                                  transaction.full_name,
                                  transaction.address,
                                  transaction.id_number,
                                  transaction.birth_date,
                                  transaction.expiry_date,
                                  transaction.mobile_number
                                )
                              }
                            >
                              APPROVE
                            </Button>
                            <Button
                              variant="outlined"
                              className="disapproved"
                              onClick={() =>
                                rejectProceed(
                                  transaction.id,
                                  transaction.full_name,
                                  transaction.address,
                                  transaction.id_number,
                                  transaction.birth_date,
                                  transaction.expiry_date,
                                  transaction.mobile_number,
                                  transaction.remarks
                                )
                              }
                            >
                              DISAPPROVE
                            </Button>
                          </TableCell>
                        )}
                    </TableRow>
                  );
                })}

              {emptyRows > 0 && (
                <TableRow style={{ height: 50 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>

            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[15, 25, 50, { label: "All", value: -1 }]}
                  colSpan={14}
                  count={sortedTransactions.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  SelectProps={{
                    inputProps: { "aria-label": "rows per page" },
                    native: true,
                  }}
                  onPageChange={handleChangePage}
                  onChangeRowsPerPage={handleChangeRowsPerPage}
                  ActionsComponent={TablePaginationActions}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      </div>

      <Dialog open={viewFormModal}>
        <DialogContent>
          <Tupad id={componentsForm} />
        </DialogContent>

        <DialogActions>
          <Button variant="contained" onClick={() => window.location.reload(false)}> CLOSE </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={rejectModal}>
        <DialogTitle> ID Rejection Remarks </DialogTitle>
        <DialogContent>
          <FormControl>
            <Controller
              name="reject"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  id="reject"
                  style={{ width: "100%" }}
                  onChange={(e) => setRemarks(e.target.value)}
                />
              )}
            />
          </FormControl>
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setRejectModal(false)}> CLOSE </Button>
          <Button
            onClick={() =>
              onRejectTransaction(
                proceedID,
                proceed_name,
                proceed_address,
                proceed_id_number,
                proceed_birth_date,
                proceed_expiry_date,
                proceed_mobile_number,
                remarks
              )
            }
          >
            PROCEED
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar open={openError} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error">
          {errorMsg}
        </Alert>
      </Snackbar>

      <Snackbar open={openSuccess} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          {actionSuccessMessage}
        </Alert>
      </Snackbar>
    </React.Fragment>
  );
};

export default Transactions;
