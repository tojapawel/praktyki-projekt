import React from 'react';
import { MdCheck, MdClose } from 'react-icons/md';
import { Link } from 'react-router-dom';

// eslint-disable-next-line
import i18n from "../../translations/i18n";
import { useTranslation } from "react-i18next";

function AttractionsRow(props) {

  if(props.attractions.length > 0){
    return (
      <tr key={props.attractions[0].hotels}>
        <td>{props.attractions[0].name}</td>
        
        {
          props.attractions[0].image === null ? <td>brak</td> : <td>{props.attractions[0].image}</td>
        }

        
        <td>{props.attractions[0].quantity}</td>
        <td>{props.attractions[0].price} zł</td>
        {/* <td>{props.attractions[0].price_type}</td> */}
  
        {
          props.attractions[0].price_type === "onetime" ? <td>jednorazowa</td> : <td>dzienna</td>
      
        }
        
      </tr>
    );
  }

}

export default AttractionsRow;