import React from 'react'
import {
  Document,
  Image,
  Page,
  StyleSheet,
  Text,
  View
} from '@react-pdf/renderer';
import dateFormat from 'dateformat';

const CreateRidsPdf = ({ reservist }) => {

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
    profileImg: {
      width: 100,
      height: 'auto',
      borderTop: '0.5pt solid #000000',
      borderLeft: '0.5pt solid #000000',
      borderBottom: '0.5pt solid #000000',
      borderRight: '0.5pt solid #000000'
    },
    textContainer: {
      width: '100%',
      alignItems: 'center',
      marginLeft: '20px',
      marginRight: '20px'
    },
    textOne: {
      fontSize: '16px',
      textAlign: 'center',
      fontWeight: 'bold',
      marginBottom: '10px'
    },
    tableHeader: {
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
      borderTop: '0.5pt solid #000000',
      borderLeft: '0.5pt solid #000000',
      borderBottom: '0.5pt solid #000000',
      paddingTop: '1px',
      paddingLeft: '5px',
      paddingBottom: '1px'
    },
    tableColumn2a: {
      width: '21%',
      textAlign: 'left',
      fontSize: '8px',
      fontWeight: 'bold',
      border: '0px',
      borderTop: '0.5pt solid #000000',
      borderLeft: '0.5pt solid #000000',
      borderBottom: '0.5pt solid #000000',
      paddingTop: '1px',
      paddingLeft: '5px',
      paddingBottom: '1px',
      paddingRight: '10px'
    },
    tableColumn3a: {
      width: '21%',
      textAlign: 'left',
      fontSize: '8px',
      fontWeight: 'bold',
      border: '0px',
      borderTop: '0.5pt solid #000000',
      borderLeft: '0.5pt solid #000000',
      borderBottom: '0.5pt solid #000000',
      paddingTop: '1px',
      paddingLeft: '5px',
      paddingBottom: '1px',
      paddingRight: '10px'
    },
    tableColumn4a: {
      width: '20%',
      textAlign: 'left',
      fontSize: '8px',
      fontWeight: 'bold',
      border: '0px',
      borderTop: '0.5pt solid #000000',
      borderLeft: '0.5pt solid #000000',
      borderBottom: '0.5pt solid #000000',
      paddingTop: '1px',
      paddingLeft: '5px',
      paddingBottom: '1px',
      paddingRight: '10px'
    },
    tableColumn6a: {
      width: '16%',
      textAlign: 'left',
      fontSize: '8px',
      fontWeight: 'bold',
      border: '0px',
      borderTop: '0.5pt solid #000000',
      borderLeft: '0.5pt solid #000000',
      borderBottom: '0.5pt solid #000000',
      paddingTop: '1px',
      paddingLeft: '5px',
      paddingBottom: '1px',
      paddingRight: '10px'
    },
    tableColumn7a: {
      width: '12%',
      textAlign: 'left',
      fontSize: '8px',
      fontWeight: 'bold',
      border: '0px',
      borderTop: '0.5pt solid #000000',
      borderLeft: '0.5pt solid #000000',
      borderRight: '0.5pt solid #000000',
      borderBottom: '0.5pt solid #000000',
      paddingTop: '1px',
      paddingLeft: '5px',
      paddingBottom: '1px',
      paddingRight: '10px'
    },
    tableHeader1: {
      flexDirection: 'row',
      borderTop: 1,
      borderLeft: 1,
      borderRight: 1,
      borderColor: '#0a0808'
    },
    tableColumn1b: {
      width: '10%',
      textAlign: 'left',
      fontSize: '10px',
      marginLeft: '0px',
      marginRight: '0px',
      borderLeft: '0.5pt solid #000000',
      borderBottom: '0.5pt solid #000000',
      paddingTop: '2px',
      paddingLeft: '5px',
      paddingBottom: '2px',
      paddingRight: '5px'
    },
    tableColumn2b: {
      width: '21%',
      textAlign: 'left',
      fontSize: '10px',
      border: '0px',
      borderLeft: '0.5pt solid #000000',
      borderBottom: '0.5pt solid #000000',
      paddingTop: '2px',
      paddingLeft: '5px',
      paddingBottom: '2px',
      paddingRight: '5px'
    },
    tableColumn3b: {
      width: '21%',
      textAlign: 'left',
      fontSize: '10px',
      border: '0px',
      borderLeft: '0.5pt solid #000000',
      borderBottom: '0.5pt solid #000000',
      paddingTop: '2px',
      paddingLeft: '5px',
      paddingBottom: '2px',
      paddingRight: '5px'
    },
    tableColumn4b: {
      width: '20%',
      textAlign: 'left',
      fontSize: '10px',
      border: '0px',
      borderLeft: '0.5pt solid #000000',
      borderBottom: '0.5pt solid #000000',
      paddingTop: '2px',
      paddingLeft: '5px',
      paddingBottom: '2px',
      paddingRight: '5px'
    },
    tableColumn6b: {
      width: '16%',
      textAlign: 'left',
      fontSize: '10px',
      border: '0px',
      borderLeft: '0.5pt solid #000000',
      borderBottom: '0.5pt solid #000000',
      paddingTop: '2px',
      paddingLeft: '5px',
      paddingBottom: '2px',
      paddingRight: '5px'
    },
    tableColumn7b: {
      width: '12%',
      textAlign: 'left',
      fontSize: '10px',
      border: '0px',
      borderLeft: '0.5pt solid #000000',
      borderRight: '0.5pt solid #000000',
      borderBottom: '0.5pt solid #000000',
      paddingTop: '2px',
      paddingLeft: '5px',
      paddingBottom: '2px',
      paddingRight: '5px'
    },
    tableHeader2: {
      flexDirection: 'row',
      borderTop: 1,
      borderLeft: 1,
      borderRight: 1,
      borderColor: '#0a0808'
    },
    tableColumn1c: {
      width: '20%',
      textAlign: 'left',
      fontSize: '8px',
      fontWeight: 'bold',
      marginLeft: '0px',
      marginRight: '0px',
      borderLeft: '0.5pt solid #000000',
      paddingTop: '1px',
      paddingLeft: '5px',
      paddingBottom: '1px'
    },
    tableColumn2c: {
      width: '50%',
      textAlign: 'left',
      fontSize: '8px',
      fontWeight: 'bold',
      border: '0px',
      borderLeft: '0.5pt solid #000000',
      paddingTop: '1px',
      paddingLeft: '5px',
      paddingBottom: '1px',
      paddingRight: '10px'
    },
    tableColumn3c: {
      width: '30%',
      textAlign: 'left',
      fontSize: '8px',
      fontWeight: 'bold',
      border: '0px',
      borderLeft: '0.5pt solid #000000',
      borderRight: '0.5pt solid #000000',
      paddingTop: '1px',
      paddingLeft: '5px',
      paddingBottom: '1px',
      paddingRight: '10px'
    },
    tableHeader3: {
      flexDirection: 'row',
      borderTop: 1,
      borderLeft: 1,
      borderRight: 1,
      borderColor: '#0a0808'
    },
    tableColumn1d: {
      width: '20%',
      textAlign: 'left',
      fontSize: '10px',
      marginLeft: '0px',
      marginRight: '0px',
      borderLeft: '0.5pt solid #000000',
      borderBottom: '0.5pt solid #000000',
      paddingTop: '2px',
      paddingLeft: '5px',
      paddingBottom: '2px',
      paddingRight: '5px'
    },
    tableColumn2d: {
      width: '50%',
      textAlign: 'left',
      fontSize: '10px',
      border: '0px',
      borderLeft: '0.5pt solid #000000',
      borderBottom: '0.5pt solid #000000',
      paddingTop: '2px',
      paddingLeft: '5px',
      paddingBottom: '2px',
      paddingRight: '5px'
    },
    tableColumn3d: {
      width: '30%',
      textAlign: 'left',
      fontSize: '10px',
      border: '0px',
      borderLeft: '0.5pt solid #000000',
      borderRight: '0.5pt solid #000000',
      borderBottom: '0.5pt solid #000000',
      paddingTop: '2px',
      paddingLeft: '5px',
      paddingBottom: '2px',
      paddingRight: '5px'
    },
    tableHeader4: {
      flexDirection: 'row',
      borderTop: 1,
      borderLeft: 1,
      borderRight: 1,
      borderColor: '#0a0808'
    },
    tableColumn1e: {
      width: '25%',
      textAlign: 'left',
      fontSize: '8px',
      fontWeight: 'bold',
      marginLeft: '0px',
      marginRight: '0px',
      borderLeft: '0.5pt solid #000000',
      paddingTop: '1px',
      paddingLeft: '5px',
      paddingBottom: '1px'
    },
    tableColumn2e: {
      width: '22%',
      textAlign: 'left',
      fontSize: '8px',
      fontWeight: 'bold',
      border: '0px',
      borderLeft: '0.5pt solid #000000',
      paddingTop: '1px',
      paddingLeft: '5px',
      paddingBottom: '1px',
      paddingRight: '10px'
    },
    tableColumn3e: {
      width: '22%',
      textAlign: 'left',
      fontSize: '8px',
      fontWeight: 'bold',
      border: '0px',
      borderLeft: '0.5pt solid #000000',
      paddingTop: '1px',
      paddingLeft: '5px',
      paddingBottom: '1px',
      paddingRight: '10px'
    },
    tableColumn4e: {
      width: '31%',
      textAlign: 'left',
      fontSize: '8px',
      fontWeight: 'bold',
      border: '0px',
      borderLeft: '0.5pt solid #000000',
      borderRight: '0.5pt solid #000000',
      paddingTop: '1px',
      paddingLeft: '5px',
      paddingBottom: '1px',
      paddingRight: '10px'
    },
    tableHeader5: {
      flexDirection: 'row',
      borderTop: 1,
      borderLeft: 1,
      borderRight: 1,
      borderColor: '#0a0808'
    },
    tableColumn1f: {
      width: '25%',
      textAlign: 'left',
      fontSize: '10px',
      marginLeft: '0px',
      marginRight: '0px',
      borderLeft: '0.5pt solid #000000',
      borderBottom: '0.5pt solid #000000',
      paddingTop: '2px',
      paddingLeft: '5px',
      paddingBottom: '2px',
      paddingRight: '5px'
    },
    tableColumn2f: {
      width: '22%',
      textAlign: 'left',
      fontSize: '10px',
      border: '0px',
      borderLeft: '0.5pt solid #000000',
      borderBottom: '0.5pt solid #000000',
      paddingTop: '2px',
      paddingLeft: '5px',
      paddingBottom: '2px',
      paddingRight: '5px'
    },
    tableColumn3f: {
      width: '22%',
      textAlign: 'left',
      fontSize: '10px',
      border: '0px',
      borderLeft: '0.5pt solid #000000',
      borderBottom: '0.5pt solid #000000',
      paddingTop: '2px',
      paddingLeft: '5px',
      paddingBottom: '2px',
      paddingRight: '5px'
    },
    tableColumn4f: {
      width: '31%',
      textAlign: 'left',
      fontSize: '10px',
      border: '0px',
      borderLeft: '0.5pt solid #000000',
      borderRight: '0.5pt solid #000000',
      borderBottom: '0.5pt solid #000000',
      paddingTop: '2px',
      paddingLeft: '5px',
      paddingBottom: '2px',
      paddingRight: '5px'
    },
    tableHeader6: {
      flexDirection: 'row',
      borderTop: 1,
      borderLeft: 1,
      borderRight: 1,
      borderColor: '#0a0808'
    },
    tableColumn1g: {
      width: '20%',
      textAlign: 'left',
      fontSize: '8px',
      fontWeight: 'bold',
      marginLeft: '0px',
      marginRight: '0px',
      borderLeft: '0.5pt solid #000000',
      paddingTop: '1px',
      paddingLeft: '5px',
      paddingBottom: '1px'
    },
    tableColumn2g: {
      width: '30%',
      textAlign: 'left',
      fontSize: '8px',
      fontWeight: 'bold',
      border: '0px',
      borderLeft: '0.5pt solid #000000',
      paddingTop: '1px',
      paddingLeft: '5px',
      paddingBottom: '1px',
      paddingRight: '10px'
    },
    tableColumn3g: {
      width: '13%',
      textAlign: 'left',
      fontSize: '8px',
      fontWeight: 'bold',
      border: '0px',
      borderLeft: '0.5pt solid #000000',
      paddingTop: '1px',
      paddingLeft: '5px',
      paddingBottom: '1px',
      paddingRight: '10px'
    },
    tableColumn4g: {
      width: '13%',
      textAlign: 'left',
      fontSize: '8px',
      fontWeight: 'bold',
      border: '0px',
      borderLeft: '0.5pt solid #000000',
      paddingTop: '1px',
      paddingLeft: '5px',
      paddingBottom: '1px',
      paddingRight: '10px'
    },
    tableColumn5g: {
      width: '24%',
      textAlign: 'left',
      fontSize: '8px',
      fontWeight: 'bold',
      border: '0px',
      borderLeft: '0.5pt solid #000000',
      borderRight: '0.5pt solid #000000',
      paddingTop: '1px',
      paddingLeft: '5px',
      paddingBottom: '1px',
      paddingRight: '10px'
    },
    tableHeader7: {
      flexDirection: 'row',
      borderTop: 1,
      borderLeft: 1,
      borderRight: 1,
      borderColor: '#0a0808'
    },
    tableColumn1h: {
      width: '20%',
      textAlign: 'left',
      fontSize: '10px',
      marginLeft: '0px',
      marginRight: '0px',
      borderLeft: '0.5pt solid #000000',
      borderBottom: '0.5pt solid #000000',
      paddingTop: '2px',
      paddingLeft: '5px',
      paddingBottom: '2px',
      paddingRight: '5px'
    },
    tableColumn2h: {
      width: '30%',
      textAlign: 'left',
      fontSize: '10px',
      marginLeft: '0px',
      marginRight: '0px',
      borderLeft: '0.5pt solid #000000',
      borderBottom: '0.5pt solid #000000',
      paddingTop: '2px',
      paddingLeft: '5px',
      paddingBottom: '2px',
      paddingRight: '5px'
    },
    tableColumn3h: {
      width: '13%',
      textAlign: 'left',
      fontSize: '10px',
      marginLeft: '0px',
      marginRight: '0px',
      borderLeft: '0.5pt solid #000000',
      borderBottom: '0.5pt solid #000000',
      paddingTop: '2px',
      paddingLeft: '5px',
      paddingBottom: '2px',
      paddingRight: '5px'
    },
    tableColumn4h: {
      width: '13%',
      textAlign: 'left',
      fontSize: '10px',
      marginLeft: '0px',
      marginRight: '0px',
      borderLeft: '0.5pt solid #000000',
      borderBottom: '0.5pt solid #000000',
      paddingTop: '2px',
      paddingLeft: '5px',
      paddingBottom: '2px',
      paddingRight: '5px'
    },
    tableColumn5h: {
      width: '24%',
      textAlign: 'left',
      fontSize: '10px',
      marginLeft: '0px',
      marginRight: '0px',
      borderLeft: '0.5pt solid #000000',
      borderRight: '0.5pt solid #000000',
      borderBottom: '0.5pt solid #000000',
      paddingTop: '2px',
      paddingLeft: '5px',
      paddingBottom: '2px',
      paddingRight: '5px'
    },
    tableHeader8: {
      flexDirection: 'row',
      borderTop: 1,
      borderLeft: 1,
      borderRight: 1,
      borderColor: '#0a0808'
    },
    tableColumn1i: {
      width: '100%',
      textAlign: 'left',
      fontSize: '10px',
      fontWeight: 'bold',
      marginLeft: '0px',
      marginRight: '0px',
      borderLeft: '0.5pt solid #000000',
      borderRight: '0.5pt solid #000000',
      paddingTop: '2px',
      paddingLeft: '5px',
      paddingBottom: '2px',
      paddingRight: '5px'
    },
    tableHeader9: {
      flexDirection: 'row',
      borderTop: 1,
      borderLeft: 1,
      borderRight: 1,
      borderColor: '#0a0808'
    },
    tableColumn1j: {
      width: '40%',
      textAlign: 'left',
      fontSize: '8px',
      fontWeight: 'bold',
      marginLeft: '0px',
      marginRight: '0px',
      borderTop: '0.5pt solid #000000',
      borderLeft: '0.5pt solid #000000',
      borderBottom: '0.5pt solid #000000',
      paddingTop: '1px',
      paddingLeft: '5px',
      paddingBottom: '1px'
    },
    tableColumn2j: {
      width: '35%',
      textAlign: 'left',
      fontSize: '8px',
      fontWeight: 'bold',
      border: '0px',
      borderTop: '0.5pt solid #000000',
      borderLeft: '0.5pt solid #000000',
      borderBottom: '0.5pt solid #000000',
      paddingTop: '1px',
      paddingLeft: '5px',
      paddingBottom: '1px',
      paddingRight: '10px'
    },
    tableColumn3j: {
      width: '25%',
      textAlign: 'left',
      fontSize: '8px',
      fontWeight: 'bold',
      border: '0px',
      borderTop: '0.5pt solid #000000',
      borderLeft: '0.5pt solid #000000',
      borderRight: '0.5pt solid #000000',
      borderBottom: '0.5pt solid #000000',
      paddingTop: '1px',
      paddingLeft: '5px',
      paddingBottom: '1px',
      paddingRight: '10px'
    },
    tableHeader9a: {
      flexDirection: 'row',
      borderTop: 1,
      borderLeft: 1,
      borderRight: 1,
      borderColor: '#0a0808'
    },
    tableColumn1k: {
      width: '40%',
      textAlign: 'left',
      fontSize: '10px',
      marginLeft: '0px',
      marginRight: '0px',
      borderLeft: '0.5pt solid #000000',
      paddingTop: '1px',
      paddingLeft: '5px',
      paddingBottom: '1px'
    },
    tableColumn2k: {
      width: '35%',
      textAlign: 'left',
      fontSize: '10px',
      border: '0px',
      borderLeft: '0.5pt solid #000000',
      paddingTop: '1px',
      paddingLeft: '5px',
      paddingBottom: '1px',
      paddingRight: '10px'
    },
    tableColumn3k: {
      width: '25%',
      textAlign: 'left',
      fontSize: '10px',
      border: '0px',
      borderLeft: '0.5pt solid #000000',
      borderRight: '0.5pt solid #000000',
      paddingTop: '1px',
      paddingLeft: '5px',
      paddingBottom: '1px',
      paddingRight: '10px'
    },
    tableHeader9b: {
      flexDirection: 'row',
      borderTop: 1,
      borderLeft: 1,
      borderRight: 1,
      borderColor: '#0a0808'
    },
    tableColumn1l: {
      width: '35%',
      textAlign: 'left',
      fontSize: '8px',
      fontWeight: 'bold',
      marginLeft: '0px',
      marginRight: '0px',
      borderTop: '0.5pt solid #000000',
      borderLeft: '0.5pt solid #000000',
      paddingTop: '1px',
      paddingLeft: '5px',
      paddingBottom: '1px'
    },
    tableColumn2l: {
      width: '65%',
      textAlign: 'left',
      fontSize: '8px',
      fontWeight: 'bold',
      border: '0px',
      borderTop: '0.5pt solid #000000',
      borderLeft: '0.5pt solid #000000',
      borderRight: '0.5pt solid #000000',
      paddingTop: '1px',
      paddingLeft: '5px',
      paddingBottom: '1px',
      paddingRight: '10px'
    },
    tableHeader9c: {
      flexDirection: 'row',
      borderTop: 1,
      borderLeft: 1,
      borderRight: 1,
      borderColor: '#0a0808'
    },
    tableColumn1m: {
      width: '35%',
      textAlign: 'left',
      fontSize: '10px',
      marginLeft: '0px',
      marginRight: '0px',
      borderLeft: '0.5pt solid #000000',
      borderBottom: '0.5pt solid #000000',
      paddingTop: '1px',
      paddingLeft: '5px',
      paddingBottom: '1px'
    },
    tableColumn2m: {
      width: '65%',
      textAlign: 'left',
      fontSize: '10px',
      border: '0px',
      borderLeft: '0.5pt solid #000000',
      borderRight: '0.5pt solid #000000',
      borderBottom: '0.5pt solid #000000',
      paddingTop: '1px',
      paddingLeft: '5px',
      paddingBottom: '1px',
      paddingRight: '10px'
    },
    tableHeader9d: {
      flexDirection: 'row',
      borderTop: 1,
      borderLeft: 1,
      borderRight: 1,
      borderColor: '#0a0808'
    },
    tableColumn1n: {
      width: '20%',
      textAlign: 'left',
      fontSize: '8px',
      fontWeight: 'bold',
      marginLeft: '0px',
      marginRight: '0px',
      borderLeft: '0.5pt solid #000000',
      paddingTop: '1px',
      paddingLeft: '5px',
      paddingBottom: '1px'
    },
    tableColumn2n: {
      width: '30%',
      textAlign: 'left',
      fontSize: '8px',
      fontWeight: 'bold',
      border: '0px',
      borderLeft: '0.5pt solid #000000',
      paddingTop: '1px',
      paddingLeft: '5px',
      paddingBottom: '1px',
      paddingRight: '10px'
    },
    tableColumn3n: {
      width: '50%',
      textAlign: 'left',
      fontSize: '8px',
      fontWeight: 'bold',
      border: '0px',
      borderLeft: '0.5pt solid #000000',
      borderRight: '0.5pt solid #000000',
      paddingLeft: '5px',
      paddingBottom: '1px',
      paddingRight: '10px'
    },
    tableHeader9e: {
      flexDirection: 'row',
      borderTop: 1,
      borderLeft: 1,
      borderRight: 1,
      borderColor: '#0a0808'
    },
    tableColumn1o: {
      width: '20%',
      textAlign: 'left',
      fontSize: '10px',
      marginLeft: '0px',
      marginRight: '0px',
      borderLeft: '0.5pt solid #000000',
      borderBottom: '0.5pt solid #000000',
      paddingTop: '1px',
      paddingLeft: '5px',
      paddingBottom: '1px'
    },
    tableColumn2o: {
      width: '30%',
      textAlign: 'left',
      fontSize: '10px',
      border: '0px',
      borderLeft: '0.5pt solid #000000',
      borderBottom: '0.5pt solid #000000',
      paddingTop: '1px',
      paddingLeft: '5px',
      paddingBottom: '1px',
      paddingRight: '10px'
    },
    tableColumn3o: {
      width: '50%',
      textAlign: 'left',
      fontSize: '10px',
      border: '0px',
      borderLeft: '0.5pt solid #000000',
      borderRight: '0.5pt solid #000000',
      borderBottom: '0.5pt solid #000000',
      paddingTop: '1px',
      paddingLeft: '5px',
      paddingBottom: '1px',
      paddingRight: '10px'
    },
    tableHeader9f: {
      flexDirection: 'row',
      borderTop: 1,
      borderLeft: 1,
      borderRight: 1,
      borderColor: '#0a0808'
    },
    tableColumn1p: {
      width: '35%',
      textAlign: 'left',
      fontSize: '8px',
      fontWeight: 'bold',
      marginLeft: '0px',
      marginRight: '0px',
      borderLeft: '0.5pt solid #000000',
      paddingTop: '1px',
      paddingLeft: '5px',
      paddingBottom: '1px'
    },
    tableColumn2p: {
      width: '20%',
      textAlign: 'left',
      fontSize: '8px',
      fontWeight: 'bold',
      border: '0px',
      borderLeft: '0.5pt solid #000000',
      paddingTop: '1px',
      paddingLeft: '5px',
      paddingBottom: '1px',
      paddingRight: '10px'
    },
    tableColumn3p: {
      width: '45%',
      textAlign: 'left',
      fontSize: '8px',
      fontWeight: 'bold',
      border: '0px',
      borderLeft: '0.5pt solid #000000',
      borderRight: '0.5pt solid #000000',
      paddingLeft: '5px',
      paddingBottom: '1px',
      paddingRight: '10px'
    },
    tableHeader9g: {
      flexDirection: 'row',
      borderTop: 1,
      borderLeft: 1,
      borderRight: 1,
      borderColor: '#0a0808'
    },
    tableColumn1q: {
      width: '35%',
      textAlign: 'left',
      fontSize: '10px',
      marginLeft: '0px',
      marginRight: '0px',
      borderLeft: '0.5pt solid #000000',
      borderBottom: '0.5pt solid #000000',
      paddingTop: '1px',
      paddingLeft: '5px',
      paddingBottom: '1px'
    },
    tableColumn2q: {
      width: '20%',
      textAlign: 'left',
      fontSize: '10px',
      border: '0px',
      borderLeft: '0.5pt solid #000000',
      borderBottom: '0.5pt solid #000000',
      paddingTop: '1px',
      paddingLeft: '5px',
      paddingBottom: '1px',
      paddingRight: '10px'
    },
    tableColumn3q: {
      width: '45%',
      textAlign: 'left',
      fontSize: '10px',
      border: '0px',
      borderLeft: '0.5pt solid #000000',
      borderRight: '0.5pt solid #000000',
      borderBottom: '0.5pt solid #000000',
      paddingLeft: '5px',
      paddingBottom: '1px',
      paddingRight: '10px'
    },
    tableHeader9h: {
      flexDirection: 'row',
      borderTop: 1,
      borderLeft: 1,
      borderRight: 1,
      borderColor: '#0a0808'
    },
    tableColumn1r: {
      width: '50%',
      textAlign: 'left',
      fontSize: '8px',
      fontWeight: 'bold',
      marginLeft: '0px',
      marginRight: '0px',
      borderLeft: '0.5pt solid #000000',
      paddingTop: '1px',
      paddingLeft: '5px',
      paddingBottom: '1px'
    },
    tableColumn2r: {
      width: '50%',
      textAlign: 'left',
      fontSize: '8px',
      fontWeight: 'bold',
      border: '0px',
      borderLeft: '0.5pt solid #000000',
      borderRight: '0.5pt solid #000000',
      paddingTop: '1px',
      paddingLeft: '5px',
      paddingBottom: '1px',
      paddingRight: '10px'
    },
    tableHeader9i: {
      flexDirection: 'row',
      borderTop: 1,
      borderLeft: 1,
      borderRight: 1,
      borderColor: '#0a0808'
    },
    tableColumn1s: {
      width: '50%',
      textAlign: 'left',
      fontSize: '10px',
      marginLeft: '0px',
      marginRight: '0px',
      borderLeft: '0.5pt solid #000000',
      borderBottom: '0.5pt solid #000000',
      paddingTop: '1px',
      paddingLeft: '5px',
      paddingBottom: '1px'
    },
    tableColumn2s: {
      width: '50%',
      textAlign: 'left',
      fontSize: '10px',
      border: '0px',
      borderLeft: '0.5pt solid #000000',
      borderRight: '0.5pt solid #000000',
      borderBottom: '0.5pt solid #000000',
      paddingTop: '1px',
      paddingLeft: '5px',
      paddingBottom: '1px',
      paddingRight: '10px'
    },
    tableHeader9j: {
      flexDirection: 'row',
      borderTop: 1,
      borderLeft: 1,
      borderRight: 1,
      borderColor: '#0a0808'
    },
    tableColumn1t: {
      width: '30%',
      textAlign: 'left',
      fontSize: '8px',
      fontWeight: 'bold',
      marginLeft: '0px',
      marginRight: '0px',
      borderTop: '0.5pt solid #000000',
      borderLeft: '0.5pt solid #000000',
      borderBottom: '0.5pt solid #000000',
      paddingTop: '2px',
      paddingLeft: '5px',
      paddingBottom: '2px'
    },
    tableColumn2t: {
      width: '40%',
      textAlign: 'left',
      fontSize: '8px',
      fontWeight: 'bold',
      border: '0px',
      borderTop: '0.5pt solid #000000',
      borderLeft: '0.5pt solid #000000',
      borderBottom: '0.5pt solid #000000',
      paddingTop: '2px',
      paddingLeft: '5px',
      paddingBottom: '2px'
    },
    tableColumn3t: {
      width: '30%',
      textAlign: 'left',
      fontSize: '8px',
      fontWeight: 'bold',
      border: '0px',
      borderTop: '0.5pt solid #000000',
      borderLeft: '0.5pt solid #000000',
      borderRight: '0.5pt solid #000000',
      borderBottom: '0.5pt solid #000000',
      paddingTop: '2px',
      paddingLeft: '5px',
      paddingBottom: '2px'
    },
    tableHeader9k: {
      flexDirection: 'row',
      borderTop: 1,
      borderLeft: 1,
      borderRight: 1,
      borderColor: '#0a0808'
    },
    tableColumn1u: {
      width: '30%',
      textAlign: 'left',
      fontSize: '10px',
      marginLeft: '0px',
      marginRight: '0px',
      borderLeft: '0.5pt solid #000000',
      paddingTop: '1px',
      paddingLeft: '5px',
      paddingBottom: '1px'
    },
    tableColumn2u: {
      width: '40%',
      textAlign: 'left',
      fontSize: '10px',
      border: '0px',
      borderLeft: '0.5pt solid #000000',
      paddingTop: '1px',
      paddingLeft: '5px',
      paddingBottom: '1px',
      paddingRight: '10px'
    },
    tableColumn3u: {
      width: '30%',
      textAlign: 'left',
      fontSize: '10px',
      border: '0px',
      borderLeft: '0.5pt solid #000000',
      borderRight: '0.5pt solid #000000',
      paddingLeft: '5px',
      paddingBottom: '1px',
      paddingRight: '10px'
    },
    tableHeader9l: {
      flexDirection: 'row',
      borderTop: 1,
      borderLeft: 1,
      borderRight: 1,
      borderColor: '#0a0808'
    },
    tableColumn1v: {
      width: '100%',
      textAlign: 'left',
      fontSize: '10px',
      fontWeight: 'bold',
      marginLeft: '0px',
      marginRight: '0px',
      borderTop: '0.5pt solid #000000',
      borderLeft: '0.5pt solid #000000',
      borderRight: '0.5pt solid #000000',
      paddingTop: '2px',
      paddingLeft: '5px',
      paddingBottom: '2px',
      paddingRight: '5px'
    },
    tableHeader9m: {
      flexDirection: 'row',
      borderTop: 1,
      borderLeft: 1,
      borderRight: 1,
      borderColor: '#0a0808'
    },
    tableColumn1w: {
      width: '5%',
      textAlign: 'center',
      fontSize: '8px',
      fontWeight: 'bold',
      marginLeft: '0px',
      marginRight: '0px',
      borderTop: '0.5pt solid #000000',
      borderLeft: '0.5pt solid #000000',
      borderBottom: '0.5pt solid #000000',
      paddingTop: '2px',
      paddingLeft: '5px',
      paddingRight: '5px',
      paddingBottom: '2px'
    },
    tableColumn2w: {
      width: '33%',
      textAlign: 'left',
      fontSize: '8px',
      fontWeight: 'bold',
      border: '0px',
      borderTop: '0.5pt solid #000000',
      borderBottom: '0.5pt solid #000000',
      paddingTop: '2px',
      paddingLeft: '5px',
      paddingRight: '5px',
      paddingBottom: '2px'
    },
    tableColumn3w: {
      width: '42%',
      textAlign: 'left',
      fontSize: '8px',
      fontWeight: 'bold',
      border: '0px',
      borderTop: '0.5pt solid #000000',
      borderLeft: '0.5pt solid #000000',
      borderBottom: '0.5pt solid #000000',
      paddingTop: '2px',
      paddingLeft: '5px',
      paddingRight: '5px',
      paddingBottom: '2px'
    },
    tableColumn4w: {
      width: '20%',
      textAlign: 'left',
      fontSize: '8px',
      fontWeight: 'bold',
      border: '0px',
      borderTop: '0.5pt solid #000000',
      borderLeft: '0.5pt solid #000000',
      borderRight: '0.5pt solid #000000',
      borderBottom: '0.5pt solid #000000',
      paddingTop: '2px',
      paddingLeft: '5px',
      paddingRight: '5px',
      paddingBottom: '2px'
    },
    tableHeader9n: {
      flexDirection: 'row',
      borderTop: 1,
      borderLeft: 1,
      borderRight: 1,
      borderColor: '#0a0808'
    },
    tableColumn1x: {
      width: '5%',
      textAlign: 'center',
      fontSize: '10px',
      marginLeft: '0px',
      marginRight: '0px',
      borderLeft: '0.5pt solid #000000',
      paddingTop: '2px',
      paddingLeft: '5px',
      paddingBottom: '2px'
    },
    tableColumn2x: {
      width: '33%',
      textAlign: 'left',
      fontSize: '10px',
      border: '0px',
      paddingTop: '2px',
      paddingLeft: '5px',
      paddingBottom: '2px'
    },
    tableColumn3x: {
      width: '42%',
      textAlign: 'left',
      fontSize: '10px',
      border: '0px',
      borderLeft: '0.5pt solid #000000',
      paddingTop: '2px',
      paddingLeft: '5px',
      paddingBottom: '2px'
    },
    tableColumn4x: {
      width: '20%',
      textAlign: 'left',
      fontSize: '10px',
      border: '0px',
      borderLeft: '0.5pt solid #000000',
      borderRight: '0.5pt solid #000000',
      paddingTop: '2px',
      paddingLeft: '5px',
      paddingBottom: '2px'
    },
    tableHeader9o: {
      flexDirection: 'row',
      borderTop: 1,
      borderLeft: 1,
      borderRight: 1,
      borderColor: '#0a0808'
    },
    tableColumn1y: {
      width: '5%',
      textAlign: 'center',
      fontSize: '8px',
      fontWeight: 'bold',
      marginLeft: '0px',
      marginRight: '0px',
      borderTop: '0.5pt solid #000000',
      borderLeft: '0.5pt solid #000000',
      borderBottom: '0.5pt solid #000000',
      paddingTop: '2px',
      paddingLeft: '5px',
      paddingRight: '5px',
      paddingBottom: '2px'
    },
    tableColumn2y: {
      width: '30%',
      textAlign: 'left',
      fontSize: '8px',
      fontWeight: 'bold',
      border: '0px',
      borderTop: '0.5pt solid #000000',
      borderBottom: '0.5pt solid #000000',
      paddingTop: '2px',
      paddingLeft: '5px',
      paddingRight: '5px',
      paddingBottom: '2px'
    },
    tableColumn3y: {
      width: '38%',
      textAlign: 'left',
      fontSize: '8px',
      fontWeight: 'bold',
      border: '0px',
      borderTop: '0.5pt solid #000000',
      borderLeft: '0.5pt solid #000000',
      borderBottom: '0.5pt solid #000000',
      paddingTop: '2px',
      paddingLeft: '5px',
      paddingRight: '5px',
      paddingBottom: '2px'
    },
    tableColumn4y: {
      width: '27%',
      textAlign: 'left',
      fontSize: '8px',
      fontWeight: 'bold',
      border: '0px',
      borderTop: '0.5pt solid #000000',
      borderLeft: '0.5pt solid #000000',
      borderRight: '0.5pt solid #000000',
      borderBottom: '0.5pt solid #000000',
      paddingTop: '2px',
      paddingLeft: '5px',
      paddingRight: '5px',
      paddingBottom: '2px'
    },
    tableHeader9p: {
      flexDirection: 'row',
      borderTop: 1,
      borderLeft: 1,
      borderRight: 1,
      borderColor: '#0a0808'
    },
    tableColumn1z: {
      width: '5%',
      textAlign: 'center',
      fontSize: '10px',
      marginLeft: '0px',
      marginRight: '0px',
      borderLeft: '0.5pt solid #000000',
      paddingTop: '2px',
      paddingLeft: '5px',
      paddingBottom: '2px'
    },
    tableColumn2z: {
      width: '30%',
      textAlign: 'left',
      fontSize: '10px',
      border: '0px',
      paddingTop: '2px',
      paddingLeft: '5px',
      paddingBottom: '2px'
    },
    tableColumn3z: {
      width: '38%',
      textAlign: 'left',
      fontSize: '10px',
      border: '0px',
      borderLeft: '0.5pt solid #000000',
      paddingTop: '2px',
      paddingLeft: '5px',
      paddingBottom: '2px'
    },
    tableColumn4z: {
      width: '27%',
      textAlign: 'left',
      fontSize: '10px',
      border: '0px',
      borderLeft: '0.5pt solid #000000',
      borderRight: '0.5pt solid #000000',
      paddingTop: '2px',
      paddingLeft: '5px',
      paddingBottom: '2px'
    },
    tableHeader9q: {
      flexDirection: 'row',
      borderTop: 1,
      borderLeft: 1,
      borderRight: 1,
      borderColor: '#0a0808'
    },
    tableColumn1aa: {
      width: '5%',
      textAlign: 'center',
      fontSize: '8px',
      fontWeight: 'bold',
      marginLeft: '0px',
      marginRight: '0px',
      borderTop: '0.5pt solid #000000',
      borderLeft: '0.5pt solid #000000',
      borderBottom: '0.5pt solid #000000',
      paddingTop: '2px',
      paddingLeft: '5px',
      paddingRight: '5px',
      paddingBottom: '2px'
    },
    tableColumn2aa: {
      width: '20%',
      textAlign: 'left',
      fontSize: '8px',
      fontWeight: 'bold',
      border: '0px',
      borderTop: '0.5pt solid #000000',
      borderBottom: '0.5pt solid #000000',
      paddingTop: '2px',
      paddingLeft: '5px',
      paddingRight: '5px',
      paddingBottom: '2px'
    },
    tableColumn3aa: {
      width: '15%',
      textAlign: 'left',
      fontSize: '8px',
      fontWeight: 'bold',
      border: '0px',
      borderTop: '0.5pt solid #000000',
      borderLeft: '0.5pt solid #000000',
      borderBottom: '0.5pt solid #000000',
      paddingTop: '2px',
      paddingLeft: '5px',
      paddingRight: '5px',
      paddingBottom: '2px'
    },
    tableColumn4aa: {
      width: '15%',
      textAlign: 'left',
      fontSize: '8px',
      fontWeight: 'bold',
      border: '0px',
      borderTop: '0.5pt solid #000000',
      borderLeft: '0.5pt solid #000000',
      borderBottom: '0.5pt solid #000000',
      paddingTop: '2px',
      paddingLeft: '5px',
      paddingRight: '5px',
      paddingBottom: '2px'
    },
    tableColumn5aa: {
      width: '15%',
      textAlign: 'left',
      fontSize: '8px',
      fontWeight: 'bold',
      border: '0px',
      borderTop: '0.5pt solid #000000',
      borderLeft: '0.5pt solid #000000',
      borderBottom: '0.5pt solid #000000',
      paddingTop: '2px',
      paddingLeft: '5px',
      paddingRight: '5px',
      paddingBottom: '2px'
    },
    tableColumn6aa: {
      width: '15%',
      textAlign: 'left',
      fontSize: '8px',
      fontWeight: 'bold',
      border: '0px',
      borderTop: '0.5pt solid #000000',
      borderLeft: '0.5pt solid #000000',
      borderBottom: '0.5pt solid #000000',
      paddingTop: '2px',
      paddingLeft: '5px',
      paddingRight: '5px',
      paddingBottom: '2px'
    },
    tableColumn7aa: {
      width: '15%',
      textAlign: 'left',
      fontSize: '8px',
      fontWeight: 'bold',
      border: '0px',
      borderTop: '0.5pt solid #000000',
      borderLeft: '0.5pt solid #000000',
      borderRight: '0.5pt solid #000000',
      borderBottom: '0.5pt solid #000000',
      paddingTop: '2px',
      paddingLeft: '5px',
      paddingRight: '5px',
      paddingBottom: '2px'
    },
    tableHeader9r: {
      flexDirection: 'row',
      borderTop: 1,
      borderLeft: 1,
      borderRight: 1,
      borderColor: '#0a0808'
    },
    tableColumn1ab: {
      width: '5%',
      textAlign: 'center',
      fontSize: '10px',
      marginLeft: '0px',
      marginRight: '0px',
      borderLeft: '0.5pt solid #000000',
      borderBottom: '0.5pt solid #000000',
      paddingTop: '2px',
      paddingLeft: '5px',
      paddingRight: '5px',
      paddingBottom: '2px'
    },
    tableColumn2ab: {
      width: '20%',
      textAlign: 'left',
      fontSize: '10px',
      border: '0px',
      borderBottom: '0.5pt solid #000000',
      paddingTop: '2px',
      paddingLeft: '5px',
      paddingRight: '5px',
      paddingBottom: '2px'
    },
    tableColumn3ab: {
      width: '15%',
      textAlign: 'left',
      fontSize: '10px',
      border: '0px',
      borderLeft: '0.5pt solid #000000',
      borderBottom: '0.5pt solid #000000',
      paddingTop: '2px',
      paddingLeft: '5px',
      paddingRight: '5px',
      paddingBottom: '2px'
    },
    tableColumn4ab: {
      width: '15%',
      textAlign: 'left',
      fontSize: '10px',
      border: '0px',
      borderLeft: '0.5pt solid #000000',
      borderBottom: '0.5pt solid #000000',
      paddingTop: '2px',
      paddingLeft: '5px',
      paddingRight: '5px',
      paddingBottom: '2px'
    },
    tableColumn5ab: {
      width: '15%',
      textAlign: 'left',
      fontSize: '10px',
      border: '0px',
      borderLeft: '0.5pt solid #000000',
      borderBottom: '0.5pt solid #000000',
      paddingTop: '2px',
      paddingLeft: '5px',
      paddingRight: '5px',
      paddingBottom: '2px'
    },
    tableColumn6ab: {
      width: '15%',
      textAlign: 'left',
      fontSize: '10px',
      border: '0px',
      borderLeft: '0.5pt solid #000000',
      borderBottom: '0.5pt solid #000000',
      paddingTop: '2px',
      paddingLeft: '5px',
      paddingRight: '5px',
      paddingBottom: '2px'
    },
    tableColumn7ab: {
      width: '15%',
      textAlign: 'left',
      fontSize: '10px',
      border: '0px',
      borderLeft: '0.5pt solid #000000',
      borderRight: '0.5pt solid #000000',
      borderBottom: '0.5pt solid #000000',
      paddingTop: '2px',
      paddingLeft: '5px',
      paddingRight: '5px',
      paddingBottom: '2px'
    },
    tableHeader9s: {
      flexDirection: 'row',
      borderTop: 1,
      borderLeft: 1,
      borderRight: 1,
      borderColor: '#0a0808'
    },
    tableColumn1ac: {
      width: '100%',
      textAlign: 'left',
      fontSize: '10px',
      fontWeight: 'bold',
      marginLeft: '0px',
      marginRight: '0px',
      borderLeft: '0.5pt solid #000000',
      borderRight: '0.5pt solid #000000',
      borderBottom: '0.5pt solid #000000',
      paddingTop: '2px',
      paddingLeft: '5px',
      paddingBottom: '2px',
      paddingRight: '5px'
    },
    tableHeader9t: {
      flexDirection: 'row',
      borderTop: 1,
      borderLeft: 1,
      borderRight: 1,
      borderColor: '#0a0808'
    },
    tableColumn1ad: {
      width: '25%',
      textAlign: 'left',
      fontSize: '8px',
      fontWeight: 'bold',
      marginLeft: '0px',
      marginRight: '0px',
      borderLeft: '0.5pt solid #000000',
      paddingTop: '2px',
      paddingLeft: '5px',
      paddingBottom: '2px'
    },
    tableColumn2ad: {
      width: '25%',
      textAlign: 'left',
      fontSize: '8px',
      fontWeight: 'bold',
      border: '0px',
      borderLeft: '0.5pt solid #000000',
      paddingTop: '2px',
      paddingLeft: '5px',
      paddingBottom: '2px'
    },
    tableColumn3ad: {
      width: '25%',
      textAlign: 'left',
      fontSize: '8px',
      fontWeight: 'bold',
      border: '0px',
      borderLeft: '0.5pt solid #000000',
      paddingTop: '2px',
      paddingLeft: '5px',
      paddingBottom: '2px'
    },
    tableColumn4ad: {
      width: '25%',
      textAlign: 'left',
      fontSize: '8px',
      fontWeight: 'bold',
      border: '0px',
      borderLeft: '0.5pt solid #000000',
      borderRight: '0.5pt solid #000000',
      paddingTop: '2px',
      paddingLeft: '5px',
      paddingBottom: '2px'
    },
    tableHeader9u: {
      flexDirection: 'row',
      borderTop: 1,
      borderLeft: 1,
      borderRight: 1,
      borderColor: '#0a0808'
    },
    tableColumn1ae: {
      width: '25%',
      textAlign: 'left',
      fontSize: '10px',
      marginLeft: '0px',
      marginRight: '0px',
      borderLeft: '0.5pt solid #000000',
      borderBottom: '0.5pt solid #000000',
      paddingTop: '2px',
      paddingLeft: '5px',
      paddingBottom: '2px'
    },
    tableColumn2ae: {
      width: '25%',
      textAlign: 'left',
      fontSize: '10px',
      border: '0px',
      borderLeft: '0.5pt solid #000000',
      borderBottom: '0.5pt solid #000000',
      paddingTop: '2px',
      paddingLeft: '5px',
      paddingBottom: '2px'
    },
    tableColumn3ae: {
      width: '25%',
      textAlign: 'left',
      fontSize: '10px',
      border: '0px',
      borderLeft: '0.5pt solid #000000',
      borderBottom: '0.5pt solid #000000',
      paddingTop: '2px',
      paddingLeft: '5px',
      paddingBottom: '2px'
    },
    tableColumn4ae: {
      width: '25%',
      textAlign: 'left',
      fontSize: '10px',
      border: '0px',
      borderLeft: '0.5pt solid #000000',
      borderRight: '0.5pt solid #000000',
      borderBottom: '0.5pt solid #000000',
      paddingTop: '2px',
      paddingLeft: '5px',
      paddingBottom: '2px'
    },
    tableHeader9v: {
      flexDirection: 'row',
      borderTop: 1,
      borderLeft: 1,
      borderRight: 1,
      borderColor: '#0a0808'
    },
    tableColumn1af: {
      width: '100%',
      textAlign: 'left',
      fontSize: '10px',
      fontWeight: 'bold',
      marginLeft: '0px',
      marginRight: '0px',
      borderLeft: '0.5pt solid #000000',
      borderRight: '0.5pt solid #000000',
      paddingTop: '2px',
      paddingLeft: '5px',
      paddingBottom: '2px',
      paddingRight: '5px'
    },
    tableHeader9w: {
      flexDirection: 'row',
      borderTop: 1,
      borderLeft: 1,
      borderRight: 1,
      borderColor: '#0a0808'
    },
    tableColumn1ag: {
      width: '10%',
      textAlign: 'left',
      fontSize: '10px',
      fontWeight: 'bold',
      marginLeft: '0px',
      marginRight: '0px',
      borderLeft: '0.5pt solid #000000',
      paddingTop: '2px',
      paddingLeft: '5px',
      paddingBottom: '2px',
      paddingRight: '5px'
    },
    tableColumn2ag: {
      width: '17%',
      textAlign: 'left',
      fontSize: '10px',
      fontWeight: 'bold',
      marginLeft: '0px',
      marginRight: '0px',
      borderTop: '0.5pt solid #000000',
      borderLeft: '0.5pt solid #000000',
      borderRight: '0.5pt solid #000000',
      borderBottom: '0.5pt solid #000000',
      paddingTop: '2px',
      paddingLeft: '30px',
      paddingBottom: '2px',
      paddingRight: '5px'
    },
    tableColumn3ag: {
      width: '7%',
      textAlign: 'left',
      fontSize: '10px',
      fontWeight: 'bold',
      marginLeft: '0px',
      marginRight: '0px',
      paddingTop: '2px',
      paddingLeft: '5px',
      paddingBottom: '2px',
      paddingRight: '5px'
    },
    tableColumn4ag: {
      width: '17%',
      textAlign: 'left',
      fontSize: '10px',
      fontWeight: 'bold',
      marginLeft: '0px',
      marginRight: '0px',
      borderTop: '0.5pt solid #000000',
      borderLeft: '0.5pt solid #000000',
      borderRight: '0.5pt solid #000000',
      borderBottom: '0.5pt solid #000000',
      paddingTop: '2px',
      paddingLeft: '30px',
      paddingBottom: '2px',
      paddingRight: '5px'
    },
    tableColumn5ag: {
      width: '10%',
      textAlign: 'left',
      fontSize: '10px',
      fontWeight: 'bold',
      marginLeft: '0px',
      marginRight: '0px',
      paddingTop: '2px',
      paddingLeft: '5px',
      paddingBottom: '2px',
      paddingRight: '5px'
    },
    tableColumn6ag: {
      width: '29%',
      textAlign: 'center',
      fontSize: '10px',
      fontWeight: 'bold',
      marginLeft: '0px',
      marginRight: '0px',
      paddingTop: '2px',
      paddingLeft: '40px',
      paddingBottom: '2px',
      paddingRight: '5px'
    },
    tableColumn7ag: {
      width: '10%',
      textAlign: 'left',
      fontSize: '10px',
      fontWeight: 'bold',
      marginLeft: '0px',
      marginRight: '0px',
      borderRight: '0.5pt solid #000000',
      paddingTop: '2px',
      paddingLeft: '5px',
      paddingBottom: '2px',
      paddingRight: '5px'
    },
    tableHeader9x: {
      flexDirection: 'row',
      borderTop: 1,
      borderLeft: 1,
      borderRight: 1,
      borderColor: '#0a0808'
    },
    tableColumn1ah: {
      width: '10%',
      textAlign: 'left',
      fontSize: '10px',
      fontWeight: 'bold',
      marginLeft: '0px',
      marginRight: '0px',
      borderLeft: '0.5pt solid #000000',
      paddingTop: '2px',
      paddingLeft: '5px',
      paddingBottom: '2px',
      paddingRight: '5px'
    },
    tableColumn2ah: {
      width: '17%',
      textAlign: 'center',
      fontSize: '8px',
      marginLeft: '0px',
      marginRight: '0px',
      paddingTop: '2px',
      paddingLeft: '5px',
      paddingBottom: '2px',
      paddingRight: '5px'
    },
    tableColumn3ah: {
      width: '7%',
      textAlign: 'left',
      fontSize: '10px',
      fontWeight: 'bold',
      marginLeft: '0px',
      marginRight: '0px',
      paddingTop: '2px',
      paddingLeft: '5px',
      paddingBottom: '2px',
      paddingRight: '5px'
    },
    tableColumn4ah: {
      width: '17%',
      textAlign: 'center',
      fontSize: '8px',
      marginLeft: '0px',
      marginRight: '0px',
      paddingTop: '2px',
      paddingLeft: '5px',
      paddingBottom: '2px',
      paddingRight: '5px'
    },
    tableColumn5ah: {
      width: '10%',
      textAlign: 'left',
      fontSize: '10px',
      fontWeight: 'bold',
      marginLeft: '0px',
      marginRight: '0px',
      paddingTop: '2px',
      paddingLeft: '5px',
      paddingBottom: '2px',
      paddingRight: '5px'
    },
    tableColumn6ah: {
      width: '29%',
      textAlign: 'center',
      fontSize: '10px',
      fontWeight: 'bold',
      marginLeft: '0px',
      marginRight: '0px',
      paddingTop: '2px',
      paddingLeft: '5px',
      paddingBottom: '2px',
      paddingRight: '5px'
    },
    tableColumn7ah: {
      width: '10%',
      textAlign: 'left',
      fontSize: '10px',
      fontWeight: 'bold',
      marginLeft: '0px',
      marginRight: '0px',
      borderRight: '0.5pt solid #000000',
      paddingTop: '2px',
      paddingLeft: '5px',
      paddingBottom: '2px',
      paddingRight: '5px'
    },
    tableHeader9y: {
      flexDirection: 'row',
      borderTop: 1,
      borderLeft: 1,
      borderRight: 1,
      borderColor: '#0a0808'
    },
    tableColumn1ai: {
      width: '100%',
      textAlign: 'left',
      fontSize: '10px',
      fontWeight: 'bold',
      marginLeft: '0px',
      marginRight: '0px',
      borderLeft: '0.5pt solid #000000',
      borderRight: '0.5pt solid #000000',
      borderBottom: '0.5pt solid #000000',
      paddingTop: '2px',
      paddingLeft: '5px',
      paddingBottom: '2px',
      paddingRight: '5px'
    },
    tableHeader9xx: {
      flexDirection: 'row',
      borderTop: 1,
      borderLeft: 1,
      borderRight: 1,
      borderColor: '#0a0808'
    },
    tableColumn1axx: {
      width: '100%',
      textAlign: 'left',
      fontSize: '10px',
      fontWeight: 'bold',
      marginLeft: '0px',
      marginRight: '0px',
      borderLeft: '0.5pt solid #000000',
      borderRight: '0.5pt solid #000000',
      paddingTop: '2px',
      paddingLeft: '5px',
      paddingBottom: '2px',
      paddingRight: '5px'
    },
    tableHeader9mxx: {
      flexDirection: 'row',
      borderTop: 1,
      borderLeft: 1,
      borderRight: 1,
      borderColor: '#0a0808'
    },
    tableColumn1wxx: {
      width: '10%',
      textAlign: 'left',
      fontSize: '8px',
      fontWeight: 'bold',
      marginLeft: '0px',
      marginRight: '0px',
      borderLeft: '0.5pt solid #000000',
      paddingTop: '2px',
      paddingLeft: '5px',
      paddingRight: '5px',
      paddingBottom: '2px'
    },
    tableColumn2wxx: {
      width: '42%',
      textAlign: 'left',
      fontSize: '8px',
      fontWeight: 'bold',
      border: '0px',
      paddingTop: '2px',
      paddingLeft: '5px',
      paddingRight: '5px',
      paddingBottom: '2px'
    },
    tableColumn3wxx: {
      width: '38%',
      textAlign: 'center',
      fontSize: '9px',
      fontWeight: 'bold',
      border: '0px',
      borderTop: '0.5pt solid #000000',
      paddingTop: '2px',
      paddingLeft: '5px',
      paddingRight: '5px',
      paddingBottom: '2px'
    },
    tableColumn4wxx: {
      width: '10%',
      textAlign: 'left',
      fontSize: '8px',
      fontWeight: 'bold',
      border: '0px',
      borderRight: '0.5pt solid #000000',
      paddingTop: '2px',
      paddingLeft: '5px',
      paddingRight: '5px',
      paddingBottom: '2px'
    },
    horizontalLine: {
        borderBottomWidth: 0.5,
        borderBottomColor: '#000000',
        marginVertical: 5,
        width: '100%',
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

  //dependents
  const dependentArray = reservist?.dependents;
  if (!dependentArray) return; // 👈 Prevent the iteration is array is zero or missing
  const sortedDependents = [...dependentArray].sort(
    (a, b) => new Date(a.dep_birthdate) - new Date(b.dep_birthdate),
  );

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

  // Derogatory Records
  const derogatoryArray = reservist?.derogatory;
  if (!derogatoryArray) return; // Prevent the iteration is array is zero or missing
  const sortedDerogatory = [...derogatoryArray].sort(
    (a, b) => new Date(b.dateFiled) - new Date(a.dateFiled),
  );

  return (
    <Document>
      <Page size="A4" style={style.page} wrap>
        <View style={style.header}>
            <View style={style.textContainer}>
                <Text style={style.textOne}>RESERVIST INFORMATION DATA SHEET (RIDS)</Text>
            </View>
        </View>
        <View style={style.tableHeader}>
          <Text style={style.tableColumn1a}>Rank</Text>
          <Text style={style.tableColumn2a}>Last Name</Text>
          <Text style={style.tableColumn3a}>First Name</Text>
          <Text style={style.tableColumn4a}>Middle Name</Text>
          <Text style={style.tableColumn6a}>AFP SN</Text>
          <Text style={style.tableColumn7a}>BR SVC</Text>
        </View>
        <View style={style.tableHeader1}>
          <Text style={style.tableColumn1b}>{reservist?.rank ? reservist?.rank.toUpperCase() : null}</Text>
          <Text style={style.tableColumn2b}>{reservist?.last_name ? reservist?.last_name.toUpperCase() : null}</Text>
          <Text style={style.tableColumn3b}>
            {reservist?.first_name ? reservist?.first_name.toUpperCase() : null}
            {reservist?.suffix
              ? ', ' + reservist?.suffix.toUpperCase()
              : null}
          </Text>
          <Text style={style.tableColumn4b}>{reservist?.middle_name ? reservist?.middle_name.toUpperCase() : null}</Text>
          <Text style={style.tableColumn6b}>{reservist?.afpsn ? reservist?.afpsn.toUpperCase() : null}</Text>
          <Text style={style.tableColumn7b}>{reservist?.bos}</Text>
        </View>
        <View style={style.tableHeader2}>
          <Text style={style.tableColumn1c}>AFOS</Text>
          <Text style={style.tableColumn2c}>POSTAL ADDRESS</Text>
          <Text style={style.tableColumn3c}>EMAIL ADDRESS</Text>
        </View>
        <View style={style.tableHeader3}>
          <Text style={style.tableColumn1d}>{reservist?.afos}</Text>
          <Text style={style.tableColumn2d}>{reservist?.address}</Text>
          <Text style={style.tableColumn3d}>{reservist?.email_add}</Text>
        </View>
        <View style={style.tableHeader4}>
          <Text style={style.tableColumn1e}>CONTACT NUMBER</Text>
          <Text style={style.tableColumn2e}>TIN</Text>
          <Text style={style.tableColumn3e}>PHILHEALTH</Text>
          <Text style={style.tableColumn4e}>SSS / GSIS</Text>
        </View>
        <View style={style.tableHeader5}>
          <Text style={style.tableColumn1f}>{reservist?.phone}</Text>
          <Text style={style.tableColumn2f}>{reservist?.tin}</Text>
          <Text style={style.tableColumn3f}>{reservist?.philhealth}</Text>
          <Text style={style.tableColumn4f}>{reservist?.sss} {reservist?.gsis ? `/ ${reservist?.gsis}` : null}</Text>
        </View>
        <View style={style.tableHeader6}>
          <Text style={style.tableColumn1g}>DATE OF BIRTH</Text>
          <Text style={style.tableColumn2g}>PLACE OF BIRTH</Text>
          <Text style={style.tableColumn3g}>AGE</Text>
          <Text style={style.tableColumn4g}>SEX</Text>
          <Text style={style.tableColumn5g}>RELIGION</Text>
        </View>
        <View style={style.tableHeader7}>
          <Text style={style.tableColumn1h}>{dateFormat(reservist?.birthdate, 'dd-mmm-yyyy')}</Text>
          <Text style={style.tableColumn2h}>{reservist?.birthplace}</Text>
          <Text style={style.tableColumn3h}>{new Date().getFullYear() - dateFormat(reservist?.birthdate, 'yyyy')}</Text>
          <Text style={style.tableColumn4h}>{reservist?.sex}</Text>
          <Text style={style.tableColumn5h}>{reservist?.religion}</Text>
        </View>
        <View style={style.tableHeader8}>
          <Text style={style.tableColumn1i}>DEPENDENTS</Text>
        </View>
        <View style={style.tableHeader9}>
          <Text style={style.tableColumn1j}>NAME</Text>
          <Text style={style.tableColumn2j}>RELATION</Text>
          <Text style={style.tableColumn3j}>DATE OF BIRTH</Text>
        </View>
        {sortedDependents.length > 0 &&
            sortedDependents.map((dep) => (
          <View key={dep?._id} style={style.tableHeader9a}>
            <Text style={style.tableColumn1k}>{dep?.dep_name}</Text>
            <Text style={style.tableColumn2k}>{dep?.dep_relation}</Text>
            <Text style={style.tableColumn3k}>{dep?.dep_birthdate ? dateFormat(dep?.dep_birthdate, 'dd-mmm-yyyy') : null}</Text>
          </View>
        ))}
        <View style={style.tableHeader9b}>
          <Text style={style.tableColumn1l}>OCCUPATION</Text>
          <Text style={style.tableColumn2l}>ADDRESS</Text>
        </View>
        <View style={style.tableHeader9c}>
          <Text style={style.tableColumn1m}>{reservist?.job}</Text>
          <Text style={style.tableColumn2m}>{reservist?.busi_address}</Text>
        </View>
        <View style={style.tableHeader9d}>
          <Text style={style.tableColumn1n}>INITIAL RANK</Text>
          <Text style={style.tableColumn2n}>EFF DATE</Text>
          <Text style={style.tableColumn3n}>AUTHORITY</Text>
        </View>
        <View style={style.tableHeader9e}>
          <Text style={style.tableColumn1o}>{reservist?.initial_rank.toUpperCase()}</Text>
          <Text style={style.tableColumn2o}>{reservist?.date_commission ? dateFormat(reservist?.date_commission, 'dd-mmm-yyyy') : null}</Text>
          <Text style={style.tableColumn3o}>{reservist?.authority}</Text>
        </View>
        <View style={style.tableHeader9d}>
          <Text style={style.tableColumn1n}>CURRENT RANK</Text>
          <Text style={style.tableColumn2n}>EFF DATE</Text>
          <Text style={style.tableColumn3n}>AUTHORITY</Text>
        </View>
        <View style={style.tableHeader9e}>
          <Text style={style.tableColumn1o}>{reservist?.rank.toUpperCase()}</Text>
          <Text style={style.tableColumn2o}>{reservist?.date_last_promotion ? dateFormat(reservist?.date_last_promotion, 'dd-mmm-yyyy') : null}</Text>
          <Text style={style.tableColumn3o}>{reservist?.lastPromotionAuthority}</Text>
        </View>
        <View style={style.tableHeader9f}>
          <Text style={style.tableColumn1p}>SOURCE OF COMMISSION/ENLISTMENT</Text>
          <Text style={style.tableColumn2p}>EFF DATE</Text>
          <Text style={style.tableColumn3p}>AUTHORITY</Text>
        </View>
        <View style={style.tableHeader9g}>
          <Text style={style.tableColumn1q}>{reservist?.source_commission}</Text>
          <Text style={style.tableColumn2q}>{reservist?.date_commission ? dateFormat(reservist?.date_commission, 'dd-mmm-yyyy') : null}</Text>
          <Text style={style.tableColumn3q}>{reservist?.authority}</Text>
        </View>
        <View style={style.tableHeader9f}>
          <Text style={style.tableColumn1p}>UNIT ASSIGNMENT</Text>
          <Text style={style.tableColumn2p}>EFF DATE</Text>
          <Text style={style.tableColumn3p}>AUTHORITY</Text>
        </View>
        <View style={style.tableHeader9g}>
          <Text style={style.tableColumn1q}>{reservist?.reserve_unit}</Text>
          <Text style={style.tableColumn2q}>{reservist?.effec_date_unit ? dateFormat(reservist?.effec_date_unit, 'dd-mmm-yyyy') : null}</Text>
          <Text style={style.tableColumn3q}>{reservist?.unitAssignmentAuthority}</Text>
        </View>
        <View style={style.tableHeader9f}>
          <Text style={style.tableColumn1p}>UNIT DESIGNATION</Text>
          <Text style={style.tableColumn2p}>EFF DATE</Text>
          <Text style={style.tableColumn3p}>AUTHORITY</Text>
        </View>
        <View style={style.tableHeader9g}>
          <Text style={style.tableColumn1q}>{reservist?.unit_designation}</Text>
          <Text style={style.tableColumn2q}>{reservist?.dateUnitDesignation ? dateFormat(reservist?.dateUnitDesignation, 'dd-mmm-yyyy') : null}</Text>
          <Text style={style.tableColumn3q}>{reservist?.unitDesignationAuthority}</Text>
        </View>
        <View style={style.tableHeader9h}>
          <Text style={style.tableColumn1r}>MOBILIZATION CENTER</Text>
          <Text style={style.tableColumn2r}>RESERVIST STATUS</Text>
        </View>
        <View style={style.tableHeader9i}>
          <Text style={style.tableColumn1s}>{reservist?.mobilization_unit.toUpperCase()}</Text>
          <Text style={style.tableColumn2s}>{reservist?.reservist_status.toUpperCase()}</Text>
        </View>
        <View style={style.tableHeader8}>
          <Text style={style.tableColumn1i}>EDUCATIONAL BACKGROUND</Text>
        </View>
        <View style={style.tableHeader9j}>
          <Text style={style.tableColumn1t}>CIVILIAN</Text>
          <Text style={style.tableColumn2t}>SCHOOL / LOCATION</Text>
          <Text style={style.tableColumn3t}>INCLUSIVE DATE (FROM - TO)</Text>
        </View>
        {sortedEducation.length > 0 &&
          sortedEducation.map((educ) => (
          <View key={educ?._id} style={style.tableHeader9k}>
            <Text style={style.tableColumn1u}>{educ?.course}</Text>
            <Text style={style.tableColumn2u}>{educ?.school} {educ?.location ? `/ ${educ?.location}` : null}</Text>
            <Text style={style.tableColumn3u}>{educ?.date_started ? `${educ?.date_started} -` : null} {educ?.date_completed ? educ?.date_completed : null}</Text>
          </View>
        ))}
        <View style={style.tableHeader9j}>
          <Text style={style.tableColumn1t}>MILITARY</Text>
          <Text style={style.tableColumn2t}>SCHOOL / CONDUCTED BY</Text>
          <Text style={style.tableColumn3t}>INCLUSIVE DATE (FROM - TO)</Text>
        </View>
        {sortedTraining.length > 0 &&
            sortedTraining.map((train) => (
          <View key={train?._id} style={style.tableHeader9k}>
            <Text style={style.tableColumn1u}>{train?.course}</Text>
            <Text style={style.tableColumn2u}>{train?.school} {train?.conducted_by ? `/ ${train?.conducted_by}` : null}</Text>
            <Text style={style.tableColumn3u}>{train?.date_started ? `${train?.date_started} -` : null} {train?.date_completed ? train?.date_completed : null}</Text>
          </View>
        ))}
        <View style={style.tableHeader9l}>
          <Text style={style.tableColumn1v}>CIVILIAN &amp; MILITARY AWARD / RECOGNITION RECIEVED</Text>
        </View>
        <View style={style.tableHeader9m}>
          <Text style={style.tableColumn1w}>#</Text>
          <Text style={style.tableColumn2w}>TYPE OF AWARD</Text>
          <Text style={style.tableColumn3w}>AUTHORITY</Text>
          <Text style={style.tableColumn4w}>DATE AWARDED</Text>
        </View>
        {sortedAwards.length > 0 &&
            sortedAwards.map((award, index) => (
          <View key={award?._id} style={style.tableHeader9n}>
            <Text style={style.tableColumn1x}>{index + 1}.</Text>
            <Text style={style.tableColumn2x}>{award?.award_type}</Text>
            <Text style={style.tableColumn3x}>{award?.authority_from}</Text>
            <Text style={style.tableColumn4x}>{award?.date_awarded ? award?.date_awarded : null}</Text>
          </View>
        ))}
        <View style={style.tableHeader9l}>
          <Text style={style.tableColumn1v}>PROMOTION</Text>
        </View>
        <View style={style.tableHeader9m}>
          <Text style={style.tableColumn1w}>#</Text>
          <Text style={style.tableColumn2w}>RANK</Text>
          <Text style={style.tableColumn3w}>AUTHORITY</Text>
          <Text style={style.tableColumn4w}>DATE AWARDED</Text>
        </View>
        {sortedPromotions.length > 0 &&
            sortedPromotions.map((prom, index) => (
          <View key={prom?._id} style={style.tableHeader9n}>
            <Text style={style.tableColumn1x}>{index + 1}.</Text>
            <Text style={style.tableColumn2x}>{prom?.prom_to}</Text>
            <Text style={style.tableColumn3x}>{prom?.prom_authority}</Text>
            <Text style={style.tableColumn4x}>{prom?.prom_effectivity ? prom?.prom_effectivity : null}</Text>
          </View>
        ))}
        <View style={style.tableHeader9l}>
          <Text style={style.tableColumn1v}>INTEGRATION</Text>
        </View>
        <View style={style.tableHeader9o}>
          <Text style={style.tableColumn1y}>#</Text>
          <Text style={style.tableColumn2y}>ACTIVITY</Text>
          <Text style={style.tableColumn3y}>AUTHORITY</Text>
          <Text style={style.tableColumn4y}>INCLUSIVE DATE</Text>
        </View>
        {sortedActivities.length > 0 &&
            sortedActivities.map((act, index) => (
          <View key={act?._id} style={style.tableHeader9p}>
            <Text style={style.tableColumn1z}>{index + 1}.</Text>
            <Text style={style.tableColumn2z}>{act?.mil_activity}</Text>
            <Text style={style.tableColumn3z}>{act?.mil_unit}</Text>
            <Text style={style.tableColumn4z}>{act?.mil_startdate ? `${act?.mil_startdate} -` : null} {act?.mil_enddate ? act?.mil_enddate : null}</Text>
          </View>
        ))}
        <View style={style.tableHeader9l}>
          <Text style={style.tableColumn1v}>SERVICE RECORD (ADT)</Text>
        </View>
        <View style={style.tableHeader9o}>
          <Text style={style.tableColumn1y}>#</Text>
          <Text style={style.tableColumn2y}>UNIT ASSIGNMENT</Text>
          <Text style={style.tableColumn3y}>AUTHORITY</Text>
          <Text style={style.tableColumn4y}>INCLUSIVE DATE</Text>
        </View>
        {sortedActiveDuty.length > 0 &&
            sortedActiveDuty.map((active, index) => (
          <View key={active?._id} style={style.tableHeader9p}>
            <Text style={style.tableColumn1z}>{index + 1}.</Text>
            <Text style={style.tableColumn2z}>{active?.adtUnitAssignment}</Text>
            <Text style={style.tableColumn3z}>{active?.soNumber}</Text>
            <Text style={style.tableColumn4z}>{active?.dateStart ? `${active?.dateStart} -` : null} {active?.dateEnd ? active?.dateEnd : null}</Text>
          </View>
        ))}
        <View style={style.tableHeader9l}>
          <Text style={style.tableColumn1v}>DEROGATORY RECORDS</Text>
        </View>
        <View style={style.tableHeader9q}>
          <Text style={style.tableColumn1aa}>#</Text>
          <Text style={style.tableColumn2aa}>REPORT / COMPLAINT</Text>
          <Text style={style.tableColumn3aa}>DATE FILED</Text>
          <Text style={style.tableColumn4aa}>ADMINISTERING UNIT</Text>
          <Text style={style.tableColumn5aa}>CASE STATUS</Text>
          <Text style={style.tableColumn6aa}>DISPOSITION</Text>
          <Text style={style.tableColumn7aa}>EFFECTIVITY/REMARKS</Text>
        </View>
        {sortedDerogatory.length > 0 &&
            sortedDerogatory.map((derog, index) => (
          <View key={derog?._id} style={style.tableHeader9r}>
            <Text style={style.tableColumn1ab}>{index + 1}.</Text>
            <Text style={style.tableColumn2ab}>{derog?.complaint}</Text>
            <Text style={style.tableColumn3ab}>{derog?.dateFiled}</Text>
            <Text style={style.tableColumn4ab}>{derog?.adminUnit}</Text>
            <Text style={style.tableColumn5ab}>{derog?.caseStatus}</Text>
            <Text style={style.tableColumn6ab}>{derog?.disposition}</Text>
            <Text style={style.tableColumn7ab}>{derog?.remarks}</Text>
          </View>
        ))}
        <View style={style.tableHeader9s}>
          <Text style={style.tableColumn1ac}>PERSONAL CHARACTERISTICS</Text>
        </View>
        <View style={style.tableHeader9t}>
          <Text style={style.tableColumn1ad}>COMPLEXION</Text>
          <Text style={style.tableColumn2ad}>HEIGHT(m)</Text>
          <Text style={style.tableColumn3ad}>WEIGHT(kg)</Text>
          <Text style={style.tableColumn4ad}>BUILT</Text>
        </View>
        <View style={style.tableHeader9u}>
          <Text style={style.tableColumn1ae}>{reservist?.complexion}</Text>
          <Text style={style.tableColumn2ae}>{reservist?.height}</Text>
          <Text style={style.tableColumn3ae}>{reservist?.weight}</Text>
          <Text style={style.tableColumn4ae}>{reservist?.build}</Text>
        </View>
        <View style={style.tableHeader9t}>
          <Text style={style.tableColumn1ad}>HEAD GEAR</Text>
          <Text style={style.tableColumn2ad}>BLOOD TYPE</Text>
          <Text style={style.tableColumn3ad}>SHOES</Text>
          <Text style={style.tableColumn4ad}>COLOR OF EYES</Text>
        </View>
        <View style={style.tableHeader9u}>
          <Text style={style.tableColumn1ae}>{reservist?.size_cap}</Text>
          <Text style={style.tableColumn2ae}>{reservist?.blood_type}</Text>
          <Text style={style.tableColumn3ae}>{reservist?.size_boots}</Text>
          <Text style={style.tableColumn4ae}>{reservist?.eyes}</Text>
        </View>
        <View style={style.tableHeader9t}>
          <Text style={style.tableColumn1ad}>COLOR OF HAIR</Text>
          <Text style={style.tableColumn2ad}>UNIFORM</Text>
          <Text style={style.tableColumn3ad}>DISTINGUISHING MARK</Text>
          <Text style={style.tableColumn4ad}>SKILLS</Text>
        </View>
        <View style={style.tableHeader9u}>
          <Text style={style.tableColumn1ae}>{reservist?.hair}</Text>
          <Text style={style.tableColumn2ae}>{reservist?.size_bda}</Text>
          <Text style={style.tableColumn3ae}>{reservist?.scars}</Text>
          <Text style={style.tableColumn4ae}>{reservist?.skills}</Text>
        </View>
        <View style={style.tableHeader9v}>
          <Text style={style.tableColumn1af}> </Text>
        </View>
        <View style={style.tableHeader9xx}>
          <Text style={style.tableColumn1axx}> </Text>
        </View>
        <View style={style.tableHeader9w}>
          <Text style={style.tableColumn1ag}> </Text>
          <Text style={style.tableColumn2ag}> </Text>
          <Text style={style.tableColumn3ag}> </Text>
          <Text style={style.tableColumn4ag}> </Text>
          <Text style={style.tableColumn5ag}> </Text>
          <View style={style.tableColumn6ag}>
            <View style={style.profileImg}>
              <Image src={reservist?.photo} />
            </View>
          </View>
          <Text style={style.tableColumn7ag}> </Text>
        </View>
        <View style={style.tableHeader9x}>
          <Text style={style.tableColumn1ah}> </Text>
          <Text style={style.tableColumn2ah}>Left Thumbmark</Text>
          <Text style={style.tableColumn3ah}> </Text>
          <Text style={style.tableColumn4ah}>Right Thumbmark</Text>
          <Text style={style.tableColumn5ah}> </Text>
          <Text style={style.tableColumn6ah}> </Text>
          <Text style={style.tableColumn7ah}> </Text>
        </View>
        <View style={style.tableHeader9xx}>
          <Text style={style.tableColumn1axx}> </Text>
        </View>
        <View style={style.tableHeader9xx}>
          <Text style={style.tableColumn1axx}> </Text>
        </View>
        <View style={style.tableHeader9mxx}>
          <Text style={style.tableColumn1wxx}> </Text>
          <Text style={style.tableColumn2wxx}> </Text>
          <Text style={style.tableColumn3wxx}>{reservist?.rank} {reservist?.first_name.toUpperCase()} {middleNameAcronym} {reservist?.last_name.toUpperCase()} {reservist?.suffix ? ', ' + reservist?.suffix.toUpperCase() : null} {reservist?.bos.toUpperCase()}</Text>
          <Text style={style.tableColumn4wxx}> </Text>
        </View>
        <View style={style.tableHeader9xx}>
          <Text style={style.tableColumn1axx}> </Text>
        </View>
        <View style={style.tableHeader9xx}>
          <Text style={style.tableColumn1axx}> </Text>
        </View>
        <View style={style.tableHeader9y}>
          <Text style={style.tableColumn1ai}> </Text>
        </View>
        <View style={style.footer} fixed>
          <Text>RIDS | &copy; {new Date().getFullYear()}</Text>
          <Text>* * * * * C O N F I D E N T I A L * * * * *</Text>
          <Text render={({ pageNumber, totalPages }) => (
            `Page ${pageNumber} of ${totalPages}`
          )} />
        </View>
      </Page>
    </Document>
  )
}

export default CreateRidsPdf