import React from 'react'
import FooterAdmin from '../../Components/Layout/FooterAdmin'
import HeaderAdmin from '../../Components/Layout/HeaderAdmin'
import MainCertificados from '../../Components/Admin/CRUD/Certificados/MainCertificados'

const Certificados = () => {
  return (
    <>
        <HeaderAdmin/>
        <MainCertificados/>
        <FooterAdmin />
    </>
  )
}

export default Certificados
