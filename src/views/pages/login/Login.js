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



const Login = (props) => {
  const url="https://api-colegio-g12.herokuapp.com/escuela/login";

  const {setUserId}=useContext(BackContext);
  const [id,setId]=useState("");
  const [password,setPassword]=useState("");
  const [state,setState]=useState(false);

  
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
      const {userLogueado: {_id},ok}=data;
      
      if(ok){
        setState(true);
        props.ga();
        setUserId(_id)
      }
    } catch (error) {
      alert("Usuario incorrecto")
      console.log(error);
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
                    <CRow>
                      <CCol xs="6">
                        <CButton onClick={handleSubmit} color="success" className="px-4">Iniciar Sesión</CButton>
                      </CCol>
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
