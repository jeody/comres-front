import React from 'react';
import {
  Document,
  Image,
  Page,
  StyleSheet,
  Text,
  View
} from '@react-pdf/renderer';
import afp from '../../photos/afp_logo.png';
import afprescom from '../../photos/afprescom.png';
import JsBarcode from 'jsbarcode';
import dateFormat from 'dateformat';
import validator from 'validator';

const CreateRsoiPdf = ({ reservist }) => {
  const generateBarcodeDataURL = (value) => {
    const canvas = document.createElement('canvas');
    JsBarcode(canvas, value, { format: 'CODE128' }); // Or other format
    return canvas.toDataURL('image/png');
  };

  const currentDateTime = new Date();

  const style = StyleSheet.create({
    page: {
      position: 'relative',
      paddingTop: 40,
      paddingHorizontal: 40,
      paddingBottom: 40,
    },
    header: {
      marginTop: '5px',
      flexDirection: 'row',
      marginBottom: '0px',
      gap: 5,
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    logoAfrescom: {
      marginLeft: '20px',
      marginRight: '20px',
      width: 62,
      height: 'auto'
    },
    logoafp: {
      marginLeft: '20px',
      marginRight: '20px',
      width: 50,
      height: 'auto'
    },
    profileImg: {
      width: 80,
      height: 'auto',
      borderTop: '0.5pt solid #000000',
      borderLeft: '0.5pt solid #000000',
      borderBottom: '0.5pt solid #000000',
      borderRight: '0.5pt solid #000000'
    },
    textContainer: {
      alignItems: 'center',
      marginLeft: '20px',
      marginRight: '20px'
    },
    textOne: {
      fontSize: '8px',
      textAlign: 'center',
      letterSpacing: '1px'
    },
    textTwo: {
      fontSize: '10px',
      textAlign: 'center',
      letterSpacing: '1px',
      marginBottom: '3px'
    },
    textThree: {
      fontSize: '11px',
      textAlign: 'center',
      fontWeight: 'bold',
      letterSpacing: '1px',
      marginBottom: '2px'
    },
    textFour: {
      fontSize: '10px',
      textAlign: 'center',
      fontWeight: 'bold',
      marginBottom: '3px'
    },
    textFive: {
      fontSize: '10px',
      textAlign: 'center',
      fontWeight: 'bold',
      marginBottom: '1px'
    },
    textSix: {
      width: '40%',
      fontSize: '8px',
      textAlign: 'center',
      fontStyle: 'italic',
      marginTop: '0px',
      paddingTop: '2px',
      border: '0px',
      borderTop: '0.5pt solid #000000'
    },
    textSeventy: {
      width: '40%',
      fontSize: '10px',
      textAlign: 'left',
      fontWeight: 'bold',
      marginTop: '20px',
      paddingTop: '10px',
      border: '0px',
    },
    textEighty: {
      width: '40%',
      fontSize: '10px',
      textAlign: 'left',
      marginTop: '0px',
      paddingTop: '2px',
      border: '0px',
    },
    textNinety: {
      width: '40%',
      fontSize: '10px',
      textAlign: 'left',
      marginTop: '0px',
      paddingTop: '2px',
      border: '0px',
    },
    tableHeader: {
      flexDirection: 'row',
      borderTop: 1,
      borderLeft: 1,
      borderRight: 1,
      borderColor: '#0e0101'
    },
    tableColumn1: {
      width: '10%',
      textAlign: 'left',
      fontSize: '12px',
      fontWeight: 'bold',
      marginLeft: '0px',
      marginRight: '0px',
      paddingTop: '12px',
      paddingBottom: '1px'
    },
    tableColumn2: {
      width: '25%',
      textAlign: 'center',
      fontSize: '12px',
      fontWeight: 'bold',
      border: '0px',
      borderBottom: '0.5pt solid #000000',
      paddingTop: '12px',
      paddingLeft: '10px',
      paddingBottom: '1px',
      paddingRight: '10px'
    },
    tableColumn3: {
      width: '25%',
      textAlign: 'center',
      fontSize: '12px',
      fontWeight: 'bold',
      border: '0px',
      borderBottom: '0.5pt solid #000000',
      paddingTop: '12px',
      paddingLeft: '10px',
      paddingBottom: '1px',
      paddingRight: '10px'
    },
    tableColumn4: {
      width: '25%',
      textAlign: 'center',
      fontSize: '12px',
      fontWeight: 'bold',
      border: '0px',
      borderBottom: '0.5pt solid #000000',
      paddingTop: '12px',
      paddingLeft: '10px',
      paddingBottom: '1px',
      paddingRight: '10px'
    },
      tableColumn5: {
      width: '5%',
      textAlign: 'left',
      fontSize: '8px',
      marginLeft: '0px',
      marginRight: '0px',
      paddingTop: '12px',
      paddingBottom: '1px'
    },
    barcode: {
      width: 150,
      height: 50,
      paddingBottom: '15px'
    },
    tableRow9j: {
      flexDirection: 'row'
    },
    textBarcode: {
      width: '35%',
      fontSize: '9px'
    },
    textBlank: {
      width: '45%',
      fontSize: '9px'
    },
    textPrinted: {
      width: '20%',
      fontSize: '9px',
      paddingTop: '15px'
    },
    horizontalLine: {
        borderBottomWidth: 0.5,
        borderBottomColor: '#000000',
        marginVertical: 5,
        width: '100%',
    },
    textSeven: {
      fontSize: '9px',
      textAlign: 'center',
      marginBottom: '0px'
    },
    textEight: {
      fontSize: '9px',
      textAlign: 'center',
      fontWeight: 'bold',
      marginBottom: '0px'
    },
    tableHeader2: {
      flexDirection: 'row',
      borderTop: 1,
      borderLeft: 1,
      borderRight: 1,
      borderColor: '#0a0808'
    },
    tableColumn1a: {
      width: '10%',
      textAlign: 'left',
      fontSize: '8px',
      fontWeight: 'bold',
      marginLeft: '0px',
      marginRight: '0px',
      paddingTop: '1px',
      paddingBottom: '1px'
    },
    tableColumn2a: {
      width: '25%',
      textAlign: 'center',
      fontSize: '8px',
      border: '0px',
      paddingTop: '1px',
      paddingLeft: '10px',
      paddingBottom: '1px',
      paddingRight: '10px'
    },
      tableColumn3a: {
      width: '5%',
      textAlign: 'left',
      fontSize: '8px',
      marginLeft: '0px',
      marginRight: '0px',
      paddingTop: '1px',
      paddingBottom: '1px'
    },
    tableRow: {
      flexDirection: 'row',
      borderBottom: 1,
      borderLeft: 1,
      borderRight: 1,
      borderColor: '#E4E4E4'
    },
    dataColumn1: {
      width: '3%',
      textAlign: 'left',
      fontSize: '8px',
      fontWeight: 'bold',
      paddingTop: '12px',
      marginTop: '13px',
      marginLeft: '0px',
      marginRight: '0px',
      paddingBottom: '1px'
    },
    dataColumn2: {
      width: '15%',
      textAlign: 'left',
      fontSize: '8px',
      fontWeight: 'bold',
      paddingTop: '12px',
      marginTop: '13px',
      marginLeft: '0px',
      marginRight: '0px',
      paddingBottom: '1px'
    },
    dataColumn3: {
      width: '82%',
      textAlign: 'center',
      fontSize: '9px',
      border: '0px',
      borderBottom: '0.5pt solid #000000',
      marginTop: '13px',
      paddingTop: '12px',
      paddingLeft: '10px',
      paddingBottom: '1px',
      paddingRight: '10px'
    },
    tableRow1: {
      flexDirection: 'row',
      borderBottom: 1,
      borderLeft: 1,
      borderRight: 1,
      borderColor: '#E4E4E4'
    },
    dataColumn1b: {
      width: '3%',
      textAlign: 'left',
      fontSize: '8px',
      fontWeight: 'bold',
      marginTop: '5px',
      paddingTop: '5px',
      marginLeft: '0px',
      marginRight: '0px',
      paddingBottom: '1px'
    },
    dataColumn2b: {
      width: '16%',
      textAlign: 'left',
      fontSize: '8px',
      fontWeight: 'bold',
      marginTop: '5px',
      paddingTop: '5px',
      marginLeft: '0px',
      marginRight: '0px',
      paddingBottom: '1px'
    },
    dataColumn3b: {
      width: '33%',
      textAlign: 'center',
      fontSize: '9px',
      border: '0px',
      borderBottom: '0.5pt solid #000000',
      marginTop: '5px',
      paddingTop: '5px',
      paddingLeft: '10px',
      paddingBottom: '1px',
      paddingRight: '10px'
    },
    dataColumn4b: {
      width: '14%',
      textAlign: 'left',
      fontSize: '8px',
      fontWeight: 'bold',
      marginTop: '5px',
      paddingTop: '5px',
      marginLeft: '0px',
      marginRight: '0px',
      paddingBottom: '1px'
    },
      dataColumn5b: {
      width: '34%',
      textAlign: 'center',
      fontSize: '9px',
      border: '0px',
      borderBottom: '0.5pt solid #000000',
      marginTop: '5px',
      paddingTop: '5px',
      paddingLeft: '10px',
      paddingBottom: '1px',
      paddingRight: '10px'
    },
    tableRow2: {
      flexDirection: 'row',
      borderBottom: 1,
      borderLeft: 1,
      borderRight: 1,
      borderColor: '#E4E4E4'
    },
    dataColumn1a: {    
      width: '10%',
      textAlign: 'left',
      fontSize: '9px',
      fontWeight: 'bold',
      marginLeft: '0px',
      marginRight: '0px',
      paddingTop: '12px',
      paddingBottom: '1px'
    },
    dataColumn2a: {
      width: '7%',
      textAlign: 'left',
      fontSize: '9px',
      fontWeight: 'bold',
      marginLeft: '0px',
      marginRight: '0px',
      paddingTop: '12px',
      paddingBottom: '1px'
    },
    dataColumn3a: {
      width: '7%',
      textAlign: 'center',
      fontSize: '9px',
      border: '0px',
      borderBottom: '0.5pt solid #000000',
      paddingTop: '12px',
      paddingLeft: '10px',
      paddingBottom: '1px',
      paddingRight: '10px'
    },
    dataColumn4a: {
      width: '18%',
      textAlign: 'left',
      fontSize: '9px',
      fontWeight: 'bold',
      marginLeft: '0px',
      marginRight: '0px',
      paddingTop: '12px',
      paddingBottom: '1px'
    },
    dataColumn5a: {
      width: '12%',
      textAlign: 'center',
      fontSize: '9px',
      border: '0px',
      borderBottom: '0.5pt solid #000000',
      paddingTop: '12px',
      paddingLeft: '10px',
      paddingBottom: '1px',
      paddingRight: '10px'
    },
      dataColumn6a: {    
      width: '8%',
      textAlign: 'left',
      fontSize: '9px',
      fontWeight: 'bold',
      marginLeft: '0px',
      marginRight: '0px',
      paddingTop: '12px',
      paddingBottom: '1px'
    },
    tableRow3: {
      flexDirection: 'row',
      borderBottom: 1,
      borderLeft: 1,
      borderRight: 1,
      borderColor: '#E4E4E4'
    },
    dataColumn1c: {
      width: '3%',
      textAlign: 'left',
      fontSize: '8px',
      fontWeight: 'bold',
      paddingTop: '5px',
      marginTop: '5px',
      marginLeft: '0px',
      marginRight: '0px',
      paddingBottom: '1px'
    },
    dataColumn2c: {
      width: '13%',
      textAlign: 'left',
      fontSize: '8px',
      fontWeight: 'bold',
      paddingTop: '5px',
      marginTop: '5px',
      marginLeft: '0px',
      marginRight: '0px',
      paddingBottom: '1px'
    },
    dataColumn3c: {
      width: '18%',
      textAlign: 'center',
      fontSize: '9px',
      border: '0px',
      borderBottom: '0.5pt solid #000000',
      paddingTop: '5px',
      marginTop: '5px',
      paddingLeft: '10px',
      paddingBottom: '1px',
      paddingRight: '10px'
    },
    dataColumn4c: {
      width: '14%',
      textAlign: 'left',
      fontSize: '8px',
      fontWeight: 'bold',
      paddingTop: '5px',
      marginTop: '5px',
      marginLeft: '0px',
      marginRight: '0px',
      paddingBottom: '1px'
    },
      dataColumn5c: {
      width: '40%',
      textAlign: 'center',
      fontSize: '9px',
      border: '0px',
      borderBottom: '0.5pt solid #000000',
      paddingTop: '5px',
      marginTop: '5px',
      paddingLeft: '10px',
      paddingBottom: '1px',
      paddingRight: '10px'
    },
      dataColumn6c: {
      width: '4%',
      textAlign: 'left',
      fontSize: '8px',
      fontWeight: 'bold',
      paddingTop: '5px',
      marginTop: '5px',
      marginLeft: '0px',
      marginRight: '0px',
      paddingBottom: '1px'
    },
      dataColumn7c: {
      width: '8%',
      textAlign: 'center',
      fontSize: '9px',
      border: '0px',
      borderBottom: '0.5pt solid #000000',
      paddingTop: '5px',
      marginTop: '5px',
      paddingLeft: '10px',
      paddingBottom: '1px',
      paddingRight: '10px'
    },
    tableRow4: {
      flexDirection: 'row',
      borderBottom: 1,
      borderLeft: 1,
      borderRight: 1,
      borderColor: '#E4E4E4'
    },
    dataColumn1d: {
      width: '3%',
      textAlign: 'left',
      fontSize: '8px',
      fontWeight: 'bold',
      paddingTop: '5px',
      marginTop: '5px',
      marginLeft: '0px',
      marginRight: '0px',
      paddingBottom: '1px'
    },
    dataColumn2d: {
      width: '12%',
      textAlign: 'left',
      fontSize: '8px',
      fontWeight: 'bold',
      paddingTop: '5px',
      marginTop: '5px',
      marginLeft: '0px',
      marginRight: '0px',
      paddingBottom: '1px'
    },
    dataColumn3d: {
      width: '25%',
      textAlign: 'center',
      fontSize: '9px',
      border: '0px',
      borderBottom: '0.5pt solid #000000',
      paddingTop: '5px',
      marginTop: '5px',
      paddingLeft: '10px',
      paddingBottom: '1px',
      paddingRight: '10px'
    },
    dataColumn4d: {
      width: '10%',
      textAlign: 'left',
      fontSize: '8px',
      fontWeight: 'bold',
      paddingTop: '5px',
      marginTop: '5px',
      marginLeft: '0px',
      marginRight: '0px',
      paddingBottom: '1px'
    },
      dataColumn5d: {
      width: '50%',
      textAlign: 'center',
      fontSize: '9px',
      border: '0px',
      borderBottom: '0.5pt solid #000000',
      paddingTop: '5px',
      marginTop: '5px',
      paddingLeft: '10px',
      paddingBottom: '1px',
      paddingRight: '10px'
    },
      tableRow5: {
      flexDirection: 'row',
      borderBottom: 1,
      borderLeft: 1,
      borderRight: 1,
      borderColor: '#E4E4E4'
    },
    dataColumn1e: {
      width: '3%',
      textAlign: 'left',
      fontSize: '8px',
      fontWeight: 'bold',
      paddingTop: '5px',
      marginTop: '5px',
      marginLeft: '0px',
      marginRight: '0px',
      paddingBottom: '1px'
    },
    dataColumn2e: {
      width: '14%',
      textAlign: 'left',
      fontSize: '8px',
      fontWeight: 'bold',
      paddingTop: '5px',
      marginTop: '5px',
      marginLeft: '0px',
      marginRight: '0px',
      paddingBottom: '1px'
    },
    dataColumn3e: {
      width: '10%',
      textAlign: 'center',
      fontSize: '9px',
      border: '0px',
      borderBottom: '0.5pt solid #000000',
      paddingTop: '5px',
      marginTop: '5px',
      paddingLeft: '10px',
      paddingBottom: '1px',
      paddingRight: '10px'
    },
    dataColumn4e: {
      width: '10%',
      textAlign: 'left',
      fontSize: '8px',
      fontWeight: 'bold',
      paddingTop: '5px',
      marginTop: '5px',
      marginLeft: '0px',
      marginRight: '0px',
      paddingBottom: '1px'
    },
      dataColumn5e: {
      width: '15%',
      textAlign: 'center',
      fontSize: '9px',
      border: '0px',
      borderBottom: '0.5pt solid #000000',
      paddingTop: '5px',
      marginTop: '5px',
      paddingLeft: '10px',
      paddingBottom: '1px',
      paddingRight: '10px'
    },
      dataColumn6e: {
      width: '10%',
      textAlign: 'left',
      fontSize: '8px',
      fontWeight: 'bold',
      paddingTop: '5px',
      marginTop: '5px',
      marginLeft: '0px',
      marginRight: '0px',
      paddingBottom: '1px'
    },
      dataColumn7e: {
      width: '38%',
      textAlign: 'center',
      fontSize: '9px',
      border: '0px',
      borderBottom: '0.5pt solid #000000',
      paddingTop: '5px',
      marginTop: '5px',
      paddingLeft: '10px',
      paddingBottom: '1px',
      paddingRight: '10px'
    },
    tableRow6: {
      flexDirection: 'row',
      borderBottom: 1,
      borderLeft: 1,
      borderRight: 1,
      borderColor: '#E4E4E4'
    },
    dataColumn1f: {
      width: '3%',
      textAlign: 'left',
      fontSize: '8px',
      fontWeight: 'bold',
      marginTop: '5px',
      paddingTop: '5px',
      marginLeft: '0px',
      marginRight: '0px',
      paddingBottom: '1px'
    },
    dataColumn2f: {
      width: '33%',
      textAlign: 'left',
      fontSize: '8px',
      fontWeight: 'bold',
      marginTop: '5px',
      paddingTop: '5px',
      marginLeft: '0px',
      marginRight: '0px',
      paddingBottom: '1px'
    },
    dataColumn3f: {
      width: '25%',
      textAlign: 'center',
      fontSize: '9px',
      border: '0px',
      borderBottom: '0.5pt solid #000000',
      marginTop: '5px',
      paddingTop: '5px',
      paddingLeft: '10px',
      paddingBottom: '1px',
      paddingRight: '10px'
    },
    dataColumn4f: {
      width: '14%',
      textAlign: 'left',
      fontSize: '8px',
      fontWeight: 'bold',
      marginTop: '5px',
      paddingTop: '5px',
      marginLeft: '0px',
      marginRight: '0px',
      paddingBottom: '1px'
    },
      dataColumn5f: {
      width: '25%',
      textAlign: 'center',
      fontSize: '9px',
      border: '0px',
      borderBottom: '0.5pt solid #000000',
      marginTop: '5px',
      paddingTop: '5px',
      paddingLeft: '10px',
      paddingBottom: '1px',
      paddingRight: '10px'
    },
    tableRow7: {
      flexDirection: 'row',
      borderBottom: 1,
      borderLeft: 1,
      borderRight: 1,
      borderColor: '#E4E4E4'
    },
    dataColumn1g: {
      width: '3%',
      textAlign: 'left',
      fontSize: '8px',
      fontWeight: 'bold',
      marginTop: '5px',
      paddingTop: '5px',
      marginLeft: '0px',
      marginRight: '0px',
      paddingBottom: '1px'
    },
    dataColumn2g: {
      width: '10%',
      textAlign: 'left',
      fontSize: '8px',
      fontWeight: 'bold',
      marginTop: '5px',
      paddingTop: '5px',
      marginLeft: '0px',
      marginRight: '0px',
      paddingBottom: '1px'
    },
    dataColumn3g: {
      width: '87%',
      textAlign: 'center',
      fontSize: '9px',
      border: '0px',
      borderBottom: '0.5pt solid #000000',
      marginTop: '5px',
      paddingTop: '5px',
      paddingLeft: '10px',
      paddingBottom: '1px',
      paddingRight: '10px'
    },
    tableRow8: {
      flexDirection: 'row',
      borderBottom: 1,
      borderLeft: 1,
      borderRight: 1,
      borderColor: '#E4E4E4'
    },
    dataColumn1h: {
      width: '3%',
      textAlign: 'left',
      fontSize: '8px',
      fontWeight: 'bold',
      marginTop: '5px',
      paddingTop: '5px',
      marginLeft: '0px',
      marginRight: '0px',
      paddingBottom: '1px'
    },
    dataColumn2h: {
      width: '15%',
      textAlign: 'left',
      fontSize: '8px',
      fontWeight: 'bold',
      marginTop: '5px',
      paddingTop: '5px',
      marginLeft: '0px',
      marginRight: '0px',
      paddingBottom: '1px'
    },
    dataColumn3h: {
      width: '43%',
      textAlign: 'center',
      fontSize: '9px',
      border: '0px',
      borderBottom: '0.5pt solid #000000',
      marginTop: '5px',
      paddingTop: '5px',
      paddingLeft: '10px',
      paddingBottom: '1px',
      paddingRight: '10px'
    },
    dataColumn4h: {
      width: '14%',
      textAlign: 'left',
      fontSize: '8px',
      fontWeight: 'bold',
      marginTop: '5px',
      paddingTop: '5px',
      marginLeft: '0px',
      marginRight: '0px',
      paddingBottom: '1px'
    },
      dataColumn5h: {
      width: '25%',
      textAlign: 'center',
      fontSize: '9px',
      border: '0px',
      borderBottom: '0.5pt solid #000000',
      marginTop: '5px',
      paddingTop: '5px',
      paddingLeft: '10px',
      paddingBottom: '1px',
      paddingRight: '10px'
    },
    tableRow9: {
      flexDirection: 'row',
      borderBottom: 1,
      borderLeft: 1,
      borderRight: 1,
      borderColor: '#E4E4E4'
    },
    dataColumn1i: {
      width: '3%',
      textAlign: 'left',
      fontSize: '8px',
      fontWeight: 'bold',
      marginTop: '5px',
      paddingTop: '5px',
      marginLeft: '0px',
      marginRight: '0px',
      paddingBottom: '1px'
    },
    dataColumn2i: {
      width: '16%',
      textAlign: 'left',
      fontSize: '8px',
      fontWeight: 'bold',
      marginTop: '5px',
      paddingTop: '5px',
      marginLeft: '0px',
      marginRight: '0px',
      paddingBottom: '1px'
    },
    dataColumn3i: {
      width: '42%',
      textAlign: 'center',
      fontSize: '9px',
      border: '0px',
      borderBottom: '0.5pt solid #000000',
      marginTop: '5px',
      paddingTop: '5px',
      paddingLeft: '10px',
      paddingBottom: '1px',
      paddingRight: '10px'
    },
    dataColumn4i: {
      width: '14%',
      textAlign: 'left',
      fontSize: '8px',
      fontWeight: 'bold',
      marginTop: '5px',
      paddingTop: '5px',
      marginLeft: '0px',
      marginRight: '0px',
      paddingBottom: '1px'
    },
      dataColumn5i: {
      width: '25%',
      textAlign: 'center',
      fontSize: '9px',
      border: '0px',
      borderBottom: '0.5pt solid #000000',
      marginTop: '5px',
      paddingTop: '5px',
      paddingLeft: '10px',
      paddingBottom: '1px',
      paddingRight: '10px'
    },
    tableRow1a: {
      flexDirection: 'row',
      borderBottom: 1,
      borderLeft: 1,
      borderRight: 1,
      borderColor: '#E4E4E4'
    },
    dataColumn1aa: {
      width: '3%',
      textAlign: 'left',
      fontSize: '8px',
      fontWeight: 'bold',
      marginTop: '5px',
      paddingTop: '5px',
      marginLeft: '0px',
      marginRight: '0px',
      paddingBottom: '1px'
    },
    dataColumn2aa: {
      width: '16%',
      textAlign: 'left',
      fontSize: '8px',
      fontWeight: 'bold',
      marginTop: '5px',
      paddingTop: '5px',
      marginLeft: '0px',
      marginRight: '0px',
      paddingBottom: '1px'
    },
    dataColumn3aa: {
      width: '30%',
      textAlign: 'center',
      fontSize: '9px',
      border: '0px',
      borderBottom: '0.5pt solid #000000',
      marginTop: '5px',
      paddingTop: '5px',
      paddingLeft: '10px',
      paddingBottom: '1px',
      paddingRight: '10px'
    },
    dataColumn4aa: {
      width: '17%',
      textAlign: 'left',
      fontSize: '8px',
      fontWeight: 'bold',
      marginTop: '5px',
      paddingTop: '5px',
      marginLeft: '0px',
      marginRight: '0px',
      paddingBottom: '1px'
    },
      dataColumn5aa: {
      width: '34%',
      textAlign: 'center',
      fontSize: '9px',
      border: '0px',
      borderBottom: '0.5pt solid #000000',
      marginTop: '5px',
      paddingTop: '5px',
      paddingLeft: '10px',
      paddingBottom: '1px',
      paddingRight: '10px'
    },
    tableRow2a: {
      flexDirection: 'row',
      borderBottom: 1,
      borderLeft: 1,
      borderRight: 1,
      borderColor: '#E4E4E4'
    },
    dataColumn1ab: {
      width: '3%',
      textAlign: 'left',
      fontSize: '8px',
      fontWeight: 'bold',
      marginTop: '5px',
      paddingTop: '5px',
      marginLeft: '0px',
      marginRight: '0px',
      paddingBottom: '1px'
    },
    dataColumn2ab: {
      width: '97%',
      textAlign: 'left',
      fontSize: '8px',
      fontWeight: 'bold',
      marginTop: '5px',
      paddingTop: '5px',
      marginLeft: '0px',
      marginRight: '0px',
      paddingBottom: '1px'
    },
    tableRow3a: {
      flexDirection: 'row',
      borderBottom: 1,
      borderLeft: 1,
      borderRight: 1,
      borderColor: '#E4E4E4'
    },
    dataColumn1ac: {
      width: '3%',
      textAlign: 'left',
      fontSize: '9px',
      fontWeight: 'bold',
      marginTop: '5px',
      paddingTop: '5px',
      marginLeft: '0px',
      marginRight: '0px',
      paddingBottom: '2px'
    },
    dataColumn2ac: {
      width: '35%',
      textAlign: 'left',
      fontSize: '9px',
      borderTop: '0.5pt solid #000000',
      borderLeft: '0.5pt solid #000000',
      borderBottom: '0.5pt solid #000000',
      marginTop: '5px',
      paddingTop: '5px',
      paddingLeft: '5px',
      paddingBottom: '2px',
      paddingRight: '5px'
    },
    dataColumn3ac: {
      width: '43%',
      textAlign: 'left',
      fontSize: '9px',
      borderTop: '0.5pt solid #000000',
      borderLeft: '0.5pt solid #000000',
      borderBottom: '0.5pt solid #000000',
      marginTop: '5px',
      paddingTop: '5px',
      paddingLeft: '5px',
      paddingBottom: '2px',
      paddingRight: '5px'
    }, 
    dataColumn4ac: {
      width: '19%',
      textAlign: 'left',
      fontSize: '9px',
      borderTop: '0.5pt solid #000000',
      borderLeft: '0.5pt solid #000000',
      borderBottom: '0.5pt solid #000000',
      borderRight: '0.5pt solid #000000',
      marginTop: '5px',
      paddingTop: '5px',
      paddingLeft: '5px',
      paddingBottom: '2px',
      paddingRight: '5px'
    },
    tableRow4a: {
      flexDirection: 'row',
      borderBottom: 1,
      borderLeft: 1,
      borderRight: 1,
      borderColor: '#E4E4E4'
    },
    dataColumn1ad: {
      width: '3%',
      textAlign: 'left',
      fontSize: '8px',
      fontWeight: 'bold',
      paddingTop: '5px',
      marginLeft: '0px',
      marginRight: '0px',
      paddingBottom: '2px'
    },
    dataColumn2ad: {
      width: '35%',
      textAlign: 'left',
      fontSize: '8px',
      borderLeft: '0.5pt solid #000000',
      borderBottom: '0.5pt solid #000000',
      paddingTop: '5px',
      paddingLeft: '5px',
      paddingBottom: '2px',
      paddingRight: '5px'
    },
    dataColumn3ad: {
      width: '43%',
      textAlign: 'left',
      fontSize: '8px',
      borderLeft: '0.5pt solid #000000',
      borderBottom: '0.5pt solid #000000',
      paddingTop: '5px',
      paddingLeft: '5px',
      paddingBottom: '2px',
      paddingRight: '5px'
    }, 
    dataColumn4ad: {
      width: '19%',
      textAlign: 'left',
      fontSize: '8px',
      borderLeft: '0.5pt solid #000000',
      borderRight: '0.5pt solid #000000',
      borderBottom: '0.5pt solid #000000',
      paddingTop: '5px',
      paddingLeft: '5px',
      paddingBottom: '2px',
      paddingRight: '5px'
    }, 
    tableRow5a: {
      flexDirection: 'row',
      borderBottom: 1,
      borderLeft: 1,
      borderRight: 1,
      borderColor: '#E4E4E4'
    },
    dataColumn1ae: {
      width: '3%',
      textAlign: 'left',
      fontSize: '8px',
      fontWeight: 'bold',
      marginTop: '5px',
      paddingTop: '5px',
      marginLeft: '0px',
      marginRight: '0px',
      paddingBottom: '2px'
    },
    dataColumn2ae: {
      width: '32%',
      textAlign: 'left',
      fontSize: '8px',
      borderLeft: '0.5pt solid #000000',
      marginTop: '5px',
      paddingTop: '5px',
      paddingLeft: '5px',
      paddingBottom: '2px',
      paddingRight: '5px'
    },
    dataColumn3ae: {
      width: '33%',
      textAlign: 'left',
      fontSize: '8px',
      borderLeft: '0.5pt solid #000000',
      marginTop: '5px',
      paddingTop: '5px',
      paddingLeft: '5px',
      paddingBottom: '2px',
      paddingRight: '5px'
    }, 
    dataColumn4ae: {
      width: '32%',
      textAlign: 'left',
      fontSize: '8px',
      borderLeft: '0.5pt solid #000000',
      borderRight: '0.5pt solid #000000',
      marginTop: '5px',
      paddingTop: '5px',
      paddingLeft: '5px',
      paddingBottom: '2px',
      paddingRight: '5px'
    },
    tableRow6a: {
      flexDirection: 'row',
      borderBottom: 1,
      borderLeft: 1,
      borderRight: 1,
      borderColor: '#E4E4E4'
    },
    dataColumn1af: {
      width: '3%',
      textAlign: 'left',
      fontSize: '8px',
      fontWeight: 'bold',
      marginTop: '5px',
      paddingTop: '5px',
      marginLeft: '0px',
      marginRight: '0px',
      paddingBottom: '2px'
    },
    dataColumn2af: {
      width: '32%',
      textAlign: 'left',
      fontSize: '9px',
      borderTop: '0.5pt solid #000000',
      borderLeft: '0.5pt solid #000000',
      borderBottom: '0.5pt solid #000000',
      marginTop: '5px',
      paddingTop: '5px',
      paddingLeft: '5px',
      paddingBottom: '2px',
      paddingRight: '5px'
    },
    dataColumn3af: {
      width: '33%',
      textAlign: 'left',
      fontSize: '9px',
      borderTop: '0.5pt solid #000000',
      borderLeft: '0.5pt solid #000000',
      borderBottom: '0.5pt solid #000000',
      marginTop: '5px',
      paddingTop: '5px',
      paddingLeft: '5px',
      paddingBottom: '2px',
      paddingRight: '5px'
    }, 
    dataColumn4af: {
      width: '16%',
      textAlign: 'left',
      fontSize: '9px',
      borderTop: '0.5pt solid #000000',
      borderLeft: '0.5pt solid #000000',
      borderBottom: '0.5pt solid #000000',
      marginTop: '5px',
      paddingTop: '5px',
      paddingLeft: '5px',
      paddingBottom: '2px',
      paddingRight: '5px'
    },
    dataColumn5af: {
      width: '16%',
      textAlign: 'left',
      fontSize: '9px',
      borderTop: '0.5pt solid #000000',
      borderLeft: '0.5pt solid #000000',
      borderBottom: '0.5pt solid #000000',
      borderRight: '0.5pt solid #000000',
      marginTop: '5px',
      paddingTop: '5px',
      paddingLeft: '5px',
      paddingBottom: '2px',
      paddingRight: '5px'
    },
    tableRow7a: {
      flexDirection: 'row',
      borderBottom: 1,
      borderLeft: 1,
      borderRight: 1,
      borderColor: '#E4E4E4'
    },
    dataColumn1ag: {
      width: '3%',
      textAlign: 'left',
      fontSize: '8px',
      fontWeight: 'bold',
      paddingTop: '5px',
      marginLeft: '0px',
      marginRight: '0px',
      paddingBottom: '2px'
    },
    dataColumn2ag: {
      width: '32%',
      textAlign: 'left',
      fontSize: '8px',
      borderLeft: '0.5pt solid #000000',
      borderBottom: '0.5pt solid #000000',
      paddingTop: '5px',
      paddingLeft: '5px',
      paddingBottom: '2px',
      paddingRight: '5px'
    },
    dataColumn3ag: {
      width: '33%',
      textAlign: 'left',
      fontSize: '8px',
      borderLeft: '0.5pt solid #000000',
      borderBottom: '0.5pt solid #000000',
      paddingTop: '5px',
      paddingLeft: '5px',
      paddingBottom: '2px',
      paddingRight: '5px'
    }, 
    dataColumn4ag: {
      width: '16%',
      textAlign: 'left',
      fontSize: '8px',
      borderLeft: '0.5pt solid #000000',
      borderBottom: '0.5pt solid #000000',
      paddingTop: '5px',
      paddingLeft: '5px',
      paddingBottom: '2px',
      paddingRight: '5px'
    },
    dataColumn5ag: {
      width: '16%',
      textAlign: 'left',
      fontSize: '8px',
      borderLeft: '0.5pt solid #000000',
      borderBottom: '0.5pt solid #000000',
      borderRight: '0.5pt solid #000000',
      paddingTop: '5px',
      paddingLeft: '5px',
      paddingBottom: '2px',
      paddingRight: '5px'
    },
      tableRow8a: {
      flexDirection: 'row',
      borderBottom: 1,
      borderLeft: 1,
      borderRight: 1,
      borderColor: '#E4E4E4'
    },
    dataColumn1ah: {
      width: '6%',
      textAlign: 'left',
      fontSize: '8px',
      fontWeight: 'bold',
      paddingTop: '5px',
      marginTop: '5px',
      marginLeft: '0px',
      marginRight: '0px',
      paddingBottom: '1px'
    },
    dataColumn2ah: {
      width: '3%',
      textAlign: 'left',
      fontSize: '8px',
      fontWeight: 'bold',
      paddingTop: '5px',
      marginTop: '5px',
      marginLeft: '0px',
      marginRight: '0px',
      paddingBottom: '1px'
    },
    dataColumn3ah: {
      width: '12%',
      textAlign: 'left',
      fontSize: '8px',
      fontWeight: 'bold',
      paddingTop: '5px',
      marginTop: '5px',
      marginLeft: '0px',
      marginRight: '0px',
      paddingBottom: '1px'
    },
    dataColumn4ah: {
      width: '15%',
      textAlign: 'center',
      fontSize: '9px',
      border: '0px',
      borderBottom: '0.5pt solid #000000',
      paddingTop: '5px',
      marginTop: '5px',
      paddingLeft: '10px',
      paddingBottom: '1px',
      paddingRight: '10px'
    },
    dataColumn5ah: {
      width: '13%',
      textAlign: 'left',
      fontSize: '8px',
      fontWeight: 'bold',
      paddingTop: '5px',
      marginTop: '5px',
      marginLeft: '0px',
      marginRight: '0px',
      paddingBottom: '1px'
    },
      dataColumn6ah: {
      width: '14%',
      textAlign: 'center',
      fontSize: '9px',
      border: '0px',
      borderBottom: '0.5pt solid #000000',
      paddingTop: '5px',
      marginTop: '5px',
      paddingLeft: '10px',
      paddingBottom: '1px',
      paddingRight: '10px'
    },
      dataColumn7ah: {
      width: '13%',
      textAlign: 'left',
      fontSize: '8px',
      fontWeight: 'bold',
      paddingTop: '5px',
      marginTop: '5px',
      marginLeft: '0px',
      marginRight: '0px',
      paddingBottom: '1px'
    },
      dataColumn8ah: {
      width: '14%',
      textAlign: 'center',
      fontSize: '9px',
      border: '0px',
      borderBottom: '0.5pt solid #000000',
      paddingTop: '5px',
      marginTop: '5px',
      paddingLeft: '10px',
      paddingBottom: '1px',
      paddingRight: '10px'
    },
      dataColumn9ah: {
      width: '5%',
      textAlign: 'left',
      fontSize: '8px',
      fontWeight: 'bold',
      paddingTop: '5px',
      marginTop: '5px',
      marginLeft: '0px',
      marginRight: '0px',
      paddingBottom: '1px'
    },
      tableRow9a: {
      flexDirection: 'row',
      borderBottom: 1,
      borderLeft: 1,
      borderRight: 1,
      borderColor: '#E4E4E4'
    },
    dataColumn1ai: {
      width: '6%',
      textAlign: 'left',
      fontSize: '8px',
      fontWeight: 'bold',
      paddingTop: '5px',
      marginTop: '5px',
      marginLeft: '0px',
      marginRight: '0px',
      paddingBottom: '1px'
    },
    dataColumn2ai: {
      width: '3%',
      textAlign: 'left',
      fontSize: '8px',
      fontWeight: 'bold',
      paddingTop: '5px',
      marginTop: '5px',
      marginLeft: '0px',
      marginRight: '0px',
      paddingBottom: '1px'
    },
    dataColumn3ai: {
      width: '91%',
      textAlign: 'left',
      fontSize: '8px',
      fontWeight: 'bold',
      paddingTop: '5px',
      marginTop: '5px',
      marginLeft: '0px',
      marginRight: '0px',
      paddingBottom: '1px'
    },
      tableRow9b: {
      flexDirection: 'row',
      borderBottom: 1,
      borderLeft: 1,
      borderRight: 1,
      borderColor: '#E4E4E4'
    },
    dataColumn1aaa: {
      width: '6%',
      textAlign: 'left',
      fontSize: '8px',
      fontWeight: 'bold',
      paddingTop: '5px',
      marginTop: '5px',
      marginLeft: '0px',
      marginRight: '0px',
      paddingBottom: '1px'
    },
    dataColumn2aaa: {
      width: '3%',
      textAlign: 'left',
      fontSize: '8px',
      fontWeight: 'bold',
      paddingTop: '5px',
      marginTop: '5px',
      marginLeft: '0px',
      marginRight: '0px',
      paddingBottom: '1px'
    },
    dataColumn3aaa: {
      width: '20%',
      textAlign: 'left',
      fontSize: '8px',
      fontWeight: 'bold',
      paddingTop: '5px',
      marginTop: '5px',
      marginLeft: '0px',
      marginRight: '0px',
      paddingBottom: '1px'
    },
    dataColumn4aaa: {
      width: '71%',
      textAlign: 'center',
      fontSize: '8px',
      border: '0px',
      borderBottom: '0.5pt solid #000000',
      paddingTop: '5px',
      marginTop: '5px',
      paddingLeft: '10px',
      paddingBottom: '1px',
      paddingRight: '10px'
    },
    tableRow9c: {
      flexDirection: 'row',
      borderBottom: 1,
      borderLeft: 1,
      borderRight: 1,
      borderColor: '#E4E4E4'
    },
    dataColumn1aab: {
      width: '6%',
      textAlign: 'left',
      fontSize: '8px',
      fontWeight: 'bold',
      paddingTop: '5px',
      marginTop: '5px',
      marginLeft: '0px',
      marginRight: '0px',
      paddingBottom: '1px'
    },
    dataColumn2aab: {
      width: '4%',
      textAlign: 'left',
      fontSize: '8px',
      fontWeight: 'bold',
      paddingTop: '5px',
      marginTop: '5px',
      marginLeft: '0px',
      marginRight: '0px',
      paddingBottom: '1px'
    },
    dataColumn3aab: {
      width: '13%',
      textAlign: 'left',
      fontSize: '8px',
      fontWeight: 'bold',
      paddingTop: '5px',
      marginTop: '5px',
      marginLeft: '0px',
      marginRight: '0px',
      paddingBottom: '1px'
    },
    dataColumn4aab: {
      width: '18%',
      textAlign: 'center',
      fontSize: '8px',
      border: '0px',
      borderBottom: '0.5pt solid #000000',
      paddingTop: '5px',
      marginTop: '5px',
      paddingLeft: '10px',
      paddingBottom: '1px',
      paddingRight: '10px'
    },
    dataColumn5aab: {
      width: '69%',
      textAlign: 'left',
      fontSize: '8px',
      fontWeight: 'bold',
      paddingTop: '5px',
      marginTop: '5px',
      marginLeft: '0px',
      marginRight: '0px',
      paddingBottom: '1px'
    },
    tableRow9d: {
      flexDirection: 'row',
      borderBottom: 1,
      borderLeft: 1,
      borderRight: 1,
      borderColor: '#E4E4E4'
    },
    dataColumn1aac: {
      width: '10%',
      paddingTop: '5px',
      marginTop: '5px',
      marginLeft: '0px',
      marginRight: '0px',
      paddingBottom: '1px'
    },
    dataColumn2aac: {
      width: '60%',
      alignItems: 'center',
      textAlign: 'center', 
      fontSize: '10px',
      border: '0px',
      paddingTop: '10px',
      marginTop: '10px',
      marginLeft: '0px',
      marginRight: '0px',
      paddingBottom: '1px'
    },
    dataColumn3aac: {
      width: '30%',
      paddingTop: '5px',
      marginTop: '5px',
      marginLeft: '0px',
      marginRight: '0px',
      paddingBottom: '1px'
    },
    tableRow9e: {
      flexDirection: 'row',
      borderBottom: 1,
      borderLeft: 1,
      borderRight: 1,
      borderColor: '#E4E4E4'
    },
    dataColumn1aad: {
      width: '12%',
      textAlign: 'center', 
      fontSize: '8px',
      border: '0px',
      paddingTop: '20px',
      marginTop: '10px',
      marginLeft: '0px',
      marginRight: '0px',
      paddingBottom: '1px'
    },
    dataColumn2aad: {
      width: '76%',
      alignItems: 'center',
      textAlign: 'center', 
      fontSize: '9px',
      border: '0px',
      paddingTop: '20px',
      marginTop: '10px',
      marginLeft: '0px',
      marginRight: '0px',
      paddingBottom: '1px'
    },
    dataColumn2aada: {
      width: '76%',
      alignItems: 'center',
      textAlign: 'left', 
      fontSize: '9px',
      border: '0px',
      paddingTop: '20px',
      marginTop: '10px',
      marginLeft: '0px',
      marginRight: '0px',
      paddingBottom: '1px'
    },
      tableRow9f: {
      flexDirection: 'row',
      borderBottom: 1,
      borderLeft: 1,
      borderRight: 1,
      borderColor: '#E4E4E4'
    },
    dataColumn1aae: {
      width: '12%',
      border: '0px',
      paddingTop: '10px',
      marginTop: '10px',
      marginLeft: '0px',
      marginRight: '0px',
      paddingBottom: '1px'
    },
    dataColumn2aae: {
      width: '76%',
      alignItems: 'center',
      textAlign: 'center', 
      fontSize: '10px',
      border: '0px',
      paddingTop: '10px',
      marginTop: '10px',
      marginLeft: '0px',
      marginRight: '0px',
      paddingBottom: '1px'
    },
    footer: {
      position: 'absolute',
      bottom: 10,
      left: 40,
      right: 40,
      height: 30,
      borderTop: '1px solid #eee',
      paddingTop: 5,
      flexDirection: 'row',
      justifyContent: 'space-between',
      color: '#888',
      fontSize: 10,
      fontStyle: 'italic',
    },
  });

  const getAcronym = (str) => {
    const matches = str.match(/\b([A-Za-z0-9])/g);
    if (matches) {
      return matches.join('').toUpperCase();
    }
    return '';
  };

  const middleNameAcronym = getAcronym(reservist?.middle_name.toUpperCase() || '');

  // Sort raw data before rendering (Newest First)
  const educationArray = reservist?.education;
  if (!educationArray) return; // Prevent the API call if the ID is missing
  const sortedEducation = [...educationArray].sort(
    (a, b) => new Date(b.date_completed) - new Date(a.date_completed),
  );

  //military training
  const trainingArray = reservist?.training;
  if (!trainingArray) return; // Prevent the iteration is array is zero or missing
  const sortedTraining = [...trainingArray].sort(
    (a, b) => new Date(b.date_completed) - new Date(a.date_completed),
  );

  //awards
  const awardArray = reservist?.awards;
  if (!awardArray) return; // Prevent the iteration is array is zero or missing
  const sortedAwards = [...awardArray].sort(
    (a, b) => new Date(b.date_awarded) - new Date(a.date_awarded),
  );

  //promotions
  const promotionArray = reservist?.promotions;
  if (!promotionArray) return; // Prevent the iteration is array is zero or missing
  const sortedPromotions = [...promotionArray].sort(
    (a, b) => new Date(b.prom_effectivity) - new Date(a.prom_effectivity),
  );

  //dependents
  const dependentArray = reservist?.dependents;
  if (!dependentArray) return; // 👈 Prevent the iteration is array is zero or missing
  const sortedDependents = [...dependentArray].sort(
    (a, b) => new Date(a.dep_birthdate) - new Date(b.dep_birthdate),
  );

  //activities
  const activityArray = reservist?.activities;
  if (!activityArray) return; // Prevent the iteration is array is zero or missing
  const sortedActivities = [...activityArray].sort(
    (a, b) => new Date(b.mil_startdate) - new Date(a.mil_startdate),
  );

  // Service Records (Active Duty)
  const activeDutyArray = reservist?.activeDuty;
  if (!activeDutyArray) return; // Prevent the iteration is array is zero or missing
  const sortedActiveDuty = [...activeDutyArray].sort(
    (a, b) => new Date(b.dateStart) - new Date(a.dateStart),
  );

  // Military Designations
    const designationArray = reservist?.userDesignation;
    if (!designationArray) return; // 👈 Prevent the API call if the ID is missing
    const sortedDesignation = [...designationArray].sort(
      (a, b) => new Date(b.date_start) - new Date(a.date_start),
  );

  return (
    <Document>
      <Page size="A4" style={style.page} wrap>
        <View style={style.header}>
            <View style={style.logoafp}>
                <Image src={afp} />
            </View>
            <View style={style.textContainer}>
                <Text style={style.textTwo}>H E A D Q U A R T E R S</Text>
                <Text style={style.textFour}>ARMED FORCES OF THE PHILIPPINES RESERVE COMMAND</Text>
                <Text style={style.textOne}>Camp General Emilio Aguinaldo, Quezon City</Text>
            </View>
            <View style={style.logoAfrescom}>
                <Image src={afprescom} />
            </View>
        </View>
        <View style={style.tableRow9j}>
            <Text style={style.textBarcode}>
                <Image
                    src={generateBarcodeDataURL(reservist?._id)}
                    style={style.barcode}
                />
            </Text>
          <Text style={style.textBlank}>&nbsp;</Text>
          <Text style={style.textPrinted}>
              Date Printed: {currentDateTime.toLocaleDateString()} <br />
              Printed Time: {currentDateTime.toLocaleTimeString()}
          </Text>
        </View>
        <View style={style.horizontalLine} />
        <Text style={style.textSeven}>***** C O N F I D E N T I A L *****</Text>
        <Text style={style.textEight}>RESERVIST SUMMARY OF INFORMATION</Text>
        <View style={style.horizontalLine} />
        <View style={style.tableHeader}>
          <Text style={style.tableColumn1}> </Text>
          <Text style={style.tableColumn2}>{reservist?.last_name ? reservist?.last_name.toUpperCase() : null}</Text>
          <Text style={style.tableColumn5}> </Text>
          <Text style={style.tableColumn3}>
            {reservist?.first_name ? reservist?.first_name.toUpperCase() : null}
            {reservist?.suffix
              ? ', ' + reservist?.suffix.toUpperCase()
              : null}
          </Text>
          <Text style={style.tableColumn5}> </Text>
          <Text style={style.tableColumn4}>{reservist?.middle_name ? reservist?.middle_name.toUpperCase() : null}</Text>
          <Text style={style.tableColumn5}> </Text>
        </View>
        <View style={style.tableHeader2}>
          <Text style={style.tableColumn1a}>1.</Text>
          <Text style={style.tableColumn2a}>LAST NAME</Text>
          <Text style={style.tableColumn3a}> </Text>
          <Text style={style.tableColumn2a}>FIRST NAME</Text>
          <Text style={style.tableColumn3a}> </Text>
          <Text style={style.tableColumn2a}>MIDDLE NAME</Text>
          <Text style={style.tableColumn3a}> </Text>
        </View>
        <View style={style.tableRow2}>
          <Text style={style.dataColumn1a}> </Text>
          <Text style={style.dataColumn2a}>RANK:</Text>
          <Text style={style.dataColumn3a}>{reservist?.rank ? reservist?.rank.toUpperCase() : null}</Text>
          <Text style={style.dataColumn6a}> </Text>
          <Text style={style.dataColumn4a}>SERIAL NUMBER:</Text>
          <Text style={style.dataColumn5a}>{reservist?.afpsn ? reservist?.afpsn.toUpperCase() : null}</Text>
          <Text style={style.dataColumn6a}> </Text>
          <Text style={style.dataColumn2a}>BOS:</Text>
          <Text style={style.dataColumn3a}>{reservist?.brsvc ? reservist?.brsvc.toUpperCase() : null}</Text>
          <Text style={style.dataColumn6a}> </Text>
          <Text style={style.dataColumn2a}>AFOS:</Text>
          <Text style={style.dataColumn3a}>{reservist?.afos ? reservist?.afos.toUpperCase() : null}</Text>
          <Text style={style.dataColumn6a}> </Text>
        </View>
        <View style={style.tableRow}>
          <Text style={style.dataColumn1}>2.</Text>
          <Text style={style.dataColumn2}>POSTAL ADDRESS:</Text>
          <Text style={style.dataColumn3}>{reservist?.address}</Text>
        </View>
        <View style={style.tableRow1}>
          <Text style={style.dataColumn1b}>3.</Text>
          <Text style={style.dataColumn2b}>CONTACT NUMBER:</Text>
          <Text style={style.dataColumn3b}>{reservist?.phone}</Text>
          <Text style={style.dataColumn4b}>EMAIL ADDRESS:</Text>
          <Text style={style.dataColumn5b}>{reservist?.email_add}</Text>
        </View>
        <View style={style.tableRow3}>
          <Text style={style.dataColumn1c}>4.</Text>
          <Text style={style.dataColumn2c}>DATE OF BIRTH:</Text>
          <Text style={style.dataColumn3c}>
            {dateFormat(reservist?.birthdate, 'dd-mmm-yyyy')}
          </Text>
          <Text style={style.dataColumn4c}>PLACE OF BIRTH:</Text>
          <Text style={style.dataColumn5c}>{reservist?.birthplace}</Text>
          <Text style={style.dataColumn6c}>AGE:</Text>
          <Text style={style.dataColumn7c}>{new Date().getFullYear() - dateFormat(reservist?.birthdate, 'yyyy')}</Text>
        </View>  
        <View style={style.tableRow4}>
          <Text style={style.dataColumn1d}>5.</Text>
          <Text style={style.dataColumn2d}>OCCUPATION:</Text>
          <Text style={style.dataColumn3d}>{reservist?.job}</Text>
          <Text style={style.dataColumn4d}>ADDRESS:</Text>
          <Text style={style.dataColumn5d}>{reservist?.busi_address}</Text>
        </View>
        <View style={style.tableRow5}>
          <Text style={style.dataColumn1e}>6.</Text>
          <Text style={style.dataColumn2e}>INITIAL RANK:</Text>
          <Text style={style.dataColumn3e}>{reservist?.initial_rank.toUpperCase()}</Text>
          <Text style={style.dataColumn4e}>EFF DATE:</Text>
          <Text style={style.dataColumn5e}>{dateFormat(reservist?.date_commission, 'dd-mmm-yyyy')}</Text>
          <Text style={style.dataColumn6e}>AUTHORITY:</Text>
          <Text style={style.dataColumn7e}>{reservist?.authority}</Text>
        </View>
        <View style={style.tableRow5}>
          <Text style={style.dataColumn1e}>7.</Text>
          <Text style={style.dataColumn2e}>CURRENT RANK:</Text>
          <Text style={style.dataColumn3e}>{reservist?.rank.toUpperCase()}</Text>
          <Text style={style.dataColumn4e}>EFF DATE:</Text>
          <Text style={style.dataColumn5e}>{dateFormat(reservist?.date_last_promotion, 'dd-mmm-yyyy')}</Text>
          <Text style={style.dataColumn6e}>AUTHORITY:</Text>
          <Text style={style.dataColumn7e}>{reservist?.lastPromotionAuthority}</Text>
        </View>
        <View style={style.tableRow6}>
          <Text style={style.dataColumn1f}>8.</Text>
          <Text style={style.dataColumn2f}>SOURCE OF COMMISSION/ ENLISTMENT:</Text>
          <Text style={style.dataColumn3f}>{reservist?.source_commission}</Text>
          <Text style={style.dataColumn4f}>EFFECTIVE DATE:</Text>
          <Text style={style.dataColumn5f}>{dateFormat(reservist?.date_commission, 'dd-mmm-yyyy')}</Text>
        </View>
        <View style={style.tableRow7}>
          <Text style={style.dataColumn1g}> </Text>
          <Text style={style.dataColumn2g}>AUTHORITY:</Text>
          <Text style={style.dataColumn3g}>{reservist?.authority}</Text>
        </View>
        <View style={style.tableRow8}>
          <Text style={style.dataColumn1h}>9.</Text>
          <Text style={style.dataColumn2h}>UNIT ASSIGNMENT:</Text>
          <Text style={style.dataColumn3h}>{reservist?.reserve_unit}</Text>
          <Text style={style.dataColumn4h}>EFFECTIVE DATE:</Text>
          <Text style={style.dataColumn5h}>{dateFormat(reservist?.effec_date_unit, 'dd-mmm-yyyy')}</Text>
        </View>
        <View style={style.tableRow7}>
          <Text style={style.dataColumn1g}> </Text>
          <Text style={style.dataColumn2g}>AUTHORITY:</Text>
          <Text style={style.dataColumn3g}>{reservist?.unitAssignmentAuthority}</Text>
        </View>
        <View style={style.tableRow9}>
          <Text style={style.dataColumn1i}>10.</Text>
          <Text style={style.dataColumn2i}>UNIT DESIGNATION:</Text>
          <Text style={style.dataColumn3i}>{reservist?.unit_designation}</Text>
          <Text style={style.dataColumn4i}>EFFECTIVE DATE:</Text>
          <Text style={style.dataColumn5i}>{dateFormat(reservist?.dateUnitDesignation, 'dd-mmm-yyyy')}</Text>
        </View>
        <View style={style.tableRow7}>
          <Text style={style.dataColumn1g}> </Text>
          <Text style={style.dataColumn2g}>AUTHORITY:</Text>
          <Text style={style.dataColumn3g}>{reservist?.unitDesignationAuthority}</Text>
        </View>
        <View style={style.tableRow1a}>
          <Text style={style.dataColumn1aa}>11.</Text>
          <Text style={style.dataColumn2aa}>MOBILIZATION UNIT:</Text>
          <Text style={style.dataColumn3aa}>{reservist?.mobilization_unit.toUpperCase()}</Text>
          <Text style={style.dataColumn4aa}>RESERVIST STATUS:</Text>
          <Text style={style.dataColumn5aa}>{reservist?.reservist_status.toUpperCase()}</Text>
        </View>
        <View style={style.tableRow2a}>
          <Text style={style.dataColumn1ab}>12.</Text>
          <Text style={style.dataColumn2ab}>EDUCATIONAL BACKGROUND:</Text>
        </View>
        <View style={style.tableRow3a}>
          <Text style={style.dataColumn1ac}> </Text>
          <Text style={style.dataColumn2ac}>COURSE</Text>
          <Text style={style.dataColumn3ac}>SCHOOL</Text>
          <Text style={style.dataColumn4ac}>DATE GRADUATED</Text>
        </View>
        {sortedEducation.length > 0 &&
          sortedEducation.map((educ) => (
          <View key={educ?._id} style={style.tableRow3a}>
            <Text style={style.dataColumn1ad}> </Text>
            <Text style={style.dataColumn2ad}>{educ?.course}</Text>
            <Text style={style.dataColumn3ad}>{educ?.school}</Text>
            <Text style={style.dataColumn4ad}>{validator.isDate(educ?.date_completed) ? dateFormat(educ?.date_completed, 'dd-mmm-yyyy') : educ?.date_completed}</Text>
          </View>
        ))}
        <View style={style.tableRow2a}>
          <Text style={style.dataColumn1ab}>13.</Text>
          <Text style={style.dataColumn2ab}>MILITARY SCHOOLING/TRAINING:</Text>
        </View>
        <View style={style.tableRow5a}>
          <Text style={style.dataColumn1ac}> </Text>
          <Text style={style.dataColumn2ac}>COURSE</Text>
          <Text style={style.dataColumn3ac}>SCHOOL</Text>
          <Text style={style.dataColumn4ac}>DATE COMPLETED</Text>
        </View>
        {sortedTraining.length > 0 &&
            sortedTraining.map((train) => (
          <View key={train?._id} style={style.tableRow4a}>
            <Text style={style.dataColumn1ad}> </Text>
            <Text style={style.dataColumn2ad}>{train?.course}</Text>
            <Text style={style.dataColumn3ad}>{train?.school}</Text>
            <Text style={style.dataColumn4ad}>{validator.isDate(train?.date_completed) ? dateFormat(train?.date_completed, 'dd-mmm-yyyy') : train?.date_completed}</Text>
          </View>
        ))}
        <View style={style.tableRow2a}>
          <Text style={style.dataColumn1ab}>14.</Text>
          <Text style={style.dataColumn2ab}>CIVILIAN AND MILITARY AWARD/RECOGNITION RECEIVED:</Text>
        </View>
        <View style={style.tableRow5a}>
          <Text style={style.dataColumn1ac}> </Text>
          <Text style={style.dataColumn2ac}>TYPE OF AWARD</Text>
          <Text style={style.dataColumn3ac}>AUTHORITY</Text>
          <Text style={style.dataColumn4ac}>DATE AWARDED</Text>
        </View>
        {sortedAwards.length > 0 &&
            sortedAwards.map((award) => (
          <View key={award?._id} style={style.tableRow5a}>
            <Text style={style.dataColumn1ad}> </Text>
            <Text style={style.dataColumn2ad}>{award?.award_type}</Text>
            <Text style={style.dataColumn3ad}>{award?.authority_from}</Text>
            <Text style={style.dataColumn4ad}>{dateFormat(award?.date_awarded, 'dd-mmm-yyyy')}</Text>
          </View>
        ))}
        <View style={style.tableRow2a}>
          <Text style={style.dataColumn1ab}>15.</Text>
          <Text style={style.dataColumn2ab}>PROMOTION:</Text>
        </View>
        <View style={style.tableRow5a}>
          <Text style={style.dataColumn1ac}> </Text>
          <Text style={style.dataColumn2ac}>RANK</Text>
          <Text style={style.dataColumn3ac}>AUTHORITY</Text>
          <Text style={style.dataColumn4ac}>DATE OF RANK</Text>
        </View>
        {sortedPromotions.length > 0 &&
            sortedPromotions.map((prom) => (
          <View key={prom?._id} style={style.tableRow6a}>
            <Text style={style.dataColumn1ad}> </Text>
            <Text style={style.dataColumn2ad}>{prom?.prom_to}</Text>
            <Text style={style.dataColumn3ad}>{prom?.prom_authority}</Text>
            <Text style={style.dataColumn4ad}>{dateFormat(prom?.prom_effectivity, 'dd-mmm-yyyy')}</Text>
          </View>
        ))}
        <View style={style.tableRow2a}>
          <Text style={style.dataColumn1ab}>16.</Text>
          <Text style={style.dataColumn2ab}>DEPENDENTS:</Text>
        </View>
        <View style={style.tableRow5a}>
          <Text style={style.dataColumn1ac}> </Text>
          <Text style={style.dataColumn2ac}>NAME</Text>
          <Text style={style.dataColumn3ac}>RELATION</Text>
          <Text style={style.dataColumn4ac}>DATE OF BIRTH</Text>
        </View>
        {sortedDependents.length > 0 &&
            sortedDependents.map((dep) => (
          <View key={dep?._id} style={style.tableRow7a}>
            <Text style={style.dataColumn1ad}> </Text>
            <Text style={style.dataColumn2ad}>{dep?.dep_name}</Text>
            <Text style={style.dataColumn3ad}>{dep?.dep_relation}</Text>
            <Text style={style.dataColumn4ad}>{dateFormat(dep?.dep_birthdate, 'dd-mmm-yyyy')}</Text>
          </View>
        ))}
        <View style={style.tableRow2a}>
          <Text style={style.dataColumn1ab}>17.</Text>
          <Text style={style.dataColumn2ab}>MILITARY ACTIVITIES ATTENDED:</Text>
        </View>
        <View style={style.tableRow6a}>
          <Text style={style.dataColumn1af}> </Text>
          <Text style={style.dataColumn2af}>ACTIVITY</Text>
          <Text style={style.dataColumn3af}>UNIT</Text>
          <Text style={style.dataColumn4af}>DATE START</Text>
          <Text style={style.dataColumn5af}>DATE END</Text>
        </View>
        {sortedActivities.length > 0 &&
            sortedActivities.map((act) => (
          <View key={act?._id} style={style.tableRow7a}>
            <Text style={style.dataColumn1ag}> </Text>
            <Text style={style.dataColumn2ag}>{act?.mil_activity}</Text>
            <Text style={style.dataColumn3ag}>{act?.mil_unit}</Text>
            <Text style={style.dataColumn4ag}>{dateFormat(act?.mil_startdate, 'dd-mmm-yyyy')}</Text>
            <Text style={style.dataColumn5ag}>{dateFormat(act?.mil_enddate, 'dd-mmm-yyyy')}</Text>
          </View>
        ))}
        <View style={style.tableRow2a}>
          <Text style={style.dataColumn1ab}>18.</Text>
          <Text style={style.dataColumn2ab}>SERVICE RECORDS (ADT):</Text>
        </View>
        <View style={style.tableRow6a}>
          <Text style={style.dataColumn1af}> </Text>
          <Text style={style.dataColumn2af}>UNIT ASSIGNMENT</Text>
          <Text style={style.dataColumn3af}>AUTHORITY</Text>
          <Text style={style.dataColumn4af}>DATE START</Text>
          <Text style={style.dataColumn5af}>DATE END</Text>
        </View>
        {sortedActiveDuty.length > 0 &&
            sortedActiveDuty.map((active) => (
          <View key={active?._id} style={style.tableRow7a}>
            <Text style={style.dataColumn1ag}> </Text>
            <Text style={style.dataColumn2ag}>{active?.soNumber}</Text>
            <Text style={style.dataColumn3ag}>{active?.adtUnitAssignment}</Text>
            <Text style={style.dataColumn4ag}>{dateFormat(active?.dateStart, 'dd-mmm-yyyy')}</Text>
            <Text style={style.dataColumn5ag}>{dateFormat(active?.dateEnd, 'dd-mmm-yyyy')}</Text>
          </View>
        ))}
        <View style={style.tableRow2a}>
          <Text style={style.dataColumn1ab}>19.</Text>
          <Text style={style.dataColumn2ab}>MILITARY DESIGNATIONS:</Text>
        </View>
        <View style={style.tableRow6a}>
          <Text style={style.dataColumn1af}> </Text>
          <Text style={style.dataColumn2af}>UNIT DESIGNATION</Text>
          <Text style={style.dataColumn3af}>AUTHORITY</Text>
          <Text style={style.dataColumn4af}>DATE START</Text>
          <Text style={style.dataColumn5af}>DATE END</Text>
        </View>
        {sortedDesignation.length > 0 &&
            sortedDesignation.map((desig) => (
          <View key={desig?._id} style={style.tableRow7a}>
            <Text style={style.dataColumn1ag}> </Text>
            <Text style={style.dataColumn2ag}>{desig?.so_Number}</Text>
            <Text style={style.dataColumn3ag}>{desig?.unitDesignation}</Text>
            <Text style={style.dataColumn4ag}>{dateFormat(desig?.date_start, 'dd-mmm-yyyy')}</Text>
            <Text style={style.dataColumn5ag}>{dateFormat(desig?.date_end, 'dd-mmm-yyyy')}</Text>
          </View>
        ))}
        <View style={style.tableRow2a}>
          <Text style={style.dataColumn1ab}>20.</Text>
          <Text style={style.dataColumn2ab}>PERSONAL CHARACTERISTICS:</Text>
        </View>
        <View style={style.tableRow8a}>
          <Text style={style.dataColumn1ah}></Text>
          <Text style={style.dataColumn2ah}>a.</Text>
          <Text style={style.dataColumn3ah}>SEX:</Text>
          <Text style={style.dataColumn4ah}>{reservist?.sex.toUpperCase()}</Text>
          <Text style={style.dataColumn9ah}></Text>
          <Text style={style.dataColumn5ah}>HEIGHT:</Text>
          <Text style={style.dataColumn6ah}>{reservist?.height}</Text>
          <Text style={style.dataColumn9ah}></Text>
          <Text style={style.dataColumn7ah}>WEIGHT:</Text>
          <Text style={style.dataColumn8ah}>{reservist?.weight}</Text>
        </View> 
        <View style={style.tableRow8a}>
          <Text style={style.dataColumn1ah}></Text>
          <Text style={style.dataColumn2ah}>b.</Text>
          <Text style={style.dataColumn3ah}>RELIGION:</Text>
          <Text style={style.dataColumn4ah}>{reservist?.religion}</Text>
          <Text style={style.dataColumn9ah}></Text>
          <Text style={style.dataColumn5ah}>BLOOD TYPE:</Text>
          <Text style={style.dataColumn6ah}>{reservist?.blood_type}</Text>
          <Text style={style.dataColumn9ah}></Text>
          <Text style={style.dataColumn7ah}>BUILT:</Text>
          <Text style={style.dataColumn8ah}>{reservist?.build}</Text>
        </View> 
        <View style={style.tableRow8a}>
          <Text style={style.dataColumn1ah}></Text>
          <Text style={style.dataColumn2ah}>c.</Text>
          <Text style={style.dataColumn3ah}>COMPLEXION:</Text>
          <Text style={style.dataColumn4ah}>{reservist?.complexion}</Text>
          <Text style={style.dataColumn9ah}></Text>
          <Text style={style.dataColumn5ah}>COLOR OF EYES:</Text>
          <Text style={style.dataColumn6ah}>{reservist?.eyes}</Text>
          <Text style={style.dataColumn9ah}></Text>
          <Text style={style.dataColumn7ah}>COLOR OF HAIR:</Text>
          <Text style={style.dataColumn8ah}>{reservist?.hair}</Text>
        </View> 
        <View style={style.tableRow9a}>
          <Text style={style.dataColumn1ai}></Text>
          <Text style={style.dataColumn2ai}>d.</Text>
          <Text style={style.dataColumn3ai}>TARIFF SIZES:</Text>
        </View>
        <View style={style.tableRow8a}>
          <Text style={style.dataColumn1ah}></Text>
          <Text style={style.dataColumn2ah}></Text>
          <Text style={style.dataColumn3ah}>HEADGEAR:</Text>
          <Text style={style.dataColumn4ah}>{reservist?.size_cap}</Text>
          <Text style={style.dataColumn9ah}></Text>
          <Text style={style.dataColumn5ah}>UNIFORM:</Text>
          <Text style={style.dataColumn6ah}>{reservist?.size_bda}</Text>
          <Text style={style.dataColumn9ah}></Text>
          <Text style={style.dataColumn7ah}>SHOES:</Text>
          <Text style={style.dataColumn8ah}>{reservist?.size_boots}</Text>
        </View>
        <View style={style.tableRow9b}>
          <Text style={style.dataColumn1aaa}></Text>
          <Text style={style.dataColumn2aaa}>e.</Text>
          <Text style={style.dataColumn3aaa}>DISTINGUISHING MARK:</Text>
          <Text style={style.dataColumn4aaa}>{reservist?.scars}</Text>
        </View>
        <View style={style.tableRow8a}>
          <Text style={style.dataColumn1ah}></Text>
          <Text style={style.dataColumn2ah}>f.</Text>
          <Text style={style.dataColumn3ah}>TIN:</Text>
          <Text style={style.dataColumn4ah}>{reservist?.tin}</Text>
          <Text style={style.dataColumn9ah}></Text>
          <Text style={style.dataColumn5ah}>PHILHEALTH:</Text>
          <Text style={style.dataColumn6ah}>{reservist?.philhealth}</Text>
          <Text style={style.dataColumn9ah}></Text>
          <Text style={style.dataColumn7ah}>SSS:</Text>
          <Text style={style.dataColumn8ah}>{reservist?.sss}</Text>
        </View>
        <View style={style.tableRow9c}>
          <Text style={style.dataColumn1aab}></Text>
          <Text style={style.dataColumn2aab}></Text>
          <Text style={style.dataColumn3aab}>GSIS:</Text>
          <Text style={style.dataColumn4aab}>{reservist?.gsis}</Text>
          <Text style={style.dataColumn5aab}></Text>
        </View> 
        <View style={style.tableRow9d}>
          <View style={style.dataColumn1aac}></View>
          <View style={style.dataColumn2aac}>
            <Text>
              I HEREBY CERTIFY that all entries in this document are correct.
            </Text>
            <Text> </Text>
            <Text> </Text>
            <Text> </Text>
            <Text> </Text>
            <Text style={style.textFive}>{`${reservist?.rank?.toUpperCase()} ${reservist?.first_name?.toUpperCase()} ${middleNameAcronym} ${reservist?.last_name?.toUpperCase()} ${reservist?.suffix?.toUpperCase()}`}</Text>
            <Text style={style.textSix}>(Signature over printed name)</Text>
            <Text style={style.dataColumn3aac}></Text>
          </View>
          <View style={style.dataColumn3aac}>
            <View style={style.profileImg}>
              <Image src={reservist?.photo} />
            </View>
          </View>
        </View>
        <View style={style.tableRow9e}>
            <Text style={style.dataColumn1aad}></Text>
            <Text style={style.dataColumn2aad}>I HEREBY CERTIFY that this document is an official output of the Reserve Management Center (RMC) Database.</Text>
            <Text style={style.dataColumn1aad}></Text>
        </View>
        <View style={style.tableRow9f}>
            <View style={style.dataColumn1aae}></View>
            <View style={style.dataColumn2aae}>
              <Text> </Text>
              <Text style={style.textSeventy}>TYRONE RYAN S SALACUT</Text>
              <Text style={style.textEighty}>CAPT                    PN (GSC)</Text>
              <Text style={style.textNinety}>Director, JRMIC</Text>
            </View>
            <View style={style.dataColumn1aae}></View>
        </View>
        <View style={style.tableRow9e}>
            <Text style={style.dataColumn1aad}>Note: </Text>
            <Text style={style.dataColumn2aada}>Any discrepancy noted in this document must be brought to the attention of the 
              Reservist Management Center, AFPRESCOM. Request for updates or alterations must be supported with appropriate documents.</Text>
            <Text style={style.dataColumn1aad}></Text>
        </View>
        {/* Fixed Page Footer */}
        <View style={style.footer} fixed>
          <Text>RPMIS | &copy; {new Date().getFullYear()}</Text>
          <Text>* * * * * C O N F I D E N T I A L * * * * *</Text>
          {/* Dynamic Page Numbers */}
          <Text render={({ pageNumber, totalPages }) => (
            `Page ${pageNumber} of ${totalPages}`
          )} />
        </View>
      </Page>
    </Document>
  )
}

export default CreateRsoiPdf