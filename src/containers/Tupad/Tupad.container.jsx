import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
    FormControlLabel,
    TableContainer,
    Table,
    TableBody,
    TableRow,
    TableCell,
    Checkbox,
    Grid,
    Button,
    Snackbar,
    Box,
} from "@material-ui/core";
import * as actions from "../../redux/actions/index";
import * as moment from 'moment';
import Alert from "@mui/material/Alert";
import { MuiPickersUtilsProvider, DatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { format } from "date-fns";
import ImageRotate from "../../components/ImageRotate/ImageRotate";
import ImagePreview from "../../components/ImagePreview/ImagePreview";
import PageLoading1 from "../../components/PageLoading/PageLoading.component";

const images = [""]; // IMAGE ZOOM

const Tupad = (id) => {
    const tupad = useSelector((state) => state.hanepbuhayTupad.tupad);
    const loading = useSelector((state) => state.hanepbuhayTupad.fetchTupadLoading);
    const actionSuccessMessage = useSelector((state) => state.hanepbuhayTupad.actionMessageSuccess);
    const actionErrorMessage = useSelector((state) => state.hanepbuhayTupad.actionMessageFailed);
    const [birthday_data, set_birthday] = useState(null);
    const [signed_date_data, set_signed_date] = useState(null);
    const [image, setImage] = useState(null);
    const [openError, setOpenError] = useState(false);
    const [openSuccess, setOpenSuccess] = useState(false);
    const dispatch = useDispatch();

    //#region SNACKBAR CLOSE
    const [sucessMsg, setSucessMsg] = useState(null);

    const showSuccessMsg = (msg) => {
        setSucessMsg(msg);
        setOpenSuccess(true);
    }
    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        setOpenSuccess(false);
        setOpenError(false);
    };
    //#endregion

    // #region VIEW TUPAD FORM
    // HANDLE CHECKBOX
    const [projectGroup, setProjectGroup] = useState(null);
    const [projectIndividual, setProjectIndividual] = useState(null);
    const [projectFormation, setProjectFormation] = useState(null);
    const [projectRestoration, setProjectRestoration] = useState(null);
    const [projectEnhancement, setProjectEnhancement] = useState(null);
    const [implementationAcp, setImplementationAcp] = useState(null);
    const [implementationDirectAdmin, setImplementationDirectAdmin] = useState(null);
    const [male, setMale] = useState(null);
    const [female, setFemale] = useState(null);
    const [fourpsBeneficiary, setFourpsBeneficiary] = useState(null);
    const [notfourpsBeneficiary, setNotfourpsBeneficiary] = useState(null);

    // DATA SEND TO THE SERVER
    const [id_number, set_id_number] = useState(tupad.id_number);
    const [project_region, set_project_region] = useState(tupad.project_region);
    const [project_province, set_project_province] = useState(tupad.project_province);
    const [project_city, set_project_city] = useState(tupad.project_city);
    const [project_district, set_project_district] = useState(tupad.project_district);
    const [project_barangay, set_project_barangay] = useState(tupad.project_barangay);
    const [project_street, set_project_street] = useState(tupad.project_street);
    const [project_type, set_project_type] = useState(tupad.project_type);
    const [project_component, set_project_component] = useState(tupad.project_component);
    const [project_name, set_project_name] = useState(tupad.project_name);
    const [implementation_type, set_implementation_type] = useState(tupad.implementation_type)
    const [last_name, set_last_name] = useState(tupad.last_name);
    const [first_name, set_first_name] = useState(tupad.first_name);
    const [middle_name, set_middle_name] = useState(tupad.middle_name);
    const [gender, set_gender] = useState(tupad.gender);
    const [civil_status, set_civil_status] = useState(tupad.civil_status);
    const [disability, set_disability] = useState(tupad.disability);
    const [address, set_address] = useState(tupad.address);
    const [mobile_number, set_mobile_number] = useState(tupad.mobile_number);
    const [beneficiary_type, set_beneficiary_type] = useState(tupad.beneficiary_type);
    const [facebook_account, set_facebook_account] = useState(tupad.facebook_account);
    const [instagram_account, set_instagram_account] = useState(tupad.instagram_account);
    const [email, set_email] = useState(tupad.email);
    const [is_4ps_beneficiary, set_is_4ps_beneficiary] = useState(tupad.is_4ps_beneficiary);
    const [dependent_name, set_dependent_name] = useState(tupad.dependent_name)
    const [dependent_contact_number, set_dependent_contact_number] = useState(tupad.dependent_contact_number)
    const [gsis_number, set_gsis_number] = useState(tupad.gsis_number);
    const [pagibig_number, set_pagibig_number] = useState(tupad.pagibig_number);
    const [philhealth_number, set_philhealth_number] = useState(tupad.philhealth_number);
    const [sss_number, set_sss_number] = useState(tupad.sss_number);
    const [other_id_number, set_other_id_number] = useState(tupad.other_id_number);
    //#endregion

    //#region  USE EFFECT
    useEffect(() => {
        dispatch(actions.onFetchTupad(id.id));
    }, [dispatch]);

    useEffect(() => {
        if (actionErrorMessage && actionErrorMessage.length > 0) {
            setOpenError(true);
        } else {
            setOpenError(false);
        }
    }, [actionErrorMessage])

    useEffect(() => {
        if (actionSuccessMessage) {
            showSuccessMsg(actionSuccessMessage)
        } else {
            setOpenSuccess(false);
        }
    }, [actionSuccessMessage])

    useEffect(() => {
        if (tupad) {
            set_id_number(tupad.id_number)
            set_address(tupad.address)
            set_project_region(tupad.project_region)
            set_project_province(tupad.project_province)
            set_project_city(tupad.project_city)
            set_project_district(tupad.project_district)
            set_project_barangay(tupad.project_barangay)
            set_project_street(tupad.project_street)
            set_project_name(tupad.project_name)
            set_last_name(tupad.last_name)
            set_first_name(tupad.first_name)
            set_middle_name(tupad.middle_name)
            set_civil_status(tupad.civil_status)
            set_disability(tupad.disability)
            set_address(tupad.address)
            set_mobile_number(tupad.mobile_number)
            set_beneficiary_type(tupad.beneficiary_type)
            set_facebook_account(tupad.facebook_account)
            set_instagram_account(tupad.instagram_account)
            set_email(tupad.email)
            set_dependent_name(tupad.dependent_name)
            set_dependent_contact_number(tupad.dependent_contact_number)
            set_is_4ps_beneficiary(tupad.is_4ps_beneficiary)
            set_gsis_number(tupad.gsis_number)
            set_pagibig_number(tupad.pagibig_number)
            set_philhealth_number(tupad.philhealth_number)
            set_sss_number(tupad.sss_number)
            set_other_id_number(tupad.other_id_number)
            set_signed_date(tupad.signed_date)
            set_birthday(tupad.birthday)
            set_email(tupad.email)

            if (tupad.id_photo_path) {
                setImage(tupad.id_photo_path)
            }

            if (tupad.project_type === "GROUP") {
                setProjectGroup(true);
                setProjectIndividual(false);
            }
            if (tupad.project_type === "INDIVIDUAL") {
                setProjectGroup(false);
                setProjectIndividual(true);
            }

            if (tupad.project_component === "FORMATION") {
                setProjectFormation(true);
                setProjectRestoration(false);
                setProjectEnhancement(false);
            }
            if (tupad.project_component === "RESTORATION") {
                setProjectFormation(false);
                setProjectRestoration(true);
                setProjectEnhancement(false);
            }
            if (tupad.project_component === "ENHANCEMENT") {
                setProjectFormation(false);
                setProjectRestoration(false);
                setProjectEnhancement(true);
            }

            if (tupad.implementation_type === "ACP") {
                setImplementationAcp(true);
                setImplementationDirectAdmin(false);
            }
            if (tupad.implementation_type === "DIRECT_ADMIN") {
                setImplementationAcp(false);
                setImplementationDirectAdmin(true);
            }

            if (tupad.gender === "MALE") {
                setMale(true);
                setFemale(false);
            }
            if (tupad.gender === "FEMALE") {
                setMale(false);
                setFemale(true);
            }
            if (tupad.is_4ps_beneficiary === true) {
                setFourpsBeneficiary(true);
                setNotfourpsBeneficiary(false)
            } else {
                setFourpsBeneficiary(false);
                setNotfourpsBeneficiary(true);
            }
        }

    }, [tupad]);
    //#endregion

    // #region HANDLE CLICK
    const handleChangeProjectGroup = (event) => {
        setProjectGroup(true);
        setProjectIndividual(false);
        set_project_type("GROUP")
    };

    const handleChangeProjectIndividual = (event) => {
        setProjectGroup(false);
        setProjectIndividual(true);
        set_project_type("INDIVIDUAL")
    };

    const handleChangeProjecFormation = (event) => {
        setProjectFormation(true);
        setProjectRestoration(false);
        setProjectEnhancement(false);
        set_project_component("FORMATION")
    };

    const handleChangeProjectRestoration = (event) => {
        setProjectFormation(false);
        setProjectRestoration(true);
        setProjectEnhancement(false);
        set_project_component("RESTORATION")
    };

    const handleChangeProjectEnhancement = (event) => {
        setProjectFormation(false);
        setProjectRestoration(false);
        setProjectEnhancement(true);
        set_project_component("ENHANCEMENT")
    }

    const handleChangeImplementationAcp = (event) => {
        setImplementationAcp(true);
        setImplementationDirectAdmin(false);
        set_implementation_type("ACP")
    };

    const handleChangeImplementationDirectAdmin = (event) => {
        setImplementationAcp(false);
        setImplementationDirectAdmin(true);
        set_implementation_type("DIRECT_ADMIN")
    };

    const handleChangeMale = (event) => {
        setMale(true);
        setFemale(false);
        set_gender("MALE")
    };

    const handleChangeFemale = (event) => {
        setMale(false);
        setFemale(true);
        set_gender("FEMALE")
    };

    const handleChangeFourpsBeneficiary = (event) => {
        setFourpsBeneficiary(true);
        setNotfourpsBeneficiary(false);
        set_is_4ps_beneficiary(true)
    };

    const handleChangeNotFourpsBeneficiary = (event) => {
        setFourpsBeneficiary(false);
        setNotfourpsBeneficiary(true);
        set_is_4ps_beneficiary(false)
    };
    //#endregion

    //#region FORMAT FOR BIRTHDATE / SIGNED DATE
    const onFormatDateTimeChanged = (d) => {
        let formatBirthday = moment(d).format('YYYY/MM/DD');
        set_birthday(formatBirthday);
    };

    const onFormatSignedDateChanged = (d) => {
        let formatSignedDate = moment(d).format('YYYY/MM/DD');
        set_signed_date(formatSignedDate);
    };

    //#endregion

    //#region ONSAVE
    const onSave = async () => {
        let id_photo_path = image != null ? image : localStorage.getItem('profileImg64')
        let birthday = moment(birthday_data).format('YYYY/MM/DD');
        let signed_date = moment(signed_date_data).format('YYYY/MM/DD');

        const data = JSON.stringify({
            id_number,
            id_photo_path,
            project_region,
            project_province,
            project_city,
            project_district,
            project_barangay,
            project_street,
            project_type,
            project_component,
            project_name,
            implementation_type,
            last_name,
            first_name,
            middle_name,
            gender,
            birthday,
            civil_status,
            disability,
            address,
            mobile_number,
            beneficiary_type,
            facebook_account,
            instagram_account,
            email,
            is_4ps_beneficiary,
            dependent_name,
            dependent_contact_number,
            gsis_number,
            pagibig_number,
            philhealth_number,
            sss_number,
            other_id_number,
            signed_date
        });

        dispatch(actions.onSaveTupad(id.id, data));
        localStorage.removeItem('profileImg64')
        // console.log('data', data)
    };
    //#endregion
    return (
        <div className="Tupad">
            <PageLoading1 loading={loading} />
            <Grid container>
                <Grid item xs={4}>
                    {images.map((image) => (
                        <ImageRotate
                            key={tupad.form_image_path}
                            src={tupad.form_image_path}
                            style={{ width: "100%" }}
                        />
                    ))}
                </Grid>
                <Grid item xs={8}>
                    <TableContainer>
                        <TableBody>
                            <Table>
                                <TableRow>
                                    <TableCell className="heading-main">IMPORMASYON NG BENEPISYARYO NG KABUHAYAN PROGRAM</TableCell>
                                </TableRow>
                            </Table>
                            <Table>
                                <TableRow>
                                    <TableCell style={{ width: "20%" }} className="info-label">
                                        <h5>
                                            ID NUMBER NG <br />
                                            PROYEKTO:
                                        </h5>
                                    </TableCell>
                                    <TableCell
                                        contentEditable={true}
                                        suppressContentEditableWarning={true}
                                        onInput={(e) => set_id_number(e.target.innerText)}>
                                        {tupad.id_number}
                                    </TableCell>
                                    <TableCell>
                                        {image &&
                                            <Box component="img" style={{ height: "100%", width: "100%" }} sx={{
                                                maxHeight: { xs: 233 },
                                                maxWidth: { xs: 350, md: 250 },
                                            }}
                                                src={image} className="onebyone" onError={() => setImage(null)}
                                            />
                                        }
                                        {image == null && <ImagePreview />}
                                    </TableCell>
                                </TableRow>
                            </Table>

                            <Table className="info-label">
                                <TableRow>
                                    <TableCell className="heading-title">
                                        <h4>LOCASYON NG PROYEKTO</h4>
                                    </TableCell>
                                </TableRow>
                            </Table>

                            <Table>
                                <TableRow>
                                    <TableCell className="info-label">
                                        <h5>Rehiyon:</h5>
                                    </TableCell>
                                    <TableCell
                                        contentEditable={true}
                                        suppressContentEditableWarning={true}
                                        onInput={(e) => set_project_region(e.target.innerText)}>
                                        {tupad.project_region}
                                    </TableCell>

                                    <TableCell className="info-label">
                                        <h5>Probinsya</h5>
                                    </TableCell>
                                    <TableCell
                                        contentEditable={true}
                                        suppressContentEditableWarning={true}
                                        onInput={(e) => set_project_province(e.target.innerText)}>
                                        {tupad.project_province}
                                    </TableCell>

                                    <TableCell className="info-label">
                                        <h5>Lungsod:</h5>
                                    </TableCell>
                                    <TableCell
                                        contentEditable={true}
                                        suppressContentEditableWarning={true}
                                        onInput={(e) => set_project_city(e.target.innerText)}>
                                        {tupad.project_city}
                                    </TableCell>

                                    <TableCell className="info-label">
                                        <h5>Distrito:</h5>
                                    </TableCell>
                                    <TableCell
                                        contentEditable={true}
                                        suppressContentEditableWarning={true}
                                        onInput={(e) => set_project_district(e.target.innerText)}>
                                        {tupad.project_district}
                                    </TableCell>

                                    <TableCell className="info-label">
                                        <h5>Barangay:</h5>
                                    </TableCell>
                                    <TableCell
                                        contentEditable={true}
                                        suppressContentEditableWarning={true}
                                        onInput={(e) => set_project_barangay(e.target.innerText)}>
                                        {tupad.project_barangay}
                                    </TableCell>

                                    <TableCell className="info-label">
                                        <h5>Numero at Pangalan ng Kalye:</h5>
                                    </TableCell>
                                    <TableCell
                                        contentEditable={true}
                                        suppressContentEditableWarning={true}
                                        onInput={(e) => set_project_street(e.target.innerText)}>
                                        {tupad.project_street}
                                    </TableCell>
                                </TableRow>
                            </Table>

                            <Table>
                                <TableRow>
                                    <TableCell className="heading-title">
                                        <h4>DETALYE NG PROYEKTO</h4>
                                    </TableCell>
                                </TableRow>
                            </Table>

                            <Table>
                                <TableRow>
                                    <TableCell className="info-label">
                                        <h5>Klase ng Proyekto:</h5>
                                    </TableCell>
                                    <TableCell>
                                        <FormControlLabel className="checkbox" control={<Checkbox checked={projectGroup} onChange={handleChangeProjectGroup} />} label="Grupo" />
                                        <FormControlLabel className="checkbox" control={<Checkbox checked={projectIndividual} onChange={handleChangeProjectIndividual} />} label="Indibidwal" />
                                    </TableCell>

                                    <TableCell className="info-label">
                                        <h5>Component ng Programa:</h5>
                                    </TableCell>
                                    <TableCell>
                                        <FormControlLabel className="checkbox" control={<Checkbox checked={projectFormation} onChange={handleChangeProjecFormation} />} label="Formation" />
                                        <FormControlLabel className="checkbox" control={<Checkbox checked={projectRestoration} onChange={handleChangeProjectRestoration} />} label="Restoration" />
                                        <FormControlLabel className="checkbox" control={<Checkbox checked={projectEnhancement} onChange={handleChangeProjectEnhancement} />} label="Enhancement" />
                                    </TableCell>

                                    <TableCell className="info-label">
                                        <h5>Pangalan ng Proyekto</h5>
                                    </TableCell>
                                    <TableCell
                                        contentEditable={true}
                                        suppressContentEditableWarning={true}
                                        onInput={(e) => set_project_name(e.target.innerText)}>
                                        {tupad.project_name}
                                    </TableCell>

                                    <TableCell className="info-label">
                                        <h5>Uri ng Implementasyon:</h5>
                                    </TableCell>
                                    <TableCell>
                                        <FormControlLabel className="checkbox" control={<Checkbox checked={implementationAcp} onChange={handleChangeImplementationAcp} />} label="ACP" />
                                        <FormControlLabel className="checkbox" control={<Checkbox checked={implementationDirectAdmin} onChange={handleChangeImplementationDirectAdmin} />} label="Direct Admin" />
                                    </TableCell>
                                </TableRow>
                            </Table>

                            <Table>
                                <TableRow>
                                    <TableCell className="heading-title">
                                        <h4>PERSONAL NA IMPORMASYON</h4>
                                    </TableCell>
                                </TableRow>
                            </Table>

                            <Table>
                                <TableRow>
                                    <TableCell className="info-label" style={{ width: '8%' }}>
                                        <h5>Pangalan</h5>
                                    </TableCell>
                                    <TableCell
                                        className="lastname"
                                        contentEditable={true}
                                        suppressContentEditableWarning={true}
                                        onInput={(e) => set_last_name(e.target.innerText)}>
                                        {tupad.last_name}
                                    </TableCell>
                                    <TableCell
                                        className="firstname"
                                        contentEditable={true}
                                        suppressContentEditableWarning={true}
                                        onInput={(e) => set_first_name(e.target.innerText)}>
                                        {tupad.first_name}
                                    </TableCell>
                                    <TableCell
                                        className="middlename"
                                        contentEditable={true}
                                        suppressContentEditableWarning={true}
                                        onInput={(e) => set_middle_name(e.target.innerText)}>
                                        {tupad.middle_name}
                                    </TableCell>

                                    <TableCell className="info-label" style={{ width: '20px' }}>
                                        <h5>Kasarian</h5>
                                    </TableCell>
                                    <TableCell style={{ width: '20px' }}>
                                        <FormControlLabel className="checkbox" control={<Checkbox checked={male} onChange={handleChangeMale} />} label="Lalaki" />
                                        <FormControlLabel className="checkbox" control={<Checkbox checked={female} onChange={handleChangeFemale} />} label="Babae" />
                                    </TableCell>

                                    <TableCell className="info-label">
                                        <h5>Kapanganakan</h5>
                                    </TableCell>
                                    <TableCell>
                                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                            <DatePicker
                                                id="birthday"
                                                value={birthday_data}
                                                onChange={(d) => onFormatDateTimeChanged(d)}
                                                format="MM-dd-yyyy"
                                                inputProps={{style: { textAlign: 'center'} }}
                                            />
                                        </MuiPickersUtilsProvider>
                                    </TableCell>

                                    <TableCell className="info-label">
                                        <h5>Katayuang Sibil</h5>
                                    </TableCell>
                                    <TableCell
                                        contentEditable={true}
                                        suppressContentEditableWarning={true}
                                        onInput={(e) => set_civil_status(e.target.innerText)}>
                                        {tupad.civil_status}
                                    </TableCell>

                                    <TableCell className="info-label">
                                        <h5>May Kapansanan?</h5>
                                    </TableCell>
                                    <TableCell
                                        contentEditable={true}
                                        suppressContentEditableWarning={true}
                                        onInput={(e) => set_disability(e.target.innerText)}>
                                        {tupad.disability}
                                    </TableCell>
                                </TableRow>
                            </Table>

                            <Table>
                                <TableRow>
                                    <TableCell className="info-label" style={{ width: '8%' }}>
                                        <h5>Tirahan</h5>
                                    </TableCell>
                                    <TableCell
                                        className="address"
                                        colSpan={1}
                                        contentEditable={true}
                                        suppressContentEditableWarning={true}
                                        onInput={(e) => set_address(e.target.innerText)}>
                                        {tupad.address}
                                    </TableCell>

                                    <TableCell className="info-label">
                                        <h5>Numero ng telepono:</h5>
                                    </TableCell>
                                    <TableCell
                                        colSpan={10}
                                        contentEditable={true}
                                        suppressContentEditableWarning={true}
                                        onInput={(e) => set_mobile_number(e.target.innerText)}>
                                        {tupad.mobile_number}
                                    </TableCell>

                                    <TableCell className="info-label">
                                        <h5>Klase ng Benepisaryo</h5>
                                    </TableCell>
                                    <TableCell
                                        colSpan={1}
                                        contentEditable={true}
                                        suppressContentEditableWarning={true}
                                        onInput={(e) => set_beneficiary_type(e.target.innerText)}>
                                        {tupad.beneficiary_type}
                                    </TableCell>
                                </TableRow>
                            </Table>

                            <Table>
                                <TableRow>
                                    <TableCell className="info-label" style={{ width: '22%' }}>
                                        <h5>
                                            Social Media Account ng Benisyaryo:
                                        </h5>
                                    </TableCell>

                                    <TableCell style={{ width: '8%' }}>
                                        <h5>Facebook</h5>
                                    </TableCell>
                                    <TableCell
                                        contentEditable={true}
                                        suppressContentEditableWarning={true}
                                        onInput={(e) => set_facebook_account(e.target.innerText)}>
                                        {tupad.facebook_account}
                                    </TableCell>

                                    <TableCell style={{ width: '17%' }}>
                                        <h5>Instagram: (@username)</h5>
                                    </TableCell>
                                    <TableCell
                                        contentEditable={true}
                                        suppressContentEditableWarning={true}
                                        onInput={(e) => set_instagram_account(e.target.innerText)}>
                                        {tupad.instagram_account}
                                    </TableCell>

                                    <TableCell style={{ width: '12%' }}>
                                        <h5>Email Address:</h5>
                                    </TableCell>
                                    <TableCell
                                        contentEditable={true}
                                        suppressContentEditableWarning={true}
                                        onInput={(e) => set_email(e.target.innerText)}>
                                        {tupad.email}
                                    </TableCell>
                                </TableRow>
                            </Table>

                            <Table>
                                <TableRow>
                                    <TableCell className="info-label" style={{ width: "40%" }}>
                                        <h5>
                                            Ikaw ba ay Benepisyaryo ng Pantawid Pamilyang Pilipino Program (4Ps)?
                                        </h5>
                                    </TableCell>
                                    <TableCell>
                                        <FormControlLabel className="checkbox" control={<Checkbox checked={fourpsBeneficiary} onChange={handleChangeFourpsBeneficiary} />} label="Oo" />
                                        <FormControlLabel className="checkbox" control={<Checkbox checked={notfourpsBeneficiary} onChange={handleChangeNotFourpsBeneficiary} />} label="Hindi" />
                                    </TableCell>
                                </TableRow>
                            </Table>

                            <Table>
                                <TableRow>
                                    <TableCell className="info-label" style={{ width: '40%' }}>
                                        <h5>
                                            Pangalan ng Dependent(Apelyido, Una at Gitnang Pangalan)
                                        </h5>
                                    </TableCell>
                                    <TableCell
                                        colSpan={5}
                                        contentEditable={true}
                                        suppressContentEditableWarning={true}
                                        onInput={(e) => set_dependent_name(e.target.innerText)}>
                                        {tupad.dependent_name}
                                    </TableCell>

                                    <TableCell className="info-label" style={{ width: '22%' }}>
                                        <h5>Numero at Telepono ng Dependent:</h5>
                                    </TableCell>
                                    <TableCell
                                        rowSpan={2}
                                        contentEditable={true}
                                        suppressContentEditableWarning={true}
                                        onInput={(e) => set_dependent_contact_number(e.target.innerText)}>
                                        {tupad.dependent_contact_number}
                                    </TableCell>
                                </TableRow>
                            </Table>

                            <Table>
                                <TableRow>
                                    <TableCell className="heading-title"></TableCell>
                                </TableRow>
                            </Table>

                            <Table>
                                <TableRow>
                                    <TableCell className="info-label">
                                        <h5>GSIS NO.</h5>
                                    </TableCell>
                                    <TableCell
                                        rowSpan={2}
                                        contentEditable={true}
                                        suppressContentEditableWarning={true}
                                        onInput={(e) => set_gsis_number(e.target.innerText)}>
                                        {tupad.gsis_number}
                                    </TableCell>

                                    <TableCell className="info-label">
                                        <h5>Pag-IBIG NO.</h5>
                                    </TableCell>
                                    <TableCell
                                        rowSpan={2}
                                        contentEditable={true}
                                        suppressContentEditableWarning={true}
                                        onInput={(e) => set_pagibig_number(e.target.innerText)}>
                                        {tupad.pagibig_number}
                                    </TableCell>

                                    <TableCell className="info-label">
                                        <h5>PhilHealth No.:</h5>
                                    </TableCell>
                                    <TableCell
                                        rowSpan={2}
                                        contentEditable={true}
                                        suppressContentEditableWarning={true}
                                        onInput={(e) => set_philhealth_number(e.target.innerText)}>
                                        {tupad.philhealth_number}
                                    </TableCell>

                                    <TableCell className="info-label">
                                        <h5>SSS No.:</h5>
                                    </TableCell>
                                    <TableCell
                                        rowSpan={2}
                                        contentEditable={true}
                                        suppressContentEditableWarning={true}
                                        onInput={(e) => set_sss_number(e.target.innerText)}>
                                        {tupad.sss_number}
                                    </TableCell>

                                    <TableCell className="info-label">
                                        <h5>Iba pa:</h5>
                                    </TableCell>
                                    <TableCell
                                        rowSpan={2}
                                        contentEditable={true}
                                        suppressContentEditableWarning={true}
                                        onInput={(e) => set_other_id_number(e.target.innerText)}>
                                        {tupad.other_id_number}
                                    </TableCell>
                                </TableRow>
                            </Table>

                            <Table>
                                <TableRow>
                                    <TableCell className="info-label" style={{ width: "14%" }}>
                                        <h5>Petsa ng Pagpirma</h5>
                                    </TableCell>
                                    <TableCell>
                                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                            <DatePicker
                                                id="signed_date_data"
                                                value={signed_date_data}
                                                minDate={new Date("01-01-2010")}
                                                onChange={(d) => onFormatSignedDateChanged(d)}
                                                format="MM-dd-yyyy"
                                                inputProps={{ style: { width: '78px' } }}
                                            />
                                        </MuiPickersUtilsProvider>
                                    </TableCell>


                                </TableRow>
                            </Table>
                        </TableBody>
                    </TableContainer>
                </Grid>
            </Grid>
            <Button class="saveBtn" color="steelBlue" variant="contained" onClick={() => { onSave() }}>SAVE CHANGES</Button>

            <Snackbar open={openError} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error">
                    {actionErrorMessage}
                </Alert>
            </Snackbar>

            <Snackbar open={openSuccess} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success">
                    {actionSuccessMessage}
                </Alert>
            </Snackbar>
        </div>
    );
};

export default Tupad;
