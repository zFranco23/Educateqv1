import React,{useContext, useState} from 'react'
import { Link, Redirect } from 'react-router-dom'
import user2 from '../../../img/user2.png';
import Image from "../../../img/niñoslogin.jpg"
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow
} from '@coreui/react';
import CIcon from '@coreui/icons-react'

import BackContext from '../../../Provider/BackContext';
import axios from 'axios';
import { Typography } from '@material-ui/core';
import { logoNegative } from 'src/assets/icons/logo-negative';
import { Alert } from '@material-ui/lab';



const Login = (props) => {
  const urlRegister="https://api-colegio-g12.herokuapp.com/api/register";
  const urlVerify ="https://api-colegio-g12.herokuapp.com/api/verify";
  const url="https://api-colegio-g12.herokuapp.com/escuela/login";

  const {setUserId,setUserName}=useContext(BackContext);

  const [id,setId]=useState("");
  const [password,setPassword]=useState("");
  const [state,setState]=useState(false);
  const [showInput,setShowInput]=useState(false);
  const [token,setToken]=useState("");
  const [secret,setSecret]=useState("");
  const [idSecret,setIdSecret]=useState("");

  
  const handleSubmit = async ()=>{
    try {
      const {data}=await axios({
        method: "POST",
        url: url,
        data : {
          nick:id,
          password:password
        }
      })
      const {userLogueado: {_id,idUser,nombre},ok}=data;
      
      if(ok){
        //Setear datos del user
        setUserId(_id);
        props.ga();
        setUserName(nombre);
        /* setIdSecret(idUser); */
         /* //Authenticator
        const {data}=await axios.post(urlRegister);
        console.log(data.id,data.secret);
        setIdSecret(data.id);
        setSecret(data.secret); */

        //Pasar a authenticator
        /* setShowInput(true);  */ 
      }
    } catch (error) {
      alert("Usuario incorrecto")
      console.log(error);
    }
  }

  const handleSubmitToken= async () =>{
    const {data}=await axios({
      method: "POST",
      url: urlVerify,
      data : {
        userID:idSecret,
        token:token
      }
    })
    console.log(data);
    if(data.verified){
        setState(true);
        props.ga();
    }
  }
  
  return (
    <div className="c-app c-default-layout flex-row align-items-center" style={{backgroundImage:'url('+Image+')'}}>
      { state && (
        <Redirect to="/dashboard"/> 
      ) }
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="8">
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm>
                    <h1>¡Bienvenido!</h1>
                    <p className="text-muted">Ingresa en tu cuenta</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-user" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput onChange={(e)=>setId(e.target.value)} type="text" placeholder="Usuario" autoComplete="username" />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-lock-locked" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput onChange={(e)=>setPassword(e.target.value)} type="password" placeholder="Contraseña" autoComplete="current-password" />
                    </CInputGroup>
                    {showInput && (
                      <>
                      <Alert style={{marginBottom:"1rem"}}variant="outlined" severity="warning">
                        Ingresa el token
                      </Alert>
                      <Typography variant="h6" gutterBottom><span>{secret}</span> </Typography>
                      

                      <CInputGroup className="mb-4">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-lock-locked" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput onChange={(e)=>setToken(e.target.value)} type="text" placeholder="Ingresa token secreto" />
                    </CInputGroup>
                      </>
                      
                    )}
                    <CRow>
                      <CCol xs="6">
                        <CButton onClick={handleSubmit} color="success" className="px-4">Iniciar Sesión</CButton>
                    {/* <CButton onClick={handleSubmit} color="success" className="px-4">Iniciar Sesión</CButton> */}                     </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard className="text-white bg-warning py-5 d-md-down-none" style={{ width: '44%' }}>
                <CCardBody className="text-center">
                  <div>
                    <h1 style={{fontSize:"1.2rem"}}>Sistema Web de Apoyo Estudiantil</h1>
                    <img src={user2} alt="" style={{width:190}}/>
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
